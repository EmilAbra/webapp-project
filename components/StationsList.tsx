import { View, Text, ScrollView } from "react-native";
import { Base, Typography, Button } from '../styles';
import AppButton from './AppButton';

export default function StationsList({ navigation, allStations, currentDelays }) {    

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
            return <View style={Button.screenContainer} key={index}>
                <AppButton
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
        <ScrollView  style={Base.base}>
            <Text style={Typography.header4}>Tågstationer med förseningar</Text>
            {delayes
                ? listOfDelayedStations
                : <Text style={Typography.header4}>Inga förseningar att visa</Text>
            }
        </ScrollView>
    );
}
