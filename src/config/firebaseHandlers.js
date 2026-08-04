import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, Timestamp, updateDoc, where } from "firebase/firestore"
import { auth, db } from "./firebaseConfig"

//References code from https://medium.com/@mmusaib/setting-up-firebase-authentication-in-react-native-expo-2024-25-235a1258b53d
export const handleLogin = (email, password) => {
    if (email == "" || password == '') {
        return alert('Email and password are required')
    }
    signInWithEmailAndPassword(auth, email, password).then(async () => {
    }).catch((e) => {
        console.log("Login failed" + e);
    })
}

export const handleSignUp = async (username, email, password) => {
    if (email == "" || password == '') {
        return alert('Email and password are required')
    }
    createUserWithEmailAndPassword(auth, email, password).then(async () => {
    }).catch((e) => {
        console.log("Login failed " + e);
        alert(e);
    })
    try {
        await addDoc(collection(db, "users"), {
            username: username,
            email: email
        });
    } catch (e) {
        console.error("Error adding user" + e)
    }

}

export const handleSignOut = () => {
    signOut(auth).then(() => console.log('User signed out!'));
}




export const handleAddJournal = async (title, location, entry) => {
    const user = auth.currentUser;
    if (user) {
        try {
            const userRef = collection(db, 'users')
            const userQuery = query(userRef, where('email', "==", user.email))
            const userDoc = await getDocs(userQuery)


            userDoc.forEach((userDoc) => {
                addDoc(collection(userRef, userDoc.id, "journal-entries"), {
                    title: title,
                    date: Timestamp.fromDate(new Date()),
                    location: location,
                    entry: entry
                })
            }

            )


        } catch (error) {
            console.log(error)
        }

    }
}

export async function fetchJournals() {
    const user = auth.currentUser;
    if (user) {
        const userRef = collection(db, 'users')
        const userQuery = query(userRef, where('email', "==", user.email))
        const userDoc = await getDocs(userQuery)

        const journalLists = await Promise.all(
            userDoc.docs.map(async (userDoc) => {
                const querySnapshot = await getDocs(collection(userRef, userDoc.id, "journal-entries"), orderBy('date', 'desc'))

                return querySnapshot.docs.map((journalDoc) => ({
                    id: journalDoc.id,
                    ...journalDoc.data(),
                }))
            })
        )

        return journalLists.flat()
    }

    return []
}

export async function fetchJournalEntry(journalID) {
    const user = auth.currentUser;
    if (user) {
        const userRef = collection(db, 'users')
        const userQuery = query(userRef, where('email', "==", user.email))
        const userDoc = await getDocs(userQuery)

        const journalLists = await Promise.all(
            userDoc.docs.map(async (userDoc) => {
                const documentRef = doc(db, 'users', userDoc.id, 'journal-entries', journalID)
                const journalDoc = await getDoc(documentRef)

                if (!journalDoc.exists()) {
                    return []
                }

                return [{
                    id: journalDoc.id,
                    ...journalDoc.data(),
                }]
            })
        )

        return journalLists.flat()

    }
    return []
}

export async function deleteEntry(journalID) {
    const user = auth.currentUser;
    if (user) {
        const userRef = collection(db, 'users')
        const userQuery = query(userRef, where('email', "==", user.email))
        const userDoc = await getDocs(userQuery)

        userDoc.forEach(async (userDoc) => {
            const documentRef = doc(db, 'users', userDoc.id, 'journal-entries', journalID)
            await deleteDoc(documentRef);
        })
    }
}

export async function updateEntry(journalID, title, location, entry) {
    const user = auth.currentUser;
    if (user) {
        const userRef = collection(db, 'users')
        const userQuery = query(userRef, where('email', "==", user.email))
        const userDoc = await getDocs(userQuery)

        userDoc.forEach(async (userDoc) => {
            const documentRef = doc(db, 'users', userDoc.id, 'journal-entries', journalID)
            await updateDoc(documentRef, { title: title, location: location, entry: entry });
        })
    }
}