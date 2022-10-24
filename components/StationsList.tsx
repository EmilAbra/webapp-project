import { useState, useEffect } from 'react';
import { View, Text, ScrollView } from "react-native";
import { Base, Typography, Button } from '../styles';
import AppButton from './AppButton';
import orderModel from "../models/orders.ts";


export default function OrderList({ route, navigation, allStations, currentDelays, messages, reasonCodes}) {    

    function filterOnDelayed(item) {
        for (const object in currentDelays) {
            let fromLocation = currentDelays[object].FromLocation
            for (const location in fromLocation) {
                if (fromLocation[location].LocationName.includes(item.LocationSignature)) {
                    return true;
                }
            }
        }
    }

    function sortOnStationName(a, b) {
        const nameA = a.AdvertisedLocationName.toUpperCase(); // ignore upper and lowercase
        const nameB = b.AdvertisedLocationName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        // names must be equal
        return 0;
    }

    const listOfOrders = allStations
        .filter(filterOnDelayed)
        .sort(sortOnStationName)
        .map((station, index) => {
            return <View style={Button.screenContainer} key={index}>
                <AppButton
                title={station.AdvertisedLocationName}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        station: station,
                        currentDelays: currentDelays,
                        allStations: allStations,
                        messages: messages,
                        reasonCodes: reasonCodes
                    });
                }}
                />
                </View>
        });

    return (
        <ScrollView  style={Base.base}>
            <Text style={Typography.normal}>Tågstationer med förseningar</Text>
            {listOfOrders}
        </ScrollView>
    );
}
