import { View, Text, ScrollView } from "react-native";
import { useEffect } from 'react';
import { Base, Typography, Button } from '../../styles';
import AppButton from '../AppButton';
import { showMessage } from "react-native-flash-message";
import userModel from "../../models/user"

export default function StationsList({ allStations, favoriteStations, setfavoriteStations }) {    

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
        .sort(sortOnStationName)
        .map((station, index) => {
            return <View style={Button.screenContainer} key={index}>
                <AppButton
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
        <ScrollView  style={Base.base}>
            <Text style={Typography.normal}>Alla tågstationer</Text>
            <Text style={Typography.normal}>Tryck på namnet för att lägga till favoriter</Text>
            {listOfStations}
        </ScrollView>
    );
}