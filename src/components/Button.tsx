import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  text: string
  additionalStyle?: Object[]
}

export function Button({ text, additionalStyle = [], ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, ...additionalStyle]}
      {...rest}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading
  }
})