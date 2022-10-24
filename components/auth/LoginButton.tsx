import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button } from '../styles';

// TouchableOpacity.defaultProps = { activeOpacity: 0.2 };

export default function DetailsButton({ onPress, title }) {

    return (
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#4CAF50',
              height: 'auto',
              maxWidth: '100%',
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 20, 
              padding: 7,
              borderRadius: 5,
            }}
            onPress={onPress}
            >
            <View>
              <Text style={{fontSize: 25, color: '#FFF', textAlign: 'center'}}>{title}</Text>
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

