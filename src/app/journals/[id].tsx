import JournalEntry from '@/components/journal-entry';
import { deleteEntry, fetchJournalEntry } from '@/config/firebaseHandlers';
import { router, useIsFocused, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { updateEntry } from '@/config/firebaseHandlers';

/**
 * User Journal entry template with option to edit and delete entry.
 * @version 1.0
 * @author Hannah Shiang
 * @returns User Journal Page with information from selected entry.
 */
export default function UserJournal() {
    const { id } = useLocalSearchParams();
    const [journal, setJournal] = useState<any[]>([]);
    const isFocused = useIsFocused();
    const [editing, setEditing] = useState(false);

    // Fetch journal entry based on given id.
    const loadJournals = async () => {
        const journalEntry = await fetchJournalEntry(id)
        setJournal(journalEntry);
    };

    // Load journal when page is focused.
    useEffect(() => {
        if (isFocused) {
            loadJournals();
        }
    }, [isFocused])

    // Update journal entry with new user inputted information and set editing state to false.
    async function handleEdit(title: string, location: any, entry: string) {
        await updateEntry(id, title, location, entry);
        setEditing(false);
        await loadJournals();
    }
    return (
        <ScrollView>
            {journal.map((entry) => {
                return (
                    <View key={entry.id}
                        style={styles.entryPage}>
                        {editing ? <JournalEntry
                            type='old'
                            oldEntry={entry?.entry}
                            oldLocation={entry?.location}
                            oldTitle={entry?.title}
                            handler={(title, location, entry) => { handleEdit(title, location, entry) }} /> :
                            <>
                                <Text style={styles.title}>{entry.title}</Text>
                                <Text style={styles.dateText}>{String(entry.date.toDate())}</Text>
                                <Text style={styles.locationText}>{entry.location.text.text ?? ''}</Text>
                                <Text style={styles.entryText}>{entry.entry}</Text>
                                <Pressable
                                    style={styles.editingButton}
                                    onPress={() => {
                                        setEditing(true)
                                    }} >
                                    <Text style={styles.buttonText}> Edit</Text>
                                </Pressable>
                            </>}

                        <Pressable
                            style={styles.deleteButton}
                            onPress={() => {
                                deleteEntry(id)
                                router.back()
                            }} >
                            <Text style={styles.buttonText}>Delete Entry</Text>
                        </Pressable>
                    </View>
                )
            })}
        </ScrollView>)
}

// Style sheet for journal entry page.
const styles = StyleSheet.create({
    entryPage: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    dateText: {
        fontSize: 16,
        color: 'gray'
    },
    locationText: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10
    },
    entryText: {
        fontSize: 16,
        marginBottom: 10
    },
    editingButton: {
        borderRadius: 20,
        height: 40,
        width: 180,
        marginTop: 12,
        padding: 5,
        backgroundColor: "black",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    deleteButton: {
        borderRadius: 20,
        height: 40,
        width: 180,
        marginTop: 12,
        padding: 5,
        backgroundColor: "pink",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: "white",
        fontSize: 22,
        fontWeight: 'bold'
    }
})