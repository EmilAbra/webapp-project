import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import FlashMessage from "react-native-flash-message";
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeStack from "./components/HomeStack.tsx";
import Auth from "./components/auth/Auth.tsx";
import Map from "./components/Map.tsx";
import FavoritesStack from "./components/FavoritesStack.tsx";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base } from './styles';
import authModel from './models/auth.ts';
import stationsModel from './models/stationsModel';

const routeIcons = {
    "Sök": "home",
    "Tågstationer": "train-outline",
    "Karta": "map-outline",
    "Favoriter": "star-outline",
    "Faktura": "clipboard-outline",
    "Min sida": "md-person-outline",
    "Skicka": "send-outline"
};

const Tab = createBottomTabNavigator();

export default function App() {
    const [products, setProducts] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [allOrders, setAllOrders] = useState([]);
    const [allStations, setAllStations] = useState([]);
    const [currentDelays, setCurrentDelays] = useState([]);
    const [messages, setMessages] = useState([]);
    const [reasonCodes, setReasonCodes] = useState([]);

    // console.log("orders" + allOrders);
    useEffect(() => {
        (async () => {
            setIsLoggedIn(await authModel.loggedIn());
        })();
    }, []);
    
    useEffect(() => {
        (async () => {
            setAllStations(await stationsModel.getAllStations());
            setCurrentDelays(await stationsModel.getAllDelays());         
            setMessages(await stationsModel.getAllMessages());         
            setReasonCodes(await stationsModel.getAllReasonCodes());
        })();
    }, []);

    return (
        <SafeAreaView style={Base.flex}>
            <NavigationContainer>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = routeIcons[route.name] || "alert";

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'limegreen',
                    tabBarInactiveTintColor: 'gray',
                })}
                >
                    <Tab.Screen name="Sök" options={{ headerShown: false }}>
                        {() => <HomeStack allStations={allStations} messages={messages} reasonCodes={reasonCodes} currentDelays={currentDelays} />}
                    </Tab.Screen>
                    {/* <Tab.Screen name="Tågstationer">
                        {() => <Stations setProducts={setProducts} allStations={allStations} allOrders={allOrders} setAllOrders={setAllOrders}/>}
                    </Tab.Screen> */}
                    <Tab.Screen name="Karta">
                        {() => <Map />}
                    </Tab.Screen>
                    {isLoggedIn ?
                        <>
                            <Tab.Screen name="Favoriter">
                                {() => <FavoritesStack allStations={allStations} messages={messages} reasonCodes={reasonCodes} currentDelays={currentDelays} />}
                            </Tab.Screen>
                        </>    
                        :
                        <Tab.Screen name="Min sida" options={{ headerShown: false }}>
                            {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
                        </Tab.Screen>
                    }
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
            <FlashMessage position="top" />
        </SafeAreaView>
    );
}
