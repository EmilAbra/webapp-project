import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Map, Typography } from "../styles";

import MapView from 'react-native-maps';
import { Marker, Circle } from "react-native-maps";
import * as Location from 'expo-location';


export default function StationMap({ route, navigation }) {
    const { 
        delayedInMin, 
        stationCoords, 
        stationName } = route.params;

    const [locationMarker, setLocationMarker] = useState<any>(null);
    const [stationMarker, setStationMarker] = useState<any>(null);
    const [stationCircle, setstationCircle] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [position, setPosition] = useState({
        latitude: stationCoords[1],
        longitude: stationCoords[0],
        latitudeDelta: 0.03507416562703,
        longitudeDelta: 0.03507416562703,
    });

    useEffect(() => {
        navigation.getParent()?.setOptions({
            tabBarStyle: {
                display: "flex"
            }
        });
        return () => navigation.getParent()?.setOptions({
            tabBarStyle: 'flex'
        });
    }, [navigation]);
    
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});            

            setPosition({
                latitude: stationCoords[1],
                longitude: stationCoords[0],
                latitudeDelta: 0.03507416562703,
                longitudeDelta: 0.03507416562703,
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
        const markerTitle = stationName + ". F??rsening: " + delayedInMin + " min";

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
    <View style={Map.halfMapContainer}>
        <Text style={Typography.normal}>T??get ??r f??rsenat med {delayedInMin} min. Den svarta cirkeln runt stationen {stationName} indikerar hur l??ng str??cka
            du kan g?? tills t??get anl??nder med en minut tillgodo(ber??knat p?? 100m/min).</Text>
        <MapView
            style={Map.mapHalfHeight}
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
