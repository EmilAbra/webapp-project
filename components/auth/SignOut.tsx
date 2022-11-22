import { StyleSheet, View } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from 'react-native-safe-area-context';

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
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <AuthButton
                    title={"Logga ut"}
                    titleStyle={styles.loginButtonTitle}
                    style={styles.loginButton}
                    onPress={doSignOut}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        height: 'auto',
        maxWidth: '100%',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20, 
        padding: 7,
        borderRadius: 5,
    },
    loginButtonTitle: {
        fontSize: 25, 
        color: '#FFF', 
        textAlign: 'center',
    },
});
  