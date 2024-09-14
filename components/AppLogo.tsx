import { Image, Text, useColorScheme, View } from "react-native";
const AppLogo = ({title,width,height}:{title:string,width:number,height:number}) => {
    let isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
                style={{ width: width, height: height }}
                source={require( "../assets/images/plate.png")}
            />
            <Text style={{color: !isDarkMode ? "#3D3B40" : "white",marginLeft:3}}>
                {title}
            </Text>
        </View>
    );
}
export default AppLogo;