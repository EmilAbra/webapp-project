import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button } from '../styles';

// TouchableOpacity.defaultProps = { activeOpacity: 0.2 };

export default function AppButton({ onPress, title }) {
    return( 
        <TouchableOpacity onPress={onPress} style={Button.appButtonContainer}>
            <Text style={Button.appButtonText}>{title}</Text>
        </TouchableOpacity>
    )
 
};

// const App = () => {
//   return (
//     <View style={styles.screenContainer}>
//       <AppButton title="Hey there!" size="sm" backgroundColor="#007bff" />
//     </View>
//   );
// };

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

