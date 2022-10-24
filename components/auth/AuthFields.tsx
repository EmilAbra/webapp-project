import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../../styles';
import AppButton from '../AppButton';

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {
    return (
        <View style={Base.container}>
            <Text style={Typography.header2}>{title}</Text>

            <Text style={Forms.label}>E-post</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <Text style={Forms.label}>Lösenord</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <AppButton
                title={title}
                onPress={() => {
                    submit();
                }}
            />
            {title === "Logga in" &&
                <AppButton
                    title="Registrera istället"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                />
            }
        </View>
    );
};
