import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Button, Typography } from '../styles';

export default function StationDetailsButton({ 
    onPress, 
    title, 
    arrival, 
    expectedArrival, 
    delayedInMin}) {

    return (
        <View style={Button.detailsButtonContainer}>
            <TouchableOpacity
                style={Button.detailsButton}
                onPress={onPress}
            >
                <View>
                    <Text style={Typography.normalBold}>{title}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={Typography.stationDetailsText}>
                            Planerad ankomst: 
                        </Text>
                        <Text>
                            {arrival}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={Typography.stationDetailsText}>
                            Ny ankomst: 
                        </Text>
                        <Text style={Typography.expectedArrival}>
                            {expectedArrival}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={Typography.stationDetailsText}>
                            Försening: 
                        </Text>
                        <Text style={Typography.delayedInMin}>
                            {delayedInMin} min
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
 
};

