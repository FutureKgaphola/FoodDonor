import { useStyleSheet } from '@/Styles/useStyleSheet';
import { Ionicons } from '@expo/vector-icons';
import { Button } from "react-native-paper";
import { s } from "react-native-wind";
import { Image, View, Text, ScrollView } from 'react-native';
import CardsView from '@/components/Cards';
import Posts from '@/components/Posts';
export default function HomeScreen() {
  const { styles } = useStyleSheet();
  return (
    <ScrollView style={styles.Container}>
      <View>
        <Image
          style={s`relative h-52 w-full aspect-[4/2] object-cover`}
          source={require("../../assets/images/africacover.png")}
        />
        <View style={{ flexDirection: "row", position: "absolute", bottom: 2, left: 2 }}>
          <Button icon={() => (
            <Ionicons
              name="fast-food"
              size={24}
              color={"white"}
            />
          )}
            mode="contained"
            buttonColor="#387F39"
            textColor="white"
          >
            {""}
          </Button>
        </View>
      </View>
      <Text style={s`text-xl font-semibold text-black ml-2`} >Global Impact Made</Text>
      <CardsView/>

      <Posts/>

    </ScrollView>
  );
}

