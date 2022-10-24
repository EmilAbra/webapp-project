import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Base, Typography, Forms, Images } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SafeAreaView } from 'react-native-safe-area-context';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';



export default function LoginOrRegister({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loginIcon}>
                <Icon  style={{fontSize: 42, textAlign: 'center'}} name={'star'} />
            </View>
            <View style={styles.container}>
                <Text style={{fontSize: 42, textAlign: 'center', marginBottom: 15}}>Min sida</Text>
                <Text style={{textAlign: 'center'}}>Logga in för att lägga till tågstationer till favoriter.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <LoginButton
                    title={"Logga in"}
                    onPress={
                    ()=>{navigation.navigate("Login")}
                    }
                />
                <RegisterButton
                    title={"Registrera dig"}
                    onPress={
                    ()=>{navigation.navigate("Register")}
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    textAlign: 'cente'

  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loginIcon: {
    height: 125,
    width: 125,
    backgroundColor: '#EFEFEF',
    borderRadius: 75,
    marginTop: 100,
  },
});
