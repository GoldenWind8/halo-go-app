import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

const AppTextInput = ({ ...otherProps }) => {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={Colors.primary}
      style={[
        {
          /*fontFamily: Font["poppins-regular"],*/
          fontSize: FontSize.small,
            paddingTop: Spacing * 1,
          backgroundColor: Colors.white,
          marginVertical: Spacing,
            borderBottomWidth:1,
            borderColor: Colors.primary,
            width: '50%',
        },

      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
