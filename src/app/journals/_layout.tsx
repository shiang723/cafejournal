import { Stack, usePathname } from "expo-router";

export default function Layout() {
    const pathname = usePathname();
    return (
        <Stack screenOptions={{
            animation: pathname.startsWith("/journals") ? "default" : "none",
        }}>
            <Stack.Screen name="index" options={{ title: 'Journals' }} />
            <Stack.Screen name='new-journal-page' options={{ title: "New Journal Entry" }} />
            <Stack.Screen name='[id]' options={{ title: 'Journal Entry' }} />
        </Stack>
    )
}