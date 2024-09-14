import { useContext } from "react";
import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

  export const useStyleSheet=()=>{
    const styles=StyleSheet.create({
        Container:{
          flex:1,
        }
      })

      return {styles}
  }