import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";


export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'pink' }}>

      <Tabs.Screen name="journals"
        options={
          {
            headerShown: false,
            popToTopOnBlur: true,
            title: "Journals",
            tabBarIcon: ({ color, size }) => (
              <Feather name="book" size={size} color={color} />
            )
          }
        } />
      <Tabs.Screen name="index"
        options={
          {
            title: "Map",
            tabBarIcon: ({ color, size }) => (
              <Feather name="map" size={size} color={color} />
            )
          }
        } />
      <Tabs.Screen name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          )
        }} />

    </Tabs>)
}
