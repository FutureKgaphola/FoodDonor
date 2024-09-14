
import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from "expo-router";
const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  let cameraRef = useRef<any>(undefined);
  interface ImgDataStructure {
    key: string,
    imgPath: string
  }
  const [pictureSnapped, setPicturesArray] = useState<ImgDataStructure[]>([]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const TakePictureAsync = async () => {
    const photo = await cameraRef?.current.takePictureAsync();
    const data = photo.uri;
    setPicturesArray([...pictureSnapped, { key: uuidv4(), imgPath: data }])

  }
  const RemoveImage = (key: string) => {
    // let temp=
    setPicturesArray(pictureSnapped.filter(item => item.key !== key));
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  const CloseCamera=()=>{
    setPicturesArray([]);
    router.navigate('/contribute')
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <TouchableOpacity onPress={()=>CloseCamera()} style={{ backgroundColor: "black", padding: 8, margin: 4, borderRadius: 15, zIndex: 5 }}>
          <Text style={{ color: "white" }}>Close</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            {
              pictureSnapped.length < 4 ?
                <>
                  <TouchableOpacity style={styles.button} onPress={TakePictureAsync}>
                    <Ionicons
                      name="camera"
                      size={26}
                      color={"white"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <MaterialIcons name="flip-camera-ios" size={26} color="white" />
                  </TouchableOpacity>
                </> :
                <Text style={{ color: "white", flex: 1, alignSelf: 'flex-end', alignItems: 'center' }}>LImit Reached. Click Done to upload your pictures</Text>
            }

          </View>
          {
            pictureSnapped.length > 0 ?
              <View style={styles.bottomSheet}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <TouchableOpacity style={styles.doneBtn}>
                    <Text style={{ color: "black" }}>Done</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                  horizontal
                  data={pictureSnapped}
                  renderItem={({ item }: { item: any }) => (
                    <View style={styles.imagewrapper}>
                      <SimpleLineIcons onPress={() => RemoveImage(item.key)}
                        style={{ position: 'absolute', zIndex: 5, backgroundColor: 'white', borderRadius: 30 }} name="minus" size={18} color="black" />
                      <Image
                        style={{ width: 50, height: 50, zIndex: 2 }}
                        source={{ uri: item.imgPath }} />
                    </View>
                  )}

                />
              </View> : null
          }
        </CameraView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomSheet: {
    backgroundColor: 'black',
    padding: 5,
    gap: 2
  },
  doneBtn: {
    backgroundColor: "white",
    padding: 8,
    margin: 4,
    borderRadius: 15,
    zIndex: 5
  },
  imagewrapper: {
    backgroundColor: 'white',
    padding: 2,
    marginLeft: 4,
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CameraScreen;