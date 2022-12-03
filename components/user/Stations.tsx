import { View, Text, ScrollView, TextInput } from "react-native";
import { useEffect, useState } from 'react';
import { Base, Typography, Icons, Input } from '../../styles';
import StationButton from '../StationButton';
import { showMessage } from "react-native-flash-message";
import userModel from "../../models/user"
import Icon from 'react-native-vector-icons/FontAwesome';


export default function StationsList({ allStations, favoriteStations, setfavoriteStations }) {    
    const [stationWord, setStationWord] = useState("");

    async function reloadFavs() {
        setfavoriteStations(await userModel.getUserData());
    }

    useEffect( () => {
        reloadFavs();
    }, []);

    function sortOnStationName(a, b) {
        const nameA = a.AdvertisedLocationName.toUpperCase();
        const nameB = b.AdvertisedLocationName.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }

    function filterOnSearch(item) {
       const stationName = item.AdvertisedLocationName.toUpperCase();
       const searchWord = stationWord.toUpperCase();

       return stationName.startsWith(searchWord);
    }

    function checkFavorites(stationName) {
        for (const item in favoriteStations) {
            const userData = favoriteStations[item];
            for (const key in userData) {
                let artefact = JSON.parse(userData["artefact"]);
                if (artefact.place === stationName) {
                    return true;
                }
            }
        }
        return false;
    }

    const listOfStations = allStations
        .filter(filterOnSearch)
        .sort(sortOnStationName)
        .map((station, index) => {
            return <View key={index}>
                <StationButton
                    title={station.AdvertisedLocationName}
                    key={index}
                    onPress={ async () => {
                        const checkIfInFavorites = checkFavorites(station.AdvertisedLocationName);

                        if (checkIfInFavorites) {
                            showMessage({
                                message: `${station.AdvertisedLocationName} finns redan i favoriter`,
                                type: "warning",
                            });
                        } else {
                            await userModel.setUserData(station);
                            showMessage({
                                message: `${station.AdvertisedLocationName} är tillagd till favoriter`,
                                type: "success",
                            });
                            reloadFavs();
                        }
                    }}
                />
                </View>
        });

    return (
        <ScrollView  style={Base.baseBgColor}>
            <View style={Base.homeSection}>
            <Icon name="search" size={20} style={Icons.homeSearchIcon}/>
            <TextInput
                style={Input.homeInput}
                placeholder="Sök tågstation"
                placeholderTextColor="#000"
                onChangeText={
                (searchWord) => { setStationWord(searchWord) }
                }
            />
            </View>
            
            {stationWord
                ? <Text style={Typography.normalBold}>Tryck på namnet för att lägga till favoriter</Text>
                : <Text style={Typography.normalBold}>Sök för att lägga till stationer till favoriter</Text>
            }
            {stationWord
                ? listOfStations
                : <Text style={Typography.header4}></Text>
            }
            {/* {listOfStations} */}
        </ScrollView>
    );
}