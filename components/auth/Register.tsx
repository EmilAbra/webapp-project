import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { showMessage } from "react-native-flash-message";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input, Base, Button, Typography } from '../../styles';

import Auth from '../../interfaces/auth';
import AuthButton from './AuthButton';
import AuthModel from '../../models/auth.ts';

export default function Register({navigation}) {
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
    
    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "none"
          }
        });
        return () => navigation.getParent()?.setOptions({
          tabBarStyle: undefined
        });
      }, [navigation]);

    return (
        <SafeAreaView style={Base.baseContainer}>
            <View style={Input.inputContainerLogin}>
                <View>
                    <TextInput
                        style={Input.emailInput}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        activeOutlineColor= '#000'
                        mode='outlined'
                        label="E-post"
                        onChangeText={(content: string) => {
                            setAuth({ ...auth, email: content })
                        }}
                        />
                </View>
                <View>
                    <TextInput
                        style={Input.passwordInput}
                        label="Lösenord"
                        mode='outlined'
                        activeOutlineColor='#000'
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(content: string) => {
                            setAuth({ ...auth, password: content })
                        }}
                        secureTextEntry={hidePass ? true : false}
                        right={<TextInput.Icon icon={hidePass ? 'eye-off' : 'eye'} 
                            onPress={() => setHidePass(!hidePass)}
                            color='#808080'
                        />}
                        >
                    </TextInput>
                </View>
            </View>
            <View style={Button.logInButtonContainer}>
                <AuthButton
                    title={"Registrera"}
                    titleStyle={Typography.loginButtonTitle}
                    style={Button.loginButton}
                    onPress={
                    ()=>{doRegister}
                    }
                />
            </View>
        </SafeAreaView>
    );
}
  