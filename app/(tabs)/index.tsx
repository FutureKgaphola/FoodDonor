import { useStyleSheet } from '@/Styles/useStyleSheet';
import { Ionicons } from '@expo/vector-icons';
import { Button } from "react-native-paper";
import { s } from "react-native-wind";
import { Image, View, Text, ScrollView, StyleSheet } from 'react-native';
import CardsView from '@/components/Cards';
import Posts from '@/components/Posts';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCallback, useEffect, useMemo, useRef } from 'react';
export default function HomeScreen() {
  const { styles } = useStyleSheet();
  const snapPonits = useMemo(() => ["22%", "32%", "45%"], []);
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  useEffect(() => {
    bottomSheetRef.current?.close();
    bottomSheetRef.current?.forceClose();
  }, [])
  const renderbacdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} {...props} />, []);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        <Text style={s`text-xl font-semibold text-black ml-2`}>Global Impact Made</Text>
        <CardsView />

        <Posts bottomSheetRef={bottomSheetRef} />

      </ScrollView>
      <BottomSheet index={-1}
        enablePanDownToClose
        backdropComponent={renderbacdrop}
        snapPoints={snapPonits}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={sty_les.contentContainer}>
          <Text style={s`text-lg font-bold text-center`}>Meal Request</Text>
          <View style={s`m-1`}>
            <View style={s`flex flex-row rounded-md border-gray-50 border-2 p-2 items-center`}>
              <Ionicons name="fast-food-outline" size={28} color="black" />
              <View>
                <Text>Proper meal</Text>
                <Text style={s`text-xs font-thin`}>meal category</Text>
              </View>
            </View>
            <View style={s`flex flex-row rounded-md border-gray-50 border-2 p-2 items-center`}>
              <Ionicons name="home-outline" size={28} color="black" />
              <View>
                <Text>Lebowakgomo, malaneng zone-F</Text>
                <Text style={s`text-xs font-thin`}>collection Address</Text>
              </View>
            </View>
            <View style={s`flex flex-row p-2 items-center`}>
              <Ionicons name="alert-circle-outline" size={15} color="#F6E96B" />
              <Text style={s`text-sm font-thin`}>Please note your profile data will be shared with the owner of this meal. This will help facilitate the process of awarding the meal(s)</Text>
            </View>
            <Button
              buttonColor="#387F39"
              icon="send" mode="contained">
              Complete Request
            </Button>
          </View>

        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const sty_les = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 5
  },
});

