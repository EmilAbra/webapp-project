import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FavStationsList from './FavStationsList';
import StationDetails from './StationDetails';
import StationMap from './StationMap';

const HomeStack = createNativeStackNavigator();

export default function FavoritesStack(props) {
    return (
    <HomeStack.Navigator initialRouteName="List">
        <HomeStack.Screen 
            name="favList" 
            options={{ headerShown: false }}
        >
            {(screenProps) => 
                <FavStationsList 
                    {...screenProps} 
                    allStations={props.allStations} 
                    favoriteStations={props.favoriteStations} setfavoriteStations={props.setfavoriteStations} currentDelays={props.currentDelays} 
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