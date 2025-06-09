import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { supabase } from '../../lib/supabase'
import { router } from 'expo-router'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else router.replace('/(app)/home')
  }

  return (
    <View className="flex-1 justify-center px-6 bg-white dark:bg-black">
      <Text className="text-2xl font-bold mb-4 text-center text-black dark:text-white">Create an Account</Text>
      
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        className="border border-gray-300 dark:border-gray-700 p-3 rounded-xl mb-3 bg-white dark:bg-gray-900 text-black dark:text-white"
      />
      
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        className="border border-gray-300 dark:border-gray-700 p-3 rounded-xl mb-4 bg-white dark:bg-gray-900 text-black dark:text-white"
      />

      {error ? <Text className="text-red-500 mb-4">{error}</Text> : null}

      <TouchableOpacity
        className="bg-indigo-600 p-3 rounded-xl mb-2"
        onPress={handleSignUp}
      >
        <Text className="text-white text-center font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/login')}>
        <Text className="text-center text-gray-500 mt-2">Already have an account? <Text className="text-indigo-600">Log In</Text></Text>
      </TouchableOpacity>
    </View>
  )
}
