import AppLogo from "@/components/AppLogo";
import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Linking, ScrollView, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Button } from "react-native-paper";
import { s } from "react-native-wind";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { router } from "expo-router";
const contribute = () => {
    let isDarkMode = useColorScheme() === 'dark';
    let amonunt = 15.70
    const makepayment = () => {
        axios.post('https://yocoapi.onrender.com/api/pay', {
            "amount": amonunt * 100.00,
            "currency": "ZAR",
            "lineItems": [
                {
                    "displayName": "Donation Fee To Batho Pele",
                    "quantity": 1,
                    "pricingDetails": {
                        "price": amonunt * 100.00
                    }
                }
            ]
        }).then(async (resp) => {
            const paymentLink = await resp.data?.redirectUrl;
            Linking.openURL(paymentLink).catch(err => console.error("Couldn't load page", err));
        }).catch(error => {
            console.log(error.message)
        });
    }
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} style={s`m-2`}>
                <View style={s`flex-row w-full`}>
                    <View style={s`aspect-[4/2] object-cover`}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={[s`text-5xl font-bold`,{color:isDarkMode ? 'white' : 'black'}]}>{`"Be`}</Text>
                            <Text style={s`text-5xl text-appGreen`}>{` part`}</Text>
                        </View>
                        <Text style={[s`text-4xl`,{color:isDarkMode ? 'white' : 'black'}]}>{`of the`}</Text>
                        <Text style={s`text-4xl text-appGreen font-bold`}>{`solution"`}</Text>
                    </View>
                    <AppLogo title={""} width={95} height={95} />
                </View>
                <View style={{ marginTop: 10, alignSelf: "center",gap:5 }}>
                    <TouchableOpacity onPress={()=>router.navigate('/Camera')}>
                        <Button icon={() => (
                            <Ionicons
                                name="camera"
                                size={24}
                                color={"white"}
                            />
                        )}
                            mode="contained"
                            buttonColor="#387F39"
                            textColor="white"
                        >
                            Snap Your Food or Item
                        </Button>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>makepayment()}>
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
        </>
    );
}

export default memo(contribute);