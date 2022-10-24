import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button } from '../styles';

// TouchableOpacity.defaultProps = { activeOpacity: 0.2 };

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

// const App = () => {
//   return (
//     <View style={styles.screenContainer}>
//       <AppButton title="Hey there!" size="sm" backgroundColor="#007bff" />
//     </View>
//   );
// };

const styles = StyleSheet.create({
    container: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
});

// const styles = StyleSheet.create({
//   screenContainer: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 16
//   },
//   appButtonContainer: {
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 12
//   },
//   appButtonText: {
//     fontSize: 17,
//     color: "#000",
//   }
// });

