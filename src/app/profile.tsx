import SignInSignUp from "@/components/sign-in-sign-up";
import { auth } from "@/config/firebaseConfig";
import { handleSignOut } from '@/config/firebaseHandlers';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from "react-native";

/**
 * Profile page that displays user information and sign out button.
 * If no user logged in, shows sign in or sign up options.
 * @version 1.0
 * @author Hannah Shiang
 * @returns Profile page for user
 */
export default function Profile() {

    const [user, setUser] = useState<any | null>(null)

    // Check if user is logged in.
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

//Style sheet for page.
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