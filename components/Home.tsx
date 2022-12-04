import { Text, ImageBackground, TextInput, View } from 'react-native';
import { Images, Typography, Input, Base, Icons } from '../styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import trainTracks from '../assets/train_home.jpg';

export default function Home({navigation}) {
    return (
        <View>
            <ImageBackground 
                source={trainTracks} 
                style={Images.homeBackground}
            >
                <View style={{top: 150}}>
                    <View>
                        <Text style={Typography.header2Home}>Tågkollen</Text>
                    </View>
                    <View style={Base.homeSection}>
                        <Icon 
                            name="search" 
                            size={20} 
                            style={Icons.homeSearchIcon}
                        />
                        <TextInput
                            style={Input.homeInput}
                            placeholder="Sök tågstation"
                            placeholderTextColor="#000"
                            onPressIn={
                                ()=>{navigation.navigate("List")}
                            }
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
