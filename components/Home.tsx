import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ImageBackground, TextInput, View, Image } from 'react-native';
import { Forms, Images } from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import trainTracks from '../assets/train_home.jpg';
import { Dimensions } from "react-native";
// import { Icon } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground source={trainTracks} style={Images.homeBackground}>
      <View style={{top: 150}}>
        <View>
          <Text style={{fontSize: 42, textAlign: 'center'}}>Tåg-kollen</Text>
        </View>
        <View style={styles.sectionStyle}>
          <Icon name="search" size={20} style={styles.searchIcon}/>
          <TextInput
            style={{flex: 1, fontSize: 20, textAlign: 'center', paddingRight: 30}}
            placeholder="Sök tågstation"
            onPressIn={
            ()=>{navigation.navigate("List")}
            }
          />
        </View>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#aaa',
    height: 50,
    borderRadius: 25,
    margin: 10,
    elevation: 5,
  },
  search: {
    flex: 1,
    textAlign: 'center',
    borderRadius: 25,
    fontSize: 20,
    padding: 10,
  },
  searchIcon: {
    paddingLeft: 20
  },
});
