import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Button } from '../styles';

export default function DetailsButton({ onPress, title, arrival, expectedArrival, delayedInMin}) {

    return (
        <View style={Button.detailsButtonContainer}>
          <TouchableOpacity
            style={Button.detailsButton}
            onPress={onPress}
            >
            <View>
              <Text>{title}</Text>
              <Text>Planerad ankomst: {'\t\t'}{arrival}</Text>
              <Text>Ny ankomst: {'\t\t\t\t\t\t\t'}{expectedArrival}</Text>
              <Text>Försening: {'\t\t\t\t\t\t\t\t\t'}{delayedInMin} min</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
 
};

