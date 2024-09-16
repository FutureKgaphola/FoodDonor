import HistoryTemplate from "@/components/History";
import { Text, View } from "react-native";
import { s } from "react-native-wind";
import { IHistory } from "../Interfaces/AppInterFaces";
const history = () => {
    const dummyData:IHistory[]=[
        {
            key:1,
            datetime:'17/07/2024 08:43 am',
            msg:'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
            imgUrlpath:'....',
            category:'basic meal',
            charityOrganization:''
        },
        {
            key:2,
            datetime:'12/02/2024 09:41 am',
            msg:'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
            imgUrlpath:'....',
            category:'fast meal',
            charityOrganization:''
        },
        {
            key:3,
            datetime:'12/02/2024 09:41 am',
            msg:'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
            imgUrlpath:'....',
            category:'donated cash',
            charityOrganization:"Batho Pele"
        }
    ];
    return ( 
        <View>
        {/* <Text style={s`text-xl text-center`}>No History Yet</Text> */}
        <HistoryTemplate dummyData={dummyData}/>
        </View>
     );
}
 
export default history;