import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Base, Button, Typography, Icons } from '../../styles';
import AuthButton from './AuthButton';

export default function LoginOrRegister({navigation}) {
    return (
        <SafeAreaView style={Base.baseContainer}>
            <View style={Icons.loginIconContainer}>
                <Icon  style={Icons.loginIcon} name={'user-o'} />
            </View>
            <View>
                <Text style={Typography.header2}>Min sida</Text>
                <Text style={Typography.normalCentre}>Logga in för att lägga till tågstationer till favoriter.</Text>
            </View>
            <View style={Button.logInButtonContainer}>
                <AuthButton
                    title={"Logga in"}
                    style={Button.loginButton}
                    titleStyle={Typography.loginButtonTitle}
                    onPress={
                    ()=>{navigation.navigate("Logga in")}
                    }
                />
                <AuthButton
                    title={"Bli medlem"}
                    style={Button.registerButton}
                    titleStyle={Typography.registerButtonTitle}
                    onPress={
                    ()=>{navigation.navigate("Registrera")}
                    }
                />
            </View>
        </SafeAreaView>
    );
}
