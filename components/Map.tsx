import { useEffect, useState } from "react";
import { View } from "react-native";
import { Map } from "../styles";

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';

export default function SwedenMap({}) {
    const [locationMarker, setLocationMarker] = useState<any>(null);
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

    return (
    <View style={Map.container}>
        <MapView
            style={Map.mapFullSize}
            region={position}
            showsUserLocation={true}
        >
            {locationMarker}
        </MapView>
    </View>
    );
};
