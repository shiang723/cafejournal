import JournalEntry from "@/components/journal-entry";
import { handleAddJournal } from "@/config/firebaseHandlers";
import { router } from "expo-router";


export default function NewJournalPage() {

    function handleSave(title: string, location: any, entry: string) {
        handleAddJournal(title, location, entry)
        router.back()
    }

    return (
        <JournalEntry
            handler={(title, location, entry) => handleSave(title, location, entry)}
            type="new" />
    )
}