import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import Register from './Register';
import LoginOrRegister from './LoginOrRegister';

const Stack = createNativeStackNavigator();

export default function AuthStack(props) {
    return (
        <Stack.Navigator initialRouteName="LoginOrReg" >
            <Stack.Screen name="LoginOrReg" options={{ headerShown: false }}>
                {(screenProps) => <LoginOrRegister {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Logga in">
                {(screenProps) => <Login {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Registrera" component={Register} />
        </Stack.Navigator>
    );
};
