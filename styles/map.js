import { Dimensions } from "react-native";

export const halfMapContainer = {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
};

export const mapHalfHeight = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 1.8,
};

export const mapFullSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};