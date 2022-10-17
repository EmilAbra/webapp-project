import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Images } from './styles';
import trainTracks from './assets/train_tracks.jpg';
import { Dimensions } from "react-native";

import Trains from './components/Trains.tsx';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={trainTracks} style={styles.homeBackground}>
          <Text style={{top: 40, fontSize: 42, textAlign: 'center'}}>Tåg-kollen</Text>
          <Trains />
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
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
