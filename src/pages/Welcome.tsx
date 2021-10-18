import React, { useCallback } from 'react'
import { 
  Image, 
  Text, 
  SafeAreaView, 
  TouchableOpacity,
  StyleSheet, 
  Platform,
  Dimensions,
  View
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/core'

import wateringImg from '../assets/watering.png'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

export function Welcome() {
  const navigation = useNavigation()

  const handleStart = useCallback(() => {
    navigation.navigate('UserIdentification')
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'}
          suas plantas de {'\n'}
          forma fácil
        </Text>

        <Image
          style={styles.image}
          source={wateringImg} 
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleStart}
        >
          <Feather 
            name="chevron-right" 
            style={styles.buttonIcon} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    lineHeight: 38,
    textAlign: 'center',
    color: colors.heading,
    marginTop: Platform.OS === 'ios' ? 38 : 58
  },
  subtitle: {
    fontFamily: fonts.text,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading
  },
  image: {
    height: Dimensions.get('window').width * 0.7
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: Platform.OS === 'ios' ? 10 : 30,
    height: 56,
    width: 56
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32
  }
})