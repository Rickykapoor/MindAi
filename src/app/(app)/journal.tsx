import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { supabase } from '../../lib/supabase'
import { useEffect } from 'react'

export default function JournalScreen() {
  const [entry, setEntry] = useState('')
  const [reflection, setReflection] = useState('')
  const [loading, setLoading] = useState(false)
  const [journalHistory, setJournalHistory] = useState([])

  const saveJournalEntry = async () => {
    if (!entry.trim()) return Alert.alert('Entry is empty')

    setLoading(true)

    const { data, error } = await supabase.from('journal_entries').insert([
      {
        content: entry,
        reflection,
      },
    ])

    setLoading(false)

    if (error) {
      Alert.alert('Error', error.message)
    } else {
      Alert.alert('Saved', 'Journal entry saved!')
      setEntry('')
      setReflection('')
    }
  }

  const handleAIReflection = async () => {
    // Replace with OpenAI call later
    setReflection("🧠 AI Reflection: This is a sample response.")
  }

  useEffect(() => {
    const fetchJournals = async () => {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('id, content, reflection, created_at')
        .order('created_at', { ascending: false })
        .limit(5)
  
      if (!error) setJournalHistory(data || [])
    }
  
    fetchJournals()
  }, [])
  return (
    <ScrollView className="flex-1 bg-white dark:bg-black px-4 py-6">
      <Text className="text-2xl font-bold text-black dark:text-white mb-4">Journal</Text>

      <TextInput
        placeholder="Write your thoughts..."
        multiline
        numberOfLines={6}
        value={entry}
        onChangeText={setEntry}
        className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl mb-4 h-40"
      />

      <TouchableOpacity
        onPress={handleAIReflection}
        className="bg-purple-500 py-3 rounded-xl mb-2"
      >
        <Text className="text-white text-center font-semibold">Generate AI Reflection</Text>
      </TouchableOpacity>

      {reflection && (
        <View className="bg-purple-100 dark:bg-purple-900 p-4 rounded-xl mb-4">
          <Text className="text-purple-900 dark:text-white font-medium">AI Reflection:</Text>
          <Text className="text-black dark:text-gray-200 mt-2">{reflection}</Text>
        </View>
      )}

      <TouchableOpacity
        onPress={saveJournalEntry}
        disabled={loading}
        className="bg-indigo-600 py-3 rounded-xl"
      >
        <Text className="text-white text-center font-semibold">
          {loading ? 'Saving...' : 'Save Entry'}
        </Text>
      </TouchableOpacity>
      <Text className="text-xl font-semibold text-black dark:text-white mt-8 mb-2">Recent Entries</Text>

{journalHistory.map((entry) => (
  <View key={entry.id} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-4">
    <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">
      {new Date(entry.created_at).toLocaleString()}
    </Text>
    <Text className="text-black dark:text-white mb-1">{entry.content}</Text>
    {entry.reflection && (
      <Text className="text-indigo-700 dark:text-indigo-300 italic">{entry.reflection}</Text>
    )}
  </View>
))}
    </ScrollView>
  )
}
