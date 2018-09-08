import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image
} from 'react-native';
import GoodReadApiKey from '../GoodReadApiKey'
import { RNCamera } from 'react-native-camera';

export default class CameraScreen extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            bookData: []
        }
    }
  render() {
    return (
      <View style={styles.container}>
        {
            !this.state.ifWaitingForResponse
            ? (
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style = {styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />
            )
            : (
                <Image style={styles.takenPicture} source={this.state.takenPicture}/>
            )
        }
        {   
            this.state.ifWaitingForResponse 
            ? (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size={'large'}/>
                </View>
            ) 
            : (
                <View style={{position: 'absolute', bottom: 0, left: 0, width: "100%", justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style = {styles.capture}
                    >
                        <Text style={{fontSize: 14, color: '#FFFFFF'}}> SNAP </Text>
                    </TouchableOpacity>
                </View>
            )
        }
      </View>
    );
  }

    sendPicture = async (uri) => {
    let formData = new FormData();
        formData.append("file", {
            uri: uri,
            type: 'image/jpeg',
            name: 'test'
        })
    let response = await fetch(
      "https://d75d2982.ngrok.io/upload_nn",
      {
        method: "POST",
        body: formData
      }
    )
    if (response.status == 200) {
        jsonResponse = await response.json()
        await this.getBookDataFromIsbn(jsonResponse)
        console.log(this.state.bookData)
        
        this.props.navigation.navigate("BookReviewScreen", {
            bookData: this.state.bookData
        })
    }
  }

    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, fixOrientation: true};
            const data = await this.camera.takePictureAsync(options)
            this.setState({
                takenPicture: data
            })
            // this.camera.pausePreview()
            this.setState({
                ifWaitingForResponse: true
            })
            const res = await this.sendPicture(data.uri)
        }
    };

    getBookDataFromIsbn = async (jsonResponse) => {
        let newBookData = []

        for (let i = 0; i < jsonResponse.books.length; i++) {
            if (parseInt(jsonResponse.books[i]) > 0) {
                let url = "https://www.goodreads.com/search/index.xml?key=" + GoodReadApiKey + "&q=" + jsonResponse.books[i]
                console.log(url)
                let response = await fetch(
                    url,
                    {
                        method: "GET"
                    }
                )
                console.log("fetch done")
                let string = await response.text()
                console.log("parse done" + string)
                newBookData.push({
                    isbn: jsonResponse.books[i],
                    rating: parseFloat(string.split('<average_rating>').pop().split('</average_rating>').shift()),
                    name: string.split('<title>').pop().split('</title>').shift(),
                    reviewCount: string.split('<ratings_count type="integer">').pop().split('</ratings_count>').shift(),
                    imageUrl: string.split('<image_url>').pop().split('</image_url>').shift()
                })
                console.log(newBookData)
                // this.setState({
                //     bookData: newBookData
                // })
            }
        }

        this.props.navigation.navigate("BookReviewScreen", {
            bookData: newBookData
        })

        this.setState({
            ifWaitingForResponse: false,
            takenPicture: null,
            bookData: []
        })
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    position: "absolute",
    top: 0, left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  capture: {
    flex: 0,
    backgroundColor: '#6200EE',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  loadingOverlay: {
      position: "absolute",
      top: 0, left: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      opacity: 0.5
  },
  takenPicture: {
      position: 'absolute',
      top: 0, left: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
  }
});