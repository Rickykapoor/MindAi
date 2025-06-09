import "../global.css";
import { Stack } from 'expo-router'
import { AuthProvider } from '../context/AuthProvider'
import { PaperProvider } from 'react-native-paper';

export default function Layout() {
  return (
    <PaperProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </PaperProvider>
  )
}