import AppLogo from "@/components/AppLogo";
import { Ionicons } from "@expo/vector-icons";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, useColorScheme, View } from "react-native";
import { Button, Chip, TextInput } from "react-native-paper";
import { s } from "react-native-wind";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const contribute = () => {
    const [selectedPlace, setPlace] = useState<string>("");
    const [amount, setAmount] = useState<number>(2.00);
    const isDarkMode = useColorScheme() === 'dark';

    const handlePayment = () => {
        if (selectedPlace.trim() == "") {
            Alert.alert("Invalid trust Fund", "Please select a trust fund as listed.");
            return;
        }
        if (amount <= 0) {
            Alert.alert("Invalid amount", "Please enter an amount starting at R2.00 or greater.");
            return;
        }

        axios.post('https://yocoapi.onrender.com/api/pay', {
            "amount": amount * 100.00,
            "currency": "ZAR",
            "lineItems": [
                {
                    "displayName": "Donation Fee To " + selectedPlace,
                    "quantity": 1,
                    "pricingDetails": {
                        "price": amount * 100.00
                    }
                }
            ]
        }).then(async (resp) => {
            const paymentLink = await resp.data?.redirectUrl;
            Linking.openURL(paymentLink).catch(err => console.error("Couldn't load page", err));
        }).catch(error => {
            console.error("Payment Error: ", error.message);
            Alert.alert("Failed Deposit", "We had an issue while processing your request. try again or contact administrator");
            return;
        });
    };

    const snapPoints = useMemo(() => ["80%", "82%", "86%"], []);
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        bottomSheetRef.current?.close();
    }, []);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} {...props} />
    ), []);

    const handleSheetChanges = useCallback((index: any) => {
        console.log('handleSheet index', index);
    }, []);

    const Places = [
        { id: '1', place: 'Batho Pele', latitude: -23.9116681, longitude: 29.4559915 },
        { id: '2', place: 'Children Of Hope', latitude: -23.9216681, longitude: 29.4559915 },
        { id: '3', place: 'Meal Of The Nation', latitude: -22.9216681, longitude: 29.4559915 }
    ];

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} style={s`m-2`}>
                    <View style={s`flex-row w-full`}>
                        <View style={s`aspect-[4/2] object-cover`}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[s`text-5xl font-bold`, { color: isDarkMode ? 'white' : 'black' }]}>{`"Be`}</Text>
                                <Text style={s`text-5xl text-appGreen`}>{` part`}</Text>
                            </View>
                            <Text style={[s`text-4xl`, { color: isDarkMode ? 'white' : 'black' }]}>{`of the`}</Text>
                            <Text style={s`text-4xl text-appGreen font-bold`}>{`solution"`}</Text>
                        </View>
                        <AppLogo title={""} width={95} height={95} />
                    </View>
                    <View style={{ marginTop: 10, alignSelf: "center", gap: 5 }}>
                        <TouchableOpacity onPress={() => router.navigate('/Camera')}>
                            <Button icon={() => (
                                <Ionicons name="camera" size={24} color={"white"} />
                            )}
                                mode="contained"
                                buttonColor="#387F39"
                                textColor="white"
                            >
                                Snap Your Food or Item
                            </Button>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()}>
                            <Button
                                style={{ marginBottom: 5, marginTop: 5, borderColor: '#387F39', borderWidth: 2 }}
                                icon={() => (
                                    <FontAwesome name="money" size={24} color="black" />
                                )}
                                mode="outlined"
                                textColor="black"
                            >
                                Donate Cash
                            </Button>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <BottomSheet index={-1}
                    enablePanDownToClose
                    backdropComponent={renderBackdrop}
                    snapPoints={snapPoints}
                    ref={bottomSheetRef}
                    onChange={handleSheetChanges}
                >
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS == "ios" ? 'padding' : undefined}
                        keyboardVerticalOffset={60}
                    >
                        <BottomSheetView style={styles.contentContainer}>
                            <Text style={s`text-lg font-bold text-center`}>Donate Cash</Text>
                            <View style={s`m-1`}>
                                <FlatList
                                    style={{ zIndex: 5 }}
                                    showsHorizontalScrollIndicator={false}
                                    data={Places}
                                    horizontal
                                    keyExtractor={(key) => key.id}
                                    renderItem={({ item }) => (
                                        <View style={{ flexDirection: 'row', gap: 5, marginLeft: 3 }}>
                                            <Chip
                                                onPress={() => setPlace(item.place)}
                                                icon={() => (<Ionicons
                                                    name={"home-outline"}
                                                    size={17}
                                                    color={"white"}
                                                />)}
                                                style={{ backgroundColor: '#387F39', marginTop: 2, marginBottom: 2 }}
                                                textStyle={{ color: "white" }}
                                            >{item.place}</Chip>
                                        </View>
                                    )}
                                />
                                <Text style={s`text-sm font-thin`}>{selectedPlace.trim() !== "" ? selectedPlace + ' ✅' : selectedPlace}</Text>
                                <TextInput
                                    theme={{ roundness: 15 }}
                                    outlineColor="#387F39"
                                    selectionColor="#387F39"
                                    activeOutlineColor="#387F39"
                                    label="Enter amount"
                                    mode="outlined"
                                    maxLength={5}
                                    inputMode="numeric"
                                    value={!Number.isNaN(amount) ? amount.toString() : "".toString()}
                                    onChangeText={(text) => setAmount(parseFloat(text))}
                                    left={<TextInput.Icon icon={() => (
                                        <FontAwesome name="money" size={24} color="black" />
                                    )} color={"#387F39"} />}
                                    placeholder="0.00"
                                />

                                <View style={s`flex flex-row p-2 items-center`}>
                                    <Ionicons name="alert-circle-outline" size={15} color="#F6E96B" />
                                    <Text style={s`text-sm font-thin`}>Thank you for this contribution. The funds will be awarded to the trust fund of your choice. 5% of the donation will be used to help improve and maintain the app.</Text>
                                </View>
                                <Button
                                    buttonColor="#387F39"
                                    icon="send" mode="contained"
                                    onPress={handlePayment}
                                >
                                    Complete Donation
                                </Button>
                                <Text style={s`text-sm font-medium`}>Note: We are able to process amount of under R90 000 at the moment.</Text>
                            </View>
                        </BottomSheetView>
                    </KeyboardAvoidingView>
                </BottomSheet>
            </GestureHandlerRootView>
        </TouchableWithoutFeedback>

    );
}

export default memo(contribute);

const styles = StyleSheet.create({
    contentContainer: {
        padding: 5
    },
});
