import SignInSignUp from "@/components/sign-in-sign-up";
import { auth } from "@/config/firebaseConfig";
import { handleSignOut } from '@/config/firebaseHandlers';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from "react-native";

export default function Profile() {

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

    // Render based on whether user is null
    return (
        <View>
            {user?.uid ?
                <View style={styles.button}>
                    <Text>{user?.email}</Text>
                    <Button
                        color='pink'
                        title='Sign Out'
                        onPress={() => { handleSignOut() }}
                    />
                </View> : <SignInSignUp />}
        </View>
    )
}
const styles = StyleSheet.create({
    auth: {
        backgroundColor: 'lavenderblush',
        color: 'hotpink'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'hotpink',
    },
    button: {
        height: 40,
        margin: 12,
    },
    clickableText: {
        color: 'hotpink',
        textDecorationLine: 'underline'
    }
});