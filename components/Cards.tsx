import { Dimensions, FlatList, View } from "react-native";
import { Text } from "react-native";
import { Card } from "react-native-paper";
import { s } from "react-native-wind";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const DataCards = [
    {
        key: 1, title: "Donations", stadings: "12K", feltby: "125K", imgSrc: require('../assets/images/dish.png')
    },
    {
        key: 2, title: "Already Feed", stadings: "2K", feltby: "15K", imgSrc: require('../assets/images/burger.png')
    },
    {
        key: 3, title: "Funds Raised", stadings: "R500.85", feltby: "150K", imgSrc: require('../assets/images/salary.png')
    }
]

const CardsView = () => {
    return (
        <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
            data={DataCards}
            renderItem={({ item }) => (
                <View style={{ width: (Dimensions.get("screen").width / 2 )-12, padding: 5 }}>
                    <Card style={{ backgroundColor: '#387F39', padding: 5 }}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={item.imgSrc}
                        />
                        <Text style={s`text-base text-white`}>{item.title} </Text>
                        <Text style={s`text-2xl font-bold text-white`}>{item.stadings} </Text>
                        <View style={s`justify-center`}>
                            <Text style={s`text-white underline`}>felt by {item.feltby}</Text>
                            <View style={{ backgroundColor: 'white', flexDirection: "row", width: 21, borderRadius: 5 }}>
                                <Ionicons
                                    name="heart"
                                    size={20}
                                    color={"#cf0a4c"}
                                />
                            </View>
                        </View>

                    </Card>
                </View>
            )}

        />
    );
}

export default CardsView;