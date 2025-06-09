// app/app/_layout.tsx
import { Tabs } from 'expo-router'
import ProtectedRoute from '../../components/ProtectedRoute'
import { Ionicons } from '@expo/vector-icons'

export default function AppTabsLayout() {
  return (
    <ProtectedRoute>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: any = 'home'
            if (route.name === 'journal') iconName = 'book'
            if (route.name === 'mood') iconName = 'happy'
            if (route.name === 'settings') iconName = 'settings'
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: '#4f46e5',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      />
    </ProtectedRoute>
  )
}

