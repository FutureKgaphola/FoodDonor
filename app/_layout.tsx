import '../wind.config';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useSegments, useRouter, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import AppLogo from '@/components/AppLogo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Alert, Platform, TouchableOpacity } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
  default: "native",
});
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  let isDarkMode = useColorScheme() === 'dark';
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PoppinsBlackItalic: require('../assets/fonts/Poppins-BlackItalic.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsItalic: require('../assets/fonts/Poppins-Italic.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const PromptExit=()=>{
    Alert.alert("Leave app","Are you sure you want to exit the app",[
      {text: 'Leave', onPress: () => router.replace('/')},
      {text: 'stay', onPress: () =>{}}])
  }
  const options = () => ({
    Title: "",
    headerTitle: () => (<AppLogo title='FoodDonor' width={32} height={32} />),
    headerLeft:()=>Platform.OS=="ios" ? (<TouchableOpacity onPress={()=>router.replace('/')}><Ionicons name="arrow-back-outline" size={24} color={!isDarkMode ? "#3D3B40" : "white"} /></TouchableOpacity>) : null,
    headerRight: () => (<TouchableOpacity onPress={()=>PromptExit()}><Ionicons name="power-outline" size={24} color={!isDarkMode ? "#3D3B40" : "white"} /></TouchableOpacity>),
  })
  const StackLayout = () => {
    const segments = useSegments();
    useEffect(() => {
      const inAuthGroup = segments[0] === "(tabs)";
      const auth = false;
      if (auth) {
        router.replace('/(tabs)');
      } else if (!auth && inAuthGroup) {
        router.replace('/');
      }
    }, []);

    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={options} />
          <Stack.Screen name="forgotpassword" options={{ headerShown: false }}  />
          <Stack.Screen name="Camera" options={{ headerShown: false }}  />
        </Stack>
      </ThemeProvider>
    );
  }
  return (
    <StackLayout />
  );
}
