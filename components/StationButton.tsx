import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Button, Typography } from '../styles';

export default function StationButton({ onPress, title }) {
    return( 
        <TouchableOpacity 
            onPress={onPress} 
            style={Button.stationButtonContainer}
        >
            <Text style={Typography.stationButtonText}>{title}</Text>
        </TouchableOpacity>
    )
};
