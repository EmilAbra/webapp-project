import { View, Text, ScrollView } from "react-native";
import { Base, Typography, Button } from '../../styles';
import DetailsButton from '../DetailsButton';


export default function StationDetails({ route, navigation }) {
    const { allStations, stationName, currentDelays, longitude, latitude } = route.params;

    function filterOnStationName(item) {
        for (const object in item.FromLocation) {
            let delayedAcronym = item.FromLocation[object].LocationName;
            let delayedLocation = getStationName(delayedAcronym);
            
            if (delayedLocation === stationName) {
                return true;
            }
        }
    }

    function getStationName(acronym) {        
        const result = allStations.filter(station => station.LocationSignature === acronym);
        
        return result[0].AdvertisedLocationName;
    }

    function calculateTimeDifference(time1, time2) {
        const firstTime = new Date(time1);
        const secondTime = new Date(time2);        
        const timestamp1 = firstTime.getTime();
        const timestamp2 = secondTime.getTime();
        const timeDiff = timestamp2 - timestamp1;
        const timeDiffSec = timeDiff / 1000;

        return timeDiffSec / 60;
    }

    function convertIsoDateString(time) {
        const [dateStr, timeStr] = time.split("T");

        return dateStr + " " + timeStr.slice(0, 8);
    }

    const ListOfDelayedTrains = currentDelays
        .filter(filterOnStationName)
        .map((train, index) => {
            const beforeArrival = convertIsoDateString(train.AdvertisedTimeAtLocation);
            const newArrival = convertIsoDateString(train.EstimatedTimeAtLocation);
            const delayedInMin = calculateTimeDifference(train.AdvertisedTimeAtLocation, train.EstimatedTimeAtLocation);
            
            return <View style={Button.screenContainer} key={index}>
                <DetailsButton
                    title={stationName + " - " + getStationName(train.ToLocation[0].LocationName)}
                    key={index}
                    arrival={beforeArrival}
                    expectedArrival={newArrival}
                    delayedInMin={delayedInMin}
                    onPress={() => {
                        navigation.navigate('MapOfDelay', {
                            delayedInMin: delayedInMin,
                            stationName: stationName,
                            longitude: longitude,
                            latitude: latitude,
                        });
                    }}
        
                
                />
                </View>
        });
    
    let delayedTrains = true;
    if (ListOfDelayedTrains.length === 0) {
        delayedTrains = false;
    }

    return (
        <ScrollView  style={Base.baseBgColor}>
            <Text style={Typography.header4}>Förseningar för {stationName} station</Text>
            {delayedTrains 
                ? ListOfDelayedTrains
                : <Text style={Typography.normal}>Inga förseningar att visa</Text>
            }
        </ScrollView>
    )
};
