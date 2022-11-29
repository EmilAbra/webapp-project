import Auth from '../../interfaces/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { View, TextInput } from 'react-native';
import { showMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/FontAwesome';

import { Input, Base, Button } from '../../styles';
import AuthButton from './AuthButton';
import AuthModel from '../../models/auth.ts';

export default function Login({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});
    const [hidePass, setHidePass] = useState(true);

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);
            if (result.type === "success") {
                setIsLoggedIn(true);
                showMessage({
                    message: result.title,
                    description: result.message,
                    type: result.type,
                });
                navigation.navigate("Favoriter");
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
        <SafeAreaView style={Base.baseContainer}>
            <View style={Input.inputContainerLogin}>
                <View>
                    <TextInput
                        style={Input.emailInput}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="E-post"
                        onChangeText={(content: string) => {
                            setAuth({ ...auth, email: content })
                        }}
                        />
                </View>
                <View  style={Input.passwordSection}>
                    <TextInput
                        style={Input.passwordInput}
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
                        style={Input.passwordIcon}
                        name={hidePass ? 'eye-slash' : 'eye'}
                        onPress={() => setHidePass(!hidePass)} 
                    />
                </View>
            </View>
            <View style={Button.logInButtonContainer}>
                <AuthButton
                    title={"Logga in"}
                    titleStyle={Button.loginButtonTitle}
                    style={Button.loginButton}
                    onPress={doLogin}
                />
            </View>
        </SafeAreaView>
    );
};
