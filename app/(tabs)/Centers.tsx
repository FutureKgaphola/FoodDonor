import { memo, useEffect, useRef, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Chip, Divider, TextInput } from "react-native-paper";
import { s } from "react-native-wind";
import Ionicons from '@expo/vector-icons/Ionicons';
import AppLogo from "@/components/AppLogo";

const Centers = () => {
    const [text, setText] = useState("");
    const [uiPlaces, SetUIplaces] = useState<any>([]);
    const [lat, setLat] = useState(-23.9116681);//ur current lat
    const [lon, setLon] = useState(29.4559915);//ur current lat
    const mapRef = useRef<MapView | any>();
    const Places = [
        {
            id: '1', place: 'Batho Pele', latitude: -23.9116681, longitude: 29.4559915
        },
        {
            id: '2', place: 'Children Of Hope', latitude: -23.9216681, longitude: 29.4559915
        },
        {
            id: '3', place: 'Meal Of The Nation', latitude: -22.9216681, longitude: 29.4559915
        }
    ]
    const AnimateToArea = (p: any) => {
        mapRef.current?.animateCamera({ center: { latitude: p.latitude, longitude: p.longitude }, zoom: 15 }, { duration: 1500 })
        //setLat(p.latitude);
        //setLon(p.longitude);
    }

    useEffect(() => {
        if (text.trim() !== "") {
            const filteredPlaces = Places.filter(p =>
                p.place.toLowerCase().includes(text.toLowerCase())
            );
            SetUIplaces(filteredPlaces);
        } else if (text.trim() == "") {
            SetUIplaces([]);
        }
    }, [text]);

    return (
        <View style={styles.container}>
            {/* <TextInput style={styles.SearchBox}
                left={<TextInput.Icon icon="pin" />}
                label="Search here..."
                value={text}
                mode="outlined"
                theme={{ roundness: 15 }}
                outlineColor="#387F39"
                activeOutlineColor="#387F39"
                selectionColor="#387F39"
                onChangeText={text => setText(text)}
                onSubmitEditing={(e) => console.log('submitted')}
            />
            <View style={s`rounded p-1 gap-1`}>
                {
                    uiPlaces.length !== 0 && uiPlaces?.map((p: any) => (
                        <TouchableOpacity
                            onPress={() => AnimateToArea(p)}
                            key={p?.id}>
                            <View style={{ flexDirection: 'row' }}><Ionicons name="pin" size={24} color="black" />
                                <Text style={{ fontSize: 18, flexWrap: 'wrap' }}>{p.place}</Text>
                            </View>
                            <Divider />
                        </TouchableOpacity>
                    ))
                }
                {
                    text.trim() !== "" && uiPlaces.length == 0 && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Ionicons name="sad-outline" size={24} color="black" />
                        <Text>No Results found</Text></View>
                }
            </View> */}
            <FlatList
                style={{ zIndex: 6, position: 'absolute' }}
                showsHorizontalScrollIndicator={false}
                data={Places}
                horizontal
                keyExtractor={(key) => key.id}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', gap: 5, marginLeft: 3 }}>
                        <Chip onPress={() => AnimateToArea(item)}
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
            <MapView
                style={styles.map}
                zoomEnabled
                region={{
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                showsUserLocation
                showsMyLocationButton
                ref={mapRef}
            >
                {
                    Places?.map((mrk) => (
                        <Marker key={mrk.id}
                            coordinate={{ latitude: mrk.latitude, longitude: mrk.longitude }}>
                            {Platform.OS == "ios" ? <AppLogo title={mrk.place} width={25} height={25} /> : null}
                        </Marker>
                    ))
                }
            </MapView>
        </View>
    );
}

export default memo(Centers);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    SearchBox: {
        borderRadius: 15,
        margin: 2.5
    }
});