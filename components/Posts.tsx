import { View, Image, Text, ScrollView, TouchableOpacity } from "react-native";

import { Button, Card, Chip, Divider, SegmentedButtons } from "react-native-paper";
import { useState } from "react";
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Posts = () => {
    const [value, setValue] = useState('');
    const pics = [{
        key: 1,
        image: require('../assets/images/man.jpg'),
    },
    {
        key: 2,
        image: require('../assets/images/smile.jpg'),
    }
    ]
    let msg = `In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available`
    const PostData = [
        {
            id: 1, owner: "Future Kgaphola", category: "proper meal", addrs: "15 Bicard Street, Polokwane", subTitle: "Nutrician Care giver", profPic: require("../assets/images/man.jpg"), postDate: "17/05/2024", msg: msg, imgs: [require("../assets/images/food1.jpg"), require("../assets/images/food2.jpg"), require("../assets/images/food2.jpg")]
        },
        {
            id: 2, owner: "Sbonelo Manqobo", category: "fast food", addrs: "174 Eldo Street, Johanesburg", subTitle: "Diatecian", profPic: require("../assets/images/smile.jpg"), postDate: "17/05/2024", msg: msg, imgs: [require("../assets/images/food1.jpg"), require("../assets/images/food2.jpg")]
        },
        {
            id: 3, owner: "Future", category: "other", addrs: "12 Mandela Street, Pretoria", subTitle: "Content creator", profPic: require("../assets/images/man.jpg"), postDate: "17/05/2024", msg: msg, imgs: [require("../assets/images/food1.jpg")]
        }
    ]
    return (
        <View>
            {
                PostData.map((Item) => (
                    <Card key={Item.id} elevation={3} style={{ margin: 5 }}>
                        <View style={{ flexDirection: "row", paddingBottom: 0 }}>
                            <Image
                                source={Item.profPic}
                                style={{
                                    width: 40,
                                    height: 40,
                                    objectFit: "scale-down",
                                    borderColor: "white",
                                    borderWidth: 1,
                                    zIndex: 5,
                                    borderRadius: 150,
                                    shadowColor: "white",
                                    top: 0,
                                }}
                            />
                            <View style={{ marginLeft: 2 }}>
                                <Text style={{ fontFamily: "SpaceMono", fontWeight: "bold" }}>
                                    {Item.owner}
                                </Text>
                                <Text style={{ fontFamily: "SpaceMono", fontSize: 10 }}>
                                    {Item.subTitle}
                                </Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontFamily: "SpaceMono", fontSize: 10 }}>
                                        {Item.postDate}
                                    </Text>
                                    <Entypo
                                        name="back-in-time"
                                        size={12}
                                        color="gray"
                                        style={{ marginLeft: 4 }}
                                    />
                                </View>
                            </View>

                        </View>
                        <View style={{ flexDirection: "row", gap: 2 }}>
                            <Chip style={{ backgroundColor: '#387F39' }} textStyle={{ color: "white" }} icon={() => (<Ionicons
                                name="fast-food-outline"
                                size={17}
                                color={"white"}
                            />)} onPress={() => console.log('Pressed')}>{Item.category}</Chip>
                        </View>
                        <Text style={{ fontFamily: "SpaceMono", fontSize: 13 }}>Pick up point:{Item.addrs} </Text>
                        <Divider />
                        <Text style={{ marginTop: 5, fontFamily: 'PoppinsMedium', margin: 2, textAlign: 'left' }}>
                            {Item.msg}
                        </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ flexDirection: "row", padding: 2 }}>
                            {Item.imgs.map((imgFile, index) => (
                                <Image key={index} source={imgFile} style={{ width: 160, height: 260, padding: 2 }} />
                            ))}
                        </ScrollView>

                        <View
                            style={{

                                height: 1,
                                marginTop: 5,
                                marginBottom: 5,
                            }}
                        ></View>

                        <View style={{ justifyContent: "space-between", alignItems: "stretch", flexDirection: "row", margin: 5 }}>
                            <TouchableOpacity>
                                <Button style={{ height: 40 }} icon={() => (
                                    <AntDesign name="like2" size={15} color={'white'} />
                                )}
                                    mode="contained"
                                    buttonColor="#387F39"
                                    textColor="white"
                                >
                                    Like
                                </Button>
                            </TouchableOpacity>


                            <TouchableOpacity>
                                <Button style={{ height: 40 }} icon={() => (
                                    <MaterialCommunityIcons name="basket-unfill" size={15} color={'white'} />
                                )}
                                    mode="contained"
                                    buttonColor="#387F39"
                                    textColor="white"
                                >
                                    Request
                                </Button>
                            </TouchableOpacity>
                        </View>
                    </Card>
                ))
            }
        </View>
    );
};

export default Posts;