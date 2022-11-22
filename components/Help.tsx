import { Text, View, ImageBackground } from 'react-native';
import { Images, Typography } from '../styles';
import { Help } from '../styles';
import trainTracks from '../assets/train_help.jpg';

export default function appHelp() {
    return (
        <View>
            <ImageBackground source={trainTracks} style={Images.homeBackground}>
                <View style={Help.textContainer}>
                    <Text style={Typography.normal}>På startsidan kan du söka upp de stationer som nuvarande har förseningar.</Text>
                    <Text style={Typography.normal}>Genom att trycka på stationen har du möjligheten att se den på en karta och hur mycket tid du har på dig tills tåget kommer.</Text>
                    <Text style={Typography.normal}>Om du blir medlem kan du spara dina egna favorit-stationer och se om det finns förseningar.</Text>
                </View>
            </ImageBackground>
        </View>
    );
}
