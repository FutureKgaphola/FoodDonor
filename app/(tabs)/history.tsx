import HistoryTemplate from "@/components/History";
import { StyleSheet, Text, View } from "react-native";
import { s } from "react-native-wind";
import { IHistory } from "../Interfaces/AppInterFaces";
import { SegmentedButtons } from 'react-native-paper';
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const history = () => {
    const [value, setValue] = useState('All');
    const dummyData: IHistory[] = [
        {
            key: 1,
            datetime: '17/07/2024 08:43 am',
            msg: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
            imgUrlpath: '....',
            category: 'basic meal',
            charityOrganization: ''
        },
        {
            key: 2,
            datetime: '12/02/2024 09:41 am',
            msg: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
            imgUrlpath: '....',
            category: 'fast meal',
            charityOrganization: ''
        },
        {
            key: 3,
            datetime: '12/02/2024 09:41 am',
            msg: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.',
            imgUrlpath: '....',
            category: 'donated cash',
            charityOrganization: "Batho Pele"
        }
    ];
    return (
        <SafeAreaView style={styles.container}>
            <Text>{value}</Text>
            <SegmentedButtons theme={{ colors: { secondaryContainer: '#387F39',onSecondaryContainer:"white" } }}
                value={value}
                onValueChange={setValue}
                buttons={[
                    {
                        value: 'All',
                        label: 'All',
                    },
                    {
                        value: 'Gave away',
                        label: 'Gave away',
                    },
                    { value: 'Awarded', label: 'Awarded' },
                ]}
            />
            <View>

                {/* <Text style={s`text-xl text-center`}>No History Yet</Text> */}
                <HistoryTemplate dummyData={dummyData} />
            </View>
        </SafeAreaView>

    );
}

export default history;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap:5,
        padding:5
    },
});