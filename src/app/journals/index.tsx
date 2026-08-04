'use client'
import { auth } from "@/config/firebaseConfig";
import { fetchJournals } from "@/config/firebaseHandlers";
import { router, useIsFocused } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Journals() {
    const [userJournals, setUserJournals] = useState<Array<{ id: string;[key: string]: unknown }>>([]);
    const isFocused = useIsFocused();
    const [user, setUser] = useState<any | null>(null)

    useEffect(() => {
        const authChange = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
                console.log('No user found');
            }
        });
        return () => authChange();
    }, []);

    useEffect(() => {
        if (isFocused) {
            const loadJournals = async () => {
                const journals = await fetchJournals();
                setUserJournals(journals ?? []);

            };

            loadJournals();
        }
    }, [isFocused]);

    return (
        <View style={styles.page}>
            {(user?.uid) ?
                <ScrollView
                    nestedScrollEnabled={true}
                    style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
                    {userJournals.map((entry) => {
                        return (
                            <Pressable
                                key={entry.id}
                                onPress={() =>
                                    router.navigate({
                                        pathname: '/journals/[id]',
                                        params: { id: String(entry?.id) }
                                    })
                                }>
                                <View style={styles.entryCard}>
                                    <Text>{entry?.title}</Text>
                                    <Text>{String(entry.date.toDate())}</Text>
                                    <Text>{entry.location.structuredFormat.mainText.text}</Text>
                                </View>
                            </Pressable>
                        )
                    })}
                    <Pressable
                        style={styles.addButton}
                        onPress={() => { router.navigate('/journals/new-journal-page') }} >
                        <Text style={styles.buttonText}
                        >+ Add New Journal Entry</Text>
                    </Pressable>
                </ScrollView> :
                <View>
                    <Text>Please Log in to use this feature</Text>
                </View>}
        </View >
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    entryCard: {
        height: 80,
        width: '95%',
        margin: 12,
        padding: 10,
        backgroundColor: 'white'
    },
    addButton: {
        borderRadius: 20,
        height: 40,
        width: 200,
        margin: 12,
        padding: 10,
        backgroundColor: "pink",
        shadowColor: 'black',
        shadowOpacity: 70,
        shadowOffset: { width: 5, height: -10 },
        shadowRadius: 5,
        textShadowColor: 'black',
        textShadowOffset: { width: 2, height: 2 },
    },
    buttonText: {
        color: "white",
        fontSize: 16
    }
})