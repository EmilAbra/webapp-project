import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import Register from './Register';
import LoginOrRegister from './LoginOrRegister';

const Stack = createNativeStackNavigator();

export default function Auth(props) {
    return (
        <Stack.Navigator initialRouteName="LoginOrReg" >
            <Stack.Screen name="LoginOrReg" options={{ headerShown: false }}>
                {(screenProps) => <LoginOrRegister {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Login" options={{ headerShown: false }}>
                {(screenProps) => <Login {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};
