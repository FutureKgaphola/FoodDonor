
import AppLogo from "@/components/AppLogo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [pswrd, setPassword] = useState("");
    const [sucure, SetSecurity] = useState(false);
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
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.BigText}>Welcome Back</Text>
                                <Text style={styles.loginContinueText}>Login to continue</Text>
                                <AppLogo height={50} width={50} title="FoodDonor" />
                                <Image
                                    style={{ width: 250, height: 250, objectFit: "contain", alignSelf: "center" }}
                                    source={require('../assets/images/plate.png')} />
                            </ScrollView>

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
                    <View style={{ gap: 5,padding:5 }}>
                        <TouchableOpacity onPress={() => router.navigate('/forgotpassword')}>
                            <Text style={styles.loginContinueText}>Forgot password?</Text></TouchableOpacity>
                        <Button

                            textColor="black"
                            style={{ marginBottom: 5, marginTop: 5, borderColor: '#387F39', borderWidth: 2 }}
                            mode="outlined" onPress={() => router.navigate('/(tabs)')}>
                            Log In
                        </Button>
                        <Button
                            buttonColor="#387F39"
                            icon="send" mode="contained" onPress={() => router.navigate('/register')}>
                            Create An Account
                        </Button>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                            <Text style={{ fontFamily: 'PoppinsLight' }}>Or Sign In With </Text>
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

export default LoginPage;

const styles = StyleSheet.create({
    BigText: {
        color: 'black',
        fontSize: 30,
        lineHeight: 32,
        marginTop: 6,
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