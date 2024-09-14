import AppLogo from "@/components/AppLogo";
import { Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const NoCameraDeviceError = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={styles.BigText}>Opps!.. Camera Failure</Text>
                <Text style={styles.loginContinueText}>We Could not Detect your device camerea.</Text>
                <AppLogo height={50} width={50} title="FoodDonor" />
                <Image
                    style={{ width: 250, height: 250, objectFit: "contain", alignSelf: "center" }}
                    source={require('../assets/images/cctv.png')} />
            </View>
        </SafeAreaView>
    );
}

export default NoCameraDeviceError;

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