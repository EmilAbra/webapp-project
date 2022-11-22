import { useEffect } from 'react';
import { View, Text, ScrollView } from "react-native";

import { Base, Typography, Button } from '../../styles';
import AppButton from '../AppButton';
import RemoveFavButton from './RemoveFavButton';
import userModel from '../../models/user.ts';

export default function FavStationsList({ allStations, favoriteStations, navigation, currentDelays, setfavoriteStations}) {   

    async function reloadFavs() {
        setfavoriteStations(await userModel.getUserData());
    }

    useEffect( () => {
        reloadFavs();
    }, []);

    function sortOnStationName(a, b) {
        const artefactA = JSON.parse(a.artefact);
        const artefactB = JSON.parse(b.artefact);
        const nameA = artefactA.place.toUpperCase();
        const nameB = artefactB.place.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    }

    const listOfMyStations = favoriteStations
        .sort(sortOnStationName)
        .map((station, index) => {
            const artefact = JSON.parse(station.artefact);
            const longitude = parseFloat(artefact.longitude);
            const latitude = parseFloat(artefact.latitude);
            
            return <View style={Button.screenContainer} key={index}>
                    <View style={{ flex: 2}}>
                        <AppButton
                            title={artefact.place}
                            key={index}
                            onPress={() => {
                                navigation.navigate('Details', {
                                    stationName: artefact.place,
                                    currentDelays: currentDelays,
                                    allStations: allStations,
                                    longitude: longitude,
                                    latitude: latitude,
                                });
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, marginRight: 20}}>
                        <RemoveFavButton
                            onPress={async () => {
                                await userModel.deleteUserData(station.id);
                                reloadFavs();
                            }}
                        />
                    </View>
                </View>
        });
    
    let myStations = true;
    if (listOfMyStations.length === 0) {
        myStations = false;
    }

    return (
        <ScrollView  style={Base.base}>
            <Text style={Typography.header4}>Mina stationer med förseningar</Text>
            {myStations 
                ? listOfMyStations
                : <Text style={Typography.normal}>Lägg till favorit-stationer för att se om de har förseningar</Text>
            }
        </ScrollView>
    );
}
