import { View } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Base, Typography } from '../../styles';

import AuthModel from '../../models/auth.ts';
import AuthButton from './AuthButton';

export default function SignOut({setIsLoggedIn}) {

    async function doSignOut() {
        setIsLoggedIn(false);
        await AuthModel.logout();
        
        showMessage({
            message: "Log out",
            description: "User logged out",
            type: 'success',
        });
    }

    return (
        <SafeAreaView style={Base.baseContainer}>
            <View style={Button.signOutButtonContainer}>
                <AuthButton
                    title={"Logga ut"}
                    titleStyle={Typography.loginButtonTitle}
                    style={Button.loginButton}
                    onPress={doSignOut}
                />
            </View>
        </SafeAreaView>
    );
};
  