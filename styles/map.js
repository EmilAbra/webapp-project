import { Dimensions } from "react-native";

export const container = {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
};

export const mapHalfHeight = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
};

export const mapFullSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};