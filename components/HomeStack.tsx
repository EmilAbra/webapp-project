import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./Home.tsx";
import StationList from './StationList';
import StationDetails from './StationDetails';
import StationMap from './StationMap';

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen(props) {
    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen 
                name="Home" 
                component={Home} 
                options={{ headerShown: false }}
            />
            <HomeStack.Screen 
                name="List"  
                options={{ title: '' }}
            >
                {(screenProps) => 
                    <StationList 
                        {...screenProps} 
                        allStations={props.allStations} 
                        currentDelays={props.currentDelays} 
                    />
                }
            </HomeStack.Screen>
            <HomeStack.Screen 
                name="Details"  
                options={{ title: '' }}
            >
                {(screenProps) => 
                    <StationDetails 
                        {...screenProps} 
                    />
                }
            </HomeStack.Screen>
            <HomeStack.Screen 
                name="MapOfDelay" 
                options={{ title: '' }}
            >
                {(screenProps) => 
                    <StationMap 
                        {...screenProps} 
                    />
                }
            </HomeStack.Screen>
        </HomeStack.Navigator>
    );
}