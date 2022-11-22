import { useState, useEffect } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base } from './styles';
import FlashMessage from "react-native-flash-message";

import HomeStack from "./components/HomeStack.tsx";
import AuthStack from "./components/auth/AuthStack.tsx";
import Map from "./components/Map.tsx";
import Help from "./components/Help.tsx";
import FavoritesStack from "./components/user/FavoritesStack.tsx";
import Stations from "./components/user/Stations.tsx";
import SignOut from "./components/auth/SignOut.tsx";

import authModel from './models/auth.ts';
import userModel from './models/user.ts';
import stationsModel from './models/stationsModel';

const routeIcons = {
    "Sök": "home",
    "Tågstationer": "train-outline",
    "Karta": "map-outline",
    "Favoriter": "star-outline",
    "Faktura": "clipboard-outline",
    "Min sida": "md-person-outline",
    "Skicka": "send-outline",
    "Stationer": "md-train",
    "Logga ut": "log-out-outline"
};

const Tab = createBottomTabNavigator();

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [allStations, setAllStations] = useState([]);
    const [currentDelays, setCurrentDelays] = useState([]);
    const [favoriteStations, setfavoriteStations] = useState([]);
    
    

    useEffect(() => {
        (async () => {
            setIsLoggedIn(await authModel.loggedIn());
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (isLoggedIn) {
                setfavoriteStations(await userModel.getUserData());
            }
        })();
    }, []);
    
    useEffect(() => {
        (async () => {
            setAllStations(await stationsModel.getAllStations());
            setCurrentDelays(await stationsModel.getAllDelays());         
        })();
    }, []);

    return (
        <SafeAreaView style={Base.flex}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = routeIcons[route.name] || "alert";
                        if (route.name === 'Hjälp') {
                            return <AntDesign name="questioncircleo" size={size} color={color} />;
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#000',
                    tabBarInactiveTintColor: 'gray',
                })}
                >
                    <Tab.Screen name="Sök" options={{ headerShown: false }}>
                        {() => <HomeStack allStations={allStations} currentDelays={currentDelays} />}
                    </Tab.Screen>
                    <Tab.Screen name="Karta">
                        {() => <Map />}
                    </Tab.Screen>
                    <Tab.Screen name="Hjälp" options={{ headerShown: false }}>
                        {() => <Help />}
                    </Tab.Screen>
                    {isLoggedIn ?
                        <>  
                            <Tab.Screen name="Stationer" options={{ headerShown: false }}>
                                {() => <Stations allStations={allStations} favoriteStations={favoriteStations} setfavoriteStations={setfavoriteStations} />}
                            </Tab.Screen>
                            <Tab.Screen name="Favoriter" options={{ headerShown: false }}>
                                {() => <FavoritesStack allStations={allStations} setfavoriteStations={setfavoriteStations} favoriteStations={favoriteStations} currentDelays={currentDelays} />}
                            </Tab.Screen>
                            <Tab.Screen name="Logga ut">
                            {() => <SignOut setIsLoggedIn={setIsLoggedIn} />}
                            </Tab.Screen>
                        </>    
                        :
                        <Tab.Screen name="Min sida" options={{ headerShown: false }}>
                            {() => <AuthStack setIsLoggedIn={setIsLoggedIn} />}
                        </Tab.Screen>
                    }
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
            <FlashMessage position="top" />
        </SafeAreaView>
    );
}
