import { useCallback, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { Text, TextInput, Button, ActivityIndicator, Avatar, Card } from 'react-native-paper'
import { supabase } from '../../lib/supabase'
import { router } from 'expo-router'

const mockOpenAIReply = async (text: string) => {
  return `🤖 I'm here for you. You said: "${text}"`
}

export default function Home() {
  const [userInput, setUserInput] = useState('')
  const [chat, setChat] = useState<{ from: 'user' | 'bot'; text: string }[]>([])
  const [loading, setLoading] = useState(false)

  const logout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  const handleSend = useCallback(async () => {
    if (!userInput.trim()) return

    const input = userInput.trim()
    setChat((prev) => [...prev, { from: 'user', text: input }])
    setUserInput('')
    setLoading(true)

    const aiReply = await mockOpenAIReply(input)
    setChat((prev) => [...prev, { from: 'user', text: input }, { from: 'bot', text: aiReply }])
    setLoading(false)

    await supabase.from('chat_logs').insert([
      {
        user_id: (await supabase.auth.getUser()).data.user?.id,
        message: input,
        response: aiReply,
      },
    ])
  }, [userInput])

  return (
    <View className="flex-1 bg-white dark:bg-black px-4 pt-12 pb-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold text-black dark:text-white">AI Therapy 💬</Text>
        <Button mode="text" onPress={logout}>Logout</Button>
      </View>

      <ScrollView className="flex-1 mb-4" contentContainerStyle={{ paddingBottom: 12 }}>
        {chat.map((msg, idx) => (
          <Card key={idx} className={`mb-2 ${msg.from === 'user' ? 'self-end bg-indigo-100' : 'self-start bg-gray-100'}`}>
            <Card.Content className="flex-row items-center gap-2">
              {msg.from === 'bot' && (
                <Avatar.Image size={24} source={{ uri: 'https://i.pravatar.cc/300?img=12' }} />
              )}
              <Text className="text-black">{msg.text}</Text>
            </Card.Content>
          </Card>
        ))}
        {loading && <ActivityIndicator size="small" className="mt-2" />}
      </ScrollView>

      <View className="flex-row items-center gap-2">
        <TextInput
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Talk to your AI therapist..."
          mode="outlined"
          className="flex-1"
        />
        <Button mode="contained" onPress={handleSend} disabled={loading}>
          Send
        </Button>
      </View>
    </View>
  )
}
