import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button } from '../styles';

// TouchableOpacity.defaultProps = { activeOpacity: 0.2 };

export default function RegisterButton({ onPress, title }) {

    return (
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#EFEFEF',
              height: 'auto',
              maxWidth: '100%',
              marginLeft: 15,
              marginRight: 15,
              padding: 7,
              marginBottom: 20,
              borderRadius: 5,
            }}
            onPress={onPress}
            >
            <View>
              <Text style={{fontSize: 25, color: '#212427', textAlign: 'center'}}>{title}</Text>
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
