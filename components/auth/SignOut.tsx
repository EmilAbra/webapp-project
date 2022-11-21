import Auth from '../../interfaces/auth';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { showMessage } from "react-native-flash-message";
import AuthModel from '../../models/auth.ts';
import AuthFields from './AuthFields';
import { Base, Typography, Forms, Images } from '../../styles';
import AuthButton from './AuthButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import PasswordInputText from 'react-native-hide-show-password-input';

export default function SignOut({navigation, setIsLoggedIn}) {

    async function doSignOut() {
        setIsLoggedIn(false);
        const result = await AuthModel.logout();
        showMessage({
            message: result.title,
            description: result.message,
            type: result.type,
        });
        navigation.navigate("Home");
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <AuthButton
                    title={"Logga ut"}
                    titleStyle={styles.loginButtonTitle}
                    style={styles.loginButton}
                    onPress={
                    ()=>{doSignOut}
                    }
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
    inputContainer: {
      flex: 2,
      justifyContent: 'flex-end',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#aaa',
        height: 50,
        borderRadius: 5,
        margin: 10,
        elevation: 5,
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
  