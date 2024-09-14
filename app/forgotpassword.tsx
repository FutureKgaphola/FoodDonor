
import AppLogo from "@/components/AppLogo";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const forgotpassword = () => {
    const [email, setEmail] = useState("");
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.BigText}>Forgot your Password?</Text>
                    <Text style={styles.loginContinueText}>We will send you a reset password link to your email to reset with.</Text>
                    <AppLogo height={50} width={50} title="FoodDonor" />
                    <Image
                        style={{ width: 250, height: 250, objectFit: "contain", alignSelf: "center" }}
                        source={require('../assets/images/plate.png')} />
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
                    
                    <View style={{ gap: 5 }}>
                        
                        <Button
                            buttonColor="#387F39"
                            icon="send" mode="contained" onPress={() => console.log('Pressed')}>
                            Send Reset Link
                        </Button>
                        
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
 
export default forgotpassword;

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