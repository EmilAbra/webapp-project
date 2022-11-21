import { View, Text, ScrollView } from "react-native";
import { Base, Typography, Button } from '../styles';
import DetailsButton from './DetailsButton';


export default function StationDetails({ route, navigation }) {
    const { allStations, station, currentDelays } = route.params;

    function filterOnStationName(item) {
        for (const object in item.FromLocation) {
            let delayedLocation = item.FromLocation[object].LocationName;
            
            if (delayedLocation === station.LocationSignature) {
                return true;
            }
        }
    }

    function getStationName(acronym) {        
        const result = allStations.filter(station => station.LocationSignature === acronym);
        
        return result[0].AdvertisedLocationName;
    }

    function getStationCoords(coordString) {
        const rawCoordinates = coordString.split(" ");
        const latitude = parseFloat(rawCoordinates[1].slice(1));
        const longitude = parseFloat(rawCoordinates[2].slice(0, -1));

        return [latitude, longitude];
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
            const stationCoords = getStationCoords(station.Geometry.WGS84)
            
            return <View style={Button.screenContainer} key={index}>
                <DetailsButton
                    title={station.AdvertisedLocationName + " - " + getStationName(train.ToLocation[0].LocationName)}
                    key={index}
                    arrival={beforeArrival}
                    expectedArrival={newArrival}
                    delayedInMin={delayedInMin}
                    // description={getReasonForDelay(train.AdvertisedTimeAtLocation)}
                    onPress={() => {
                        navigation.navigate('MapOfDelay', {
                            delayedInMin: delayedInMin,
                            stationCoords: stationCoords,
                            stationName: station.AdvertisedLocationName
                        });
                    }}
        
                
                />
                </View>
        });

    return (
        <ScrollView  style={Base.base}>
            <Text style={Typography.header4}>Förseningar för {station.AdvertisedLocationName} station</Text>
            {ListOfDelayedTrains}
        </ScrollView>
    )
};
