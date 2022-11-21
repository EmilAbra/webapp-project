import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Button } from '../styles';

// TouchableOpacity.defaultProps = { activeOpacity: 0.2 };

export default function AppButton({ onPress, title }) {
    return( 
        <TouchableOpacity onPress={onPress} style={Button.appButtonContainer}>
            <Text style={Button.appButtonText}>{title}</Text>
        </TouchableOpacity>
    )
 
};
