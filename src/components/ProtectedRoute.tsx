import { useAuth } from '../context/AuthProvider'
import { Redirect } from 'expo-router'
import { View, ActivityIndicator } from 'react-native'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) return <View className="flex-1 justify-center items-center"><ActivityIndicator /></View>
  if (!session) return <Redirect href="/login" />

  return children
}
