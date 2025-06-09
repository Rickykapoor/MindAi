import { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { supabase } from '../../lib/supabase'

const moods = ['😊 Happy', '😔 Sad', '😠 Angry', '😨 Anxious', '😴 Tired', '😐 Neutral']

export default function MoodScreen() {
  const [selectedMood, setSelectedMood] = useState('')
  const [saving, setSaving] = useState(false)

  const handleMoodSelect = async (mood: string) => {
    setSelectedMood(mood)
    setSaving(true)

    const { error } = await supabase.from('mood_logs').insert([
      { mood }
    ])

    setSaving(false)

    if (error) {
      Alert.alert('Error', error.message)
    } else {
      Alert.alert('Mood Saved', `Mood "${mood}" logged.`)
    }
  }

  return (
    <View className="flex-1 bg-white dark:bg-black px-4 py-6">
      <Text className="text-2xl font-bold text-black dark:text-white mb-6">How are you feeling?</Text>

      <View className="flex-row flex-wrap gap-2">
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood}
            onPress={() => handleMoodSelect(mood)}
            className={`px-4 py-2 rounded-full border ${
              selectedMood === mood
                ? 'bg-indigo-600 border-indigo-600'
                : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600'
            }`}
          >
            <Text
              className={`${
                selectedMood === mood ? 'text-white' : 'text-black dark:text-white'
              }`}
            >
              {mood}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {saving && (
        <Text className="mt-6 text-indigo-700 dark:text-indigo-300">Saving mood...</Text>
      )}
    </View>
  )
}
