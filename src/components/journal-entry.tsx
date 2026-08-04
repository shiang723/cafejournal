import { useState } from "react";
import { Button, Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import SearchBar from "./searchBar";

export default function JournalEntry({ handler, type, oldTitle, oldEntry, oldLocation }:
    {
        handler: (title: any, location: any, entry: string) => void;
        type: string;
        oldTitle?: string;
        oldEntry?: string;
        oldLocation?: any
    }) {
    const [title, setTitle] = useState<string | undefined>(oldTitle);
    const [entry, setEntry] = useState<string | undefined>(oldEntry);
    const [location, setLocation] = useState<any>(oldLocation);


    return (
        <View>
            <TextInput
                value={title}
                onChangeText={text => setTitle(text)}
                placeholder="Journal Title"
                style={styles.title} />
            <SearchBar
                oldLocation={location}
                handlePlaceSelect={(placeData: any) => { setLocation(placeData) }} />
            <TextInput
                multiline
                onChangeText={text => setEntry(text)}
                placeholder="Enter journal content here"
                value={entry}
                style={styles.entry} />
            <View>
                <Button
                    title="Save"
                    onPress={() => { handler(title, location, entry) }}
                />
            </View>
        </View>);
}

const styles = StyleSheet.create({
    title: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        margin: 12,
    },

    entry: {
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        margin: 12,
    }
})