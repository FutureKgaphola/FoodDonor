import { memo, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";
import { Divider, TextInput } from "react-native-paper";
import { s } from "react-native-wind";
import Ionicons from '@expo/vector-icons/Ionicons';

const Centers = () => {
    const [text, setText] = useState("");
    const [uiPlaces, SetUIplaces] = useState<any>([]);
    const [lat,setLat]=useState(-23.9116681);//ur current lat
    const [lon,setLon]=useState(29.4559915);//ur current lat
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
    const AnimateToArea=(p:any)=>{
        setLat(p.latitude);
        setLon(p.longitude);
    }

    useEffect(() => {
        if(text.trim()!==""){
            const filteredPlaces = Places.filter(p =>
                p.place.toLowerCase().includes(text.toLowerCase())
            );
            SetUIplaces(filteredPlaces);
        }else if(text.trim()==""){
            SetUIplaces([]);
        }
    }, [text]);

    return (
        <View style={styles.container}>
            <TextInput style={styles.SearchBox}
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
                    uiPlaces.length!==0 && uiPlaces?.map((p:any)=>(
                        <TouchableOpacity
                        onPress={()=>AnimateToArea(p)}
                         key={p?.id}>
                        <View style={{ flexDirection: 'row' }}><Ionicons name="pin" size={24} color="black" />
                    <Text style={{ fontSize: 18,flexWrap:'wrap' }}>{p.place}</Text>
                </View>
                <Divider />
                        </TouchableOpacity>
                    ))
                }
                {
                    text.trim()!=="" && uiPlaces.length==0 && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Ionicons name="sad-outline" size={24} color="black" />
                    <Text>No Results found</Text></View>
                }
            </View>

            <MapView
                style={styles.map}
                zoomEnabled
                region={{
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                
            />
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