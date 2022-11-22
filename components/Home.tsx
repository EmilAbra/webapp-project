import { StyleSheet, Text, ImageBackground, TextInput, View } from 'react-native';
import { Images, Typography, Forms, Base } from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import trainTracks from '../assets/train_home.jpg';

export default function Home({navigation}) {
  return (
    <SafeAreaView style={Base.flex}>
      <ImageBackground source={trainTracks} style={Images.homeBackground}>
      <View style={{top: 150}}>
        <View>
          <Text style={Typography.header1}>Tåg-kollen</Text>
        </View>
        <View style={Base.homeSection}>
          <Icon name="search" size={20} style={Forms.homeSearchIcon}/>
          <TextInput
            style={Forms.homeInput}
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
