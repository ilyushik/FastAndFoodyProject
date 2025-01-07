import {View, StyleSheet, Image, SafeAreaView, ImageBackground, Text, TextInput, Pressable} from "react-native";
import { useState } from "react";

export default function Entrance() {

    const [formValue, setFormValue] = useState('LogIn')

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <SafeAreaView style={styles.entranceSafeArea}>
            <ImageBackground source={require('../images/Group 19.png')} style={styles.entranceBackground}>
                <View style={styles.entranceContainer}>
                    {formValue === 'LogIn' && (
                        <View style={styles.entranceForm}>
                            <Image source={require('../images/logo_crop.png')} resizeMode="contain" style={styles.entranceLogo}/>

                            <Text style={styles.entranceTitle}>Log In</Text>

                            <View style={styles.entranceTextInputes}>
                                <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.entranceInputField}/>

                                <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.entranceInputField} secureTextEntry={true}/>
                            </View>

                            <Pressable style={styles.entranceButtonTitleWrapper}>
                                <Text style={styles.entranceButtonTitle}>Log in</Text>
                            </Pressable>

                            <View style={styles.entranceAdditionalButtons}>
                                <Pressable onPress={() => setFormValue('SignIn')}>
                                    <Text style={styles.entranceAdditionalButton}>I have no account</Text>
                                </Pressable>

                                <Pressable onPress={() => setFormValue('ForgetPassword')}>
                                    <Text style={styles.entranceAdditionalButton}>Forgot password</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                    {formValue === 'SignIn' && (
                        <View style={styles.entranceForm}>
                            <Image source={require('../images/logo_crop.png')} resizeMode="contain" style={styles.entranceLogo}/>

                            <Text style={styles.entranceTitle}>Sign In</Text>

                            <View style={styles.entranceTextInputes}>
                                <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.entranceInputField}/>

                                <TextInput placeholder="Surname" value={surname} onChangeText={setSurname} style={styles.entranceInputField}/>

                                <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.entranceInputField}/>

                                <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.entranceInputField}/>

                                <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.entranceInputField}/>

                                <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.entranceInputField} secureTextEntry={true}/>
                            </View>

                            <Pressable style={styles.entranceButtonTitleWrapper}>
                                <Text style={styles.entranceButtonTitle}>Sign in</Text>
                            </Pressable>

                            <View style={styles.entranceAdditionalButtons}>
                                <Pressable onPress={() => setFormValue('LogIn')}>
                                    <Text style={styles.entranceAdditionalButton}>I have  account</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                    {formValue === 'ForgetPassword' && (
                        <View style={styles.entranceForm}>
                            <Image source={require('../images/logo_crop.png')} resizeMode="contain" style={styles.entranceLogo}/>

                            <View style={styles.entranceTextInputes}>
                                <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.entranceInputField}/>
                            </View>

                            <Pressable style={styles.entranceButtonTitleWrapper}>
                                <Text style={styles.entranceButtonTitle}>Continue</Text>
                            </Pressable>

                            <View style={styles.entranceAdditionalButtons}>
                                <Pressable onPress={() => setFormValue('LogIn')}>
                                    <Text style={styles.entranceAdditionalButton}>Back</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    entranceSafeArea: {
        flex: 1,
    },
    entranceBackground: {
        flex: 1,
        resizeMode: "cover",
    },
    entranceContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        width: '100%',
    },
    entranceForm: {
        backgroundColor: '#eeeeee',
        paddingHorizontal: 15,
        width: '80%',
        paddingTop: 20,
        borderRadius: 10,
        paddingBottom: 40,
        opacity: 0.9
    },
    entranceLogo: {
        width: 90,
        height: 90,
        marginBottom: 10,
        alignSelf: 'center',
    },
    entranceTitle: {
        fontSize: 25,
        fontWeight: 600,
        textAlign: "center",
        color: 'black'
    },
    entranceTextInputes: {
        alignItems: "center",
        rowGap: 30,
        marginTop: 30
    },
    entranceInputField: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '80%'
    },
    entranceButtonTitleWrapper: {
        marginTop: 20,
    },
    entranceButtonTitle: {
        fontSize: 18,
        alignSelf: 'center',
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#e39600',
        paddingHorizontal: 35,
        paddingVertical: 10,
        borderRadius: 10,
    },
    entranceAdditionalButtons: {
        marginTop: 10,
        rowGap: 5
    },
    entranceAdditionalButton: {
        color: '#696969',
        fontSize: 15,
        alignSelf: 'center',
    }
})