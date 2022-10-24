import { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Base, Typography, Map } from "../styles";

import MapView from 'react-native-maps';
import { Marker, Circle } from "react-native-maps";
import * as Location from 'expo-location';
import getCoordinates from "../models/nominatim";


export default function StationMap({ route }) {
    const { delayedInMin, stationCoords, stationName } = route.params;
    // const [marker, setMarker] = useState<any>(null);
    const [locationMarker, setLocationMarker] = useState<any>(null);
    const [stationMarker, setStationMarker] = useState<any>(null);
    const [stationCircle, setstationCircle] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [position, setPosition] = useState({
        latitude: 62.150762002720825,
        longitude: 17.68331168219447,
        latitudeDelta: 17.35507416562703,
        longitudeDelta: 19.96815327554941,
    });
    
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});            

            setPosition({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
                latitudeDelta: 5.35507416562703,
                longitudeDelta: 5.96815327554941,
            });

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);

        })();
    }, []);

    useEffect(() => {
        console.log(stationCoords[0]);
        console.log(typeof delayedInMin);
        const markerTitle = stationName + ". Försening: " + delayedInMin + " min";

        setStationMarker(<Marker
        
            coordinate={{
                latitude: stationCoords[1],
                longitude: stationCoords[0]
            }}
            title={markerTitle}
            pinColor="red"
        />);
    }, []);

    useEffect(() => {
        const time = delayedInMin - 1;
        const meters = time * 100;
        const distance = meters / 2;
        setstationCircle(<Circle
            center={{
                latitude: stationCoords[1],
                longitude: stationCoords[0]
            }}
            radius={distance}
        />);
    }, []);

    return (
    <View style={Map.container}>
        <Text>Den svarta cirkeln runt stationen indikerar hur lång sträcka
            du har på dig att gå tills tåget anländer med en minut tillgodo(beräknad med 100m/min).</Text>
        <MapView
            style={Map.map}
            region={position}
            showsUserLocation={true}
        >
            {stationMarker}
            {locationMarker}
            {stationCircle}
        </MapView>
    </View>
    );
};
