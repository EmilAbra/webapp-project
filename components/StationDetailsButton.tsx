import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Button, Typography } from '../styles';

export default function StationDetailsButton({ onPress, title, arrival, expectedArrival, delayedInMin}) {

    return (
        <View style={Button.detailsButtonContainer}>
          <TouchableOpacity
            style={Button.detailsButton}
            onPress={onPress}
            >
            <View>
              <Text style={Typography.normalBold}>{title}</Text>
              <Text style={Typography.stationDetailsText}>Planerad ankomst: {'\t\t'}{arrival}</Text>
              <Text style={Typography.stationDetailsText}>Ny ankomst: {'\t\t\t\t\t\t\t\t\t'}{expectedArrival}</Text>
              <Text style={Typography.stationDetailsText}>Försening: {'\t\t\t\t\t\t\t\t\t\t'}{delayedInMin} min</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
 
};

