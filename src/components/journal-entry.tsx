import { useState } from "react";
import { Button, Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import SearchBar from "./searchBar";

/**
 * A journal entry component with inputs and save button.
 * @version 1.0
 * @author Hannah Shiang
 * @param handler function for how to handle the journal info.
 * @param type string on whether entry is new or old.
 * @param oldTitle the title of the journal, if exists.
 * @param oldEntry the entry of the journal, if exists.
 * @param oldLocation the location for the journal, if exists.
 * @returns A journal entry input template.
 */
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

// Style sheet for component.
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