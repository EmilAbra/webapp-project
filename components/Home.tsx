import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TextInput } from 'react-native';
import { Base, Typography, Forms, Images } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import trainTracks from '../assets/train_tracks.jpg';
import { Dimensions } from "react-native";


export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <ImageBackground source={trainTracks} style={Images.homeBackground}>
          <Text style={{top: 100, fontSize: 42, textAlign: 'center'}}>Tåg-kollen</Text>
          <TextInput
              style={ Forms.input }
              onChangeText={(content: string) => {
              }}
              placeholder="Sök tågstation"
              onPressIn={
                ()=>{navigation.navigate("List")}
              }
          />
        </ImageBackground>
        <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeBackground: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
