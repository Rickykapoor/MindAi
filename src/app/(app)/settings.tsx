import { View, Text, Switch } from 'react-native'
import { useState } from 'react'

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <View className="flex-1 bg-white dark:bg-black px-4 py-6">
      <Text className="text-2xl font-bold text-black dark:text-white mb-4">Settings</Text>

      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg text-black dark:text-white">Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <Text className="text-sm text-gray-500 dark:text-gray-400">
        (Note: toggle is local only — you can hook this to your app theme settings later.)
      </Text>
    </View>
  )
}
