import { Dimensions } from "react-native";

export const container = {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
};

export const map = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};