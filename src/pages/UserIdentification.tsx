import React, { useCallback, useState } from 'react'
import { 
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Button } from '../components/Button'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()

  const navigation = useNavigation()

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!name)
  }, [name])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  function handleInputChange(value: string) {
    setName(value)
    setIsFilled(!!value)
  }

  const handleSubmit = useCallback(async () => {
    if (!name)
      return Alert.alert('Me diz como chamar você 😢')

    try {
      await AsyncStorage.setItem('@plantmanager:user', name)
      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect'
      })
    } catch {
      Alert.alert('Não foi possível salvar o seu nome. 😢')

    }
  }, [isFilled, name])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>{ isFilled ? '😄' : '😃' }</Text>
                <Text style={styles.title}>
                  Como podemos{'\n'} 
                  chamar você?
                </Text>
              </View>
          
              <TextInput 
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
          
              <View style={styles.footer}>
                <Button 
                  text="Confirmar" 
                  additionalStyle={isFilled ? [] : [{ backgroundColor: '#99dbb4' }]}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    width: '100%',
  },
  form: {
    flex: 1,
    paddingHorizontal: 54,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 44
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 24,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },
  footer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40
  }
})