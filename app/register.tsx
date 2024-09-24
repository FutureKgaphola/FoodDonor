
import AppLogo from "@/components/AppLogo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const register = () => {
    const [email, setEmail] = useState("");
    const [pswrd, setPassword] = useState("");
    const [sucure, SetSecurity] = useState(false);
    const [uName, setName] = useState("");
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS == "ios" ? 'padding' : undefined}
                        keyboardVerticalOffset={60}
                    >
                        <View style={styles.container}>
                            <Text style={styles.BigText}>Happy To see you Join Us</Text>
                            <Text style={styles.loginContinueText}>Become a memeber and start contributing today. One meal at a Time.</Text>
                            <AppLogo height={50} width={50} title="FoodDonor" />
                            <TextInput
                                theme={{ roundness: 15 }}
                                outlineColor="#387F39"
                                selectionColor="#387F39"
                                activeOutlineColor="#387F39"
                                label="Name"
                                value={uName}
                                mode="outlined"
                                inputMode="text"
                                left={<TextInput.Icon icon={() => <Ionicons name="person-circle" size={24} color="#387F39" />} color={"#387F39"} />}
                                placeholder="Type your name"
                                onChangeText={nam => setName(nam)}
                            />
                            <TextInput
                                theme={{ roundness: 15 }}
                                outlineColor="#387F39"
                                selectionColor="#387F39"
                                activeOutlineColor="#387F39"
                                label="Email"
                                value={email}
                                mode="outlined"
                                inputMode="email"
                                left={<TextInput.Icon icon="email" color={"#387F39"} />}
                                placeholder="Type email"
                                onChangeText={em => setEmail(em)}
                            />
                            <TextInput
                                theme={{ roundness: 15 }}
                                outlineColor="#387F39"
                                activeOutlineColor="#387F39"
                                selectionColor="#387F39"
                                label="Password"
                                value={pswrd}
                                secureTextEntry={sucure}
                                mode="outlined"
                                placeholder="Type password"
                                right={<TextInput.Icon color={"#387F39"}
                                    onPress={() => SetSecurity(!sucure)} icon={sucure ? "eye-off" : "eye"} />}
                                onChangeText={ps => setPassword(ps)}
                            />

                        </View>
                    </KeyboardAvoidingView>
                    <View style={{ gap: 5, marginTop: 5,padding:5 }}>

                        <Button
                            buttonColor="#387F39"
                            icon="send" mode="contained" onPress={() => console.log('Pressed')}>
                            Submit
                        </Button>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                            <Text style={{ fontFamily: 'PoppinsLight' }}>Or Sign Up With </Text>
                            <TouchableOpacity>
                                <Image style={{ objectFit: "contain", width: 40, height: 40 }} source={require('../assets/images/google.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            </TouchableWithoutFeedback>


        </SafeAreaView>
    );
}

export default register;

const styles = StyleSheet.create({
    BigText: {
        color: 'black',
        fontSize: 30,
        marginTop: 8,
        fontFamily: 'PoppinsBold'
    },
    loginContinueText: {
        color: '#387F39',
        fontSize: 18,
        lineHeight: 32,
        marginTop: 6,
        fontFamily: 'PoppinsLight',
    },
    container: {
        justifyContent: "center",
        alignContent: 'center',
        padding: 10,
        gap: 5
    }
});