import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

// TouchableOpacity.defaultProps = { activeOpacity: 0.2 };

export default function AuthButton({ onPress, title, style, titleStyle }) {

    return (
        <View>
            <TouchableOpacity
                style={style}
                onPress={onPress}
            >
                <View>
                    <Text style={titleStyle}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
 
};
