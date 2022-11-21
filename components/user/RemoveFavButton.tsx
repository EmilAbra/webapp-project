import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

export default function RemoveFavButton({ onPress }) {

    return (
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFF',
              height: 'auto',
              maxWidth: '100%',
              position: 'relative',
              elevation: 5,
              padding: 10,
              borderRadius: 5,
            }}
            onPress={onPress}
            >
            <View style={{borderRadius: 10}}>
              <Text style={{textAlign: 'center'}}>Ta bort</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
 
};

