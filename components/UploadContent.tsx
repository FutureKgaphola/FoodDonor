import { Dispatch, SetStateAction, useState } from 'react';
import { Alert, FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Divider, Snackbar, TextInput } from 'react-native-paper';
import AppLogo from './AppLogo';
import { ImgDataStructure } from '@/app/Interfaces/AppInterFaces';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import { router } from "expo-router";

const UploadContent = ({ pictureSnapped, setPicturesArray }: { pictureSnapped: ImgDataStructure[], setPicturesArray: Dispatch<SetStateAction<ImgDataStructure[]>> }) => {
    const [text, setText] = useState("");
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);
    const ContentSchema = yup.object({
        message: yup.string().required().min(2)
    })

    const RemoveImage = (key: string) => {
        if (pictureSnapped.length !== 1) {
            setPicturesArray(pictureSnapped.filter(item => item.key !== key));
        } else {
            onToggleSnackBar();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <AppLogo title='Share with the community' height={50} width={50} />
                <Text>{text}</Text>
                <Divider />
                <Text style={{color:'#697565'}}>{`Meals are expected to be packaged well and with concern to heal stantards and safety. \n For instance if you are donating 2 plates of meal or rice, they are required to be packgaged individually so they are seen and recorded as 2 meals in this case.`}</Text>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS == "ios" ? 'padding' : undefined}
                    keyboardVerticalOffset={60}
                >
                    <FlatList
                        horizontal
                        data={pictureSnapped}
                        renderItem={({ item }) => (
                            <View style={styles.imageWrapper}>
                                <SimpleLineIcons
                                    onPress={() => RemoveImage(item.key)}
                                    style={styles.removeIcon}
                                    name="minus"
                                    size={18}
                                    color="black"
                                />
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.imgPath }}
                                />
                            </View>
                        )}
                    />
                    <Divider />
                    <View>
                        <Formik
                            initialValues={{ message: "" }}
                            validationSchema={ContentSchema}
                            onSubmit={(values, actions) => {
                                if (values.message.trim() === "") {
                                    actions.resetForm();
                                    Alert.alert("Empty Input", "Empty input is not alllowed");
                                } else {
                                    console.log(values);
                                }

                            }}
                        >
                            {({ handleChange, handleSubmit, values, errors, touched }) => (
                                <View style={{ gap: 5 }}>
                                    <TextInput
                                        label={"Share your meal with some hopeful message."}
                                        textColor='black'
                                        outlineColor='black'
                                        activeOutlineColor='black'
                                        value={values.message}
                                        mode="outlined"

                                        onChangeText={(text) => {
                                            setText(text.trim());
                                            handleChange('message')(text);
                                        }}
                                    />
                                    <Text>{touched.message && errors.message}</Text>
                                    <Button
                                        onPress={() => handleSubmit()}
                                        buttonColor="#387F39"
                                        icon="send"
                                        mode="contained"
                                    >
                                        Share Content
                                    </Button>
                                    <Snackbar
                                        visible={visible}
                                        onDismiss={onDismissSnackBar}
                                        action={{
                                            label: 'leave',
                                            onPress: () => {
                                                router.replace('/contribute');
                                            },
                                        }}>
                                        Atlest 1 image is required.
                                    </Snackbar>
                                </View>
                            )}
                        </Formik>
                    </View>
                </KeyboardAvoidingView>

            </View>
        </TouchableWithoutFeedback>
    );
};

export default UploadContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 5,
        padding: 5,
        position: 'relative'
    },
    imageWrapper: {
        backgroundColor: 'white',
        padding: 2,
        marginLeft: 4,
        width: 52,
        height: 52,
    },
    removeIcon: {
        position: 'absolute',
        zIndex: 5,
        backgroundColor: 'white',
        borderRadius: 30,
    },
    image: {
        width: 50,
        height: 50,
        zIndex: 2,
    },
});
