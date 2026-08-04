import { handleLogin, handleSignUp } from '@/config/firebaseHandlers';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function SignInSignUp() {

    const [username, onChangeUsername] = useState('');
    const [password, onChangePassword] = useState('');
    const [email, onChangeEmail] = useState('');
    const [loginPage, setLoginPage] = useState(true);

    return (
        <View style={styles.auth}>
            {loginPage ?
                <View>
                    <TextInput
                        autoComplete={'email'}
                        style={styles.input}
                        placeholder='email'
                        onChangeText={text => onChangeEmail(text)}
                        value={email}
                    />
                    <TextInput
                        autoComplete={'password'}
                        style={styles.input}
                        placeholder='password'
                        onChangeText={text => onChangePassword(text)}
                        value={password}
                    />
                    <View style={styles.button}>
                        <Button
                            color={'pink'}
                            title='Sign In'
                            onPress={() => { handleLogin(email, password) }}
                        />
                    </View>
                    <View style={styles.button}>
                        <Text
                            style={styles.clickableText}
                            onPress={() => { setLoginPage(false) }}>
                            Create an account
                        </Text>
                    </View>
                </View> :
                <View >
                    <TextInput
                        autoComplete={'username'}
                        style={styles.input}
                        placeholder='username'
                        onChangeText={onChangeUsername}
                        value={username}
                    />
                    <TextInput
                        autoComplete={'email'}
                        style={styles.input}
                        placeholder='email'
                        onChangeText={text => onChangeEmail(text)}
                        value={email}
                    />
                    <TextInput
                        autoComplete={'password'}
                        style={styles.input}
                        placeholder='password'
                        onChangeText={text => onChangePassword(text)}
                        value={password}
                    />
                    <View style={styles.button}>
                        <Button
                            color={'pink'}
                            title='Sign Up'
                            onPress={() => { handleSignUp(username, email, password) }}
                        />
                    </View>
                    <View style={styles.button}>
                        <Text
                            style={styles.clickableText}
                            onPress={() => { setLoginPage(true) }}>
                            Log into existing account
                        </Text>
                    </View>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    auth: {
        backgroundColor: 'lavenderblush',
        color: 'hotpink',
        paddingTop: 50,
        height: '100%',
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
        textDecorationLine: 'underline',
    }
});