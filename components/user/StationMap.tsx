import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Map, Typography } from "../../styles";
import { Marker, Circle } from "react-native-maps";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function StationMap({ route }) {
    const { 
        delayedInMin, 
        stationName, 
        longitude, 
        latitude } = route.params;    

    const [locationMarker, setLocationMarker] = useState<any>(null);
    const [stationMarker, setStationMarker] = useState<any>(null);
    const [stationCircle, setstationCircle] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [position, setPosition] = useState({
        longitude: latitude,
        latitude: longitude,
        latitudeDelta: 0.03507416562703,
        longitudeDelta: 0.03507416562703,
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
                latitude: longitude,
                longitude: latitude,
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
        const markerTitle = stationName + ". Försening: " + delayedInMin + " min";

        setStationMarker(<Marker
        
            coordinate={{
                latitude: longitude,
                longitude: latitude
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
                latitude: longitude,
                longitude: latitude
            }}
            radius={distance}
        />);
    }, []);

    return (
    <View style={Map.halfMapContainer}>
        <Text style={Typography.normal}>Tåget är försenat med {delayedInMin} min. Den svarta cirkeln runt stationen {stationName} indikerar hur lång sträcka du kan gå tills tåget anländer med en minut tillgodo(beräknat på 100m/min).
        </Text>
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
