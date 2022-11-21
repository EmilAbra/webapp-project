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

export default function Register({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});
    const [hidePass, setHidePass] = useState(true);

    async function doRegister() {            
        if (auth.email && auth.password) {
            
            const result = await AuthModel.register(auth.email, auth.password);
            if (result.type === "success") {
                showMessage({
                    message: result.title,
                    description: result.message,
                    type: result.type,
                });
                navigation.navigate("Login");
            }
        } else {
            showMessage({
                message: "Saknas",
                description: "E-post eller lösenord saknas",
                type: "warning",
            });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <View>
                    <TextInput
                        style={ Forms.loginInput }
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="E-post"
                        onChangeText={(content: string) => {
                            setAuth({ ...auth, email: content })
                        }}
                    />
                <View/>
                <View style={ styles.sectionStyle }>
                    <TextInput
                        style={{flex: 6, fontSize: 20, paddingLeft: 10}}
                        placeholder="Lösenord"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(content: string) => {
                            setAuth({ ...auth, password: content })
                        }}
                        secureTextEntry={hidePass ? true : false}>
                    </TextInput>
                    <Icon
                        size={30}
                        style={{flex: 1, paddingRight: 10}}
                        name={hidePass ? 'eye-slash' : 'eye'}
                        onPress={() => setHidePass(!hidePass)} 
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <AuthButton
                    title={"Registrera"}
                    titleStyle={styles.loginButtonTitle}
                    style={styles.loginButton}
                    onPress={
                    ()=>{doRegister}
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
  