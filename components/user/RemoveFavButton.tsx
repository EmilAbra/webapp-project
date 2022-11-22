import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Button } from '../../styles';

export default function RemoveFavButton({ onPress }) {

    return (
        <View style={Button.removeFavContainer}>
          <TouchableOpacity
            style={Button.removeFavButton}
            onPress={onPress}
            >
            <View>
              <Text style={Button.removeFavButtonText}>Ta bort</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
 
};

