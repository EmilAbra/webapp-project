import { StatusBar, Text, ImageBackground, TextInput, View } from 'react-native';
import { Images, Typography, Input, Base, Icons } from '../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import trainTracks from '../assets/train_home.jpg';

export default function Home({navigation}) {
  return (
    <View style={Base.flex}>
      <ImageBackground source={trainTracks} style={Images.homeBackground}>
      <View style={{top: 120}}>
        <View>
          <Text style={Typography.header1}>Tåg-kollen</Text>
        </View>
        <View style={Base.homeSection}>
          <Icon name="search" size={20} style={Icons.homeSearchIcon}/>
          <TextInput
            style={Input.homeInput}
            placeholder="Sök tågstation"
            onPressIn={
            ()=>{navigation.navigate("List")}
            }
          />
        </View>
      </View>
      </ImageBackground>
      <StatusBar style="auto" translucent={true} backgroundColor='transparent' />
    </View>
  );
}
