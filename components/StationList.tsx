import { View, Text, ScrollView } from "react-native";
import { Base, Typography } from '../styles';
import StationButton from './StationButton';
import { useEffect } from 'react';

export default function StationsList({ navigation, allStations, currentDelays }) {    

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "none"
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: undefined
        });
    }, [navigation]);

    function filterOnDelayed(item) {
        for (const object in currentDelays) {
            let fromLocation = currentDelays[object].FromLocation;
            for (const location in fromLocation) {
                if (fromLocation[location].LocationName === item.LocationSignature) {
                    return true;
                }
            }
        }
    }

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

    const listOfDelayedStations = allStations
        .filter(filterOnDelayed)
        .sort(sortOnStationName)
        .map((station, index) => {
            return <View key={index}>
                <StationButton
                title={station.AdvertisedLocationName}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        station: station,
                        currentDelays: currentDelays,
                        allStations: allStations,
                    });
                }}
                />
                </View>
        });
    
    let delayes = true;
    if (listOfDelayedStations.length === 0) {
        delayes = false;
    }

    return (
        <ScrollView  style={Base.baseBgColor}>
            <Text style={Typography.normalBold}>Tågstationer med förseningar</Text>
            {delayes
                ? listOfDelayedStations
                : <Text style={Typography.header4}>Inga förseningar att visa</Text>
            }
        </ScrollView>
    );
}
