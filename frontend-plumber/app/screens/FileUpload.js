import {
  CameraRoll,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Text } from "react-native";

const ImagePickerComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [photos, setPhotos] = useState([]);

  const selectImage = (uri) => {
    setSelectedImage(uri);
    // Convert the selected image to base64 or perform any other operations as needed
  };

  const fetchPhotosFromCameraRoll = () => {
    CameraRoll.getPhotos({ first: 20 })
      .then((res) => {
        setPhotos(res.edges);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View>
      <FlatList
        data={photos}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectImage(item.node.image.uri)}>
            <Image
              source={{ uri: item.node.image.uri }}
              style={{ width: 100, height: 100, margin: 5 }}
            />
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <TouchableOpacity onPress={fetchPhotosFromCameraRoll}>
            <Text>Load Images</Text>
          </TouchableOpacity>
        }
      />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
};

export default ImagePickerComponent;
