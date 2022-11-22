import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

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
