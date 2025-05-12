// app/_layout.tsx
import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: true,
            headerTitle: '',
            headerTransparent: false,
            headerStyle: {
              backgroundColor: '#6c5ce7',
            },
          }} 
        />
      </Stack>
    </>
  );
}