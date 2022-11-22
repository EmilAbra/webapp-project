import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function DetailsButton({ onPress, title, arrival, expectedArrival, delayedInMin}) {

    return (
        <View style={styles.container}>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFF',
              height: 'auto',
              maxWidth: '100%',
              position: 'relative',
              elevation: 5,
              padding: 5
            }}
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

const styles = StyleSheet.create({
    container: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
});

