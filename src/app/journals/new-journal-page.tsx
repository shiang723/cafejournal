import JournalEntry from "@/components/journal-entry";
import { handleAddJournal } from "@/config/firebaseHandlers";
import { router } from "expo-router";

/**
 * New journal entry page with input fields.
 * @version 1.0
 * @author Hannah Shiang
 * @returns New journal entry input page.
 */
export default function NewJournalPage() {

    // Save the given inputs to a new journal entry and return to previous page.
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