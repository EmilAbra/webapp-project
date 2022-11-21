import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Base, Typography, Forms, Images } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SafeAreaView } from 'react-native-safe-area-context';
import AuthButton from './AuthButton';
import RegisterButton from './RegisterButton';



export default function LoginOrRegister({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.loginIcon}>
                <Icon  style={{fontSize: 60, textAlign: 'center', flex: 1, alignSelf: 'center', paddingTop: 30, color: '#ffffff'}} name={'user-o'} />
            </View>
            <View>
                <Text style={{fontSize: 42, textAlign: 'center', marginBottom: 15}}>Min sida</Text>
                <Text style={{textAlign: 'center'}}>Logga in för att lägga till tågstationer till favoriter.</Text>
            </View>
            <View style={styles.buttonContainer}>
                <AuthButton
                    title={"Logga in"}
                    style={styles.loginButton}
                    titleStyle={styles.loginButtonTitle}
                    onPress={
                    ()=>{navigation.navigate("Logga in")}
                    }
                />
                <AuthButton
                    title={"Bli medlem"}
                    style={styles.registerButton}
                    titleStyle={styles.registerButtonTitle}
                    onPress={
                    ()=>{navigation.navigate("Registrera")}
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
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loginIcon: {
    height: 120,
    width: 120,
    backgroundColor: '#dfdfdf',
    borderRadius: 75,
    marginTop: 115,
    marginBottom: 25,
    alignSelf: 'center'
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
  registerButton: {
    backgroundColor: '#EFEFEF',
    height: 'auto',
    maxWidth: '100%',
    marginLeft: 15,
    marginRight: 15,
    padding: 7,
    marginBottom: 20,
    borderRadius: 5,
  },
  registerButtonTitle: {
    fontSize: 25, 
    color: '#212427', 
    textAlign: 'center',
},
});
