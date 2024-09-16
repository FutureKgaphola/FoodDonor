import { FlatList, Text, View } from "react-native";
import AppLogo from "./AppLogo";
import { Card, Chip } from "react-native-paper";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { IHistory } from "@/app/Interfaces/AppInterFaces";

const HistoryTemplate = ({ dummyData }: { dummyData: IHistory[] }) => {
    return (
        <View>
            <FlatList
                data={dummyData}
                renderItem={({ item }) => (
                    <Card style={{ padding: 5, gap: 5, margin: 5 }}>
                        <AppLogo title="contribution made" width={30} height={30} />
                        {item.category.trim() == "donated cash" ? (
                            <Text style={{ fontFamily: "SpaceMono", fontSize: 10 }}>
                            Receiver(Charity Organization):{item.charityOrganization}
                        </Text>
                        ) : null}
                        
                        <View style={{ flexDirection: 'row' }}>
                            <Chip
                                icon={() => (<Ionicons
                                    name={item.category.trim() == "donated cash" ? "card" : "fast-food-outline"}
                                    size={17}
                                    color={"white"}
                                />)}
                                style={{ backgroundColor: '#387F39', marginTop: 2, marginBottom: 2 }}
                                textStyle={{ color: "white" }}
                            >{item.category}</Chip>
                        </View>
                        <Text>{item.msg}</Text>
                        <View style={{ flexDirection: "row", marginTop: 5, justifyContent: 'flex-end' }}>
                            <Text style={{ fontFamily: "SpaceMono", fontSize: 10 }}>
                                {item.datetime}
                            </Text>
                            <Entypo
                                name="back-in-time"
                                size={12}
                                color="gray"
                                style={{ marginLeft: 4 }}
                            />
                        </View>
                    </Card>
                )}
            />

        </View>
    );
}

export default HistoryTemplate;