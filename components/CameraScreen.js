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
import { xmlToBook } from './helpers'

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
        <View style={{flex: 1}}>
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
                !this.state.ifWaitingForResponse
                ? (
                    <View style={styles.previewOverlay}>
                        <View 
                            style={{
                                flex: 1,
                                borderWidth: 2,
                                borderStyle: 'dotted',
                                borderColor: "#FFFFFF",
                                borderRadius: 10,
                                margin: 20,
                                marginRight: 70,
                                marginLeft: 70,
                                opacity: 0.5
                            }}
                        />

                        <View 
                            style={{
                                flex: 1,
                                borderWidth: 2,
                                borderRadius: 10,
                                borderStyle: 'dotted',
                                borderColor: "#FFFFFF",
                                margin: 20,
                                marginRight: 70,
                                marginLeft: 70,
                                opacity: 0.5
                            }}
                        />
        
                        <View 
                            style={{
                                flex: 1,
                                borderWidth: 2,
                                borderStyle: 'dotted',
                                borderColor: "#FFFFFF",
                                borderRadius: 10,
                                margin: 20,
                                marginRight: 70,
                                marginLeft: 70,
                                opacity: 0.5
                            }}
                        />
                    </View>
                ) : (null)
            }
        </View>

        {   
            this.state.ifWaitingForResponse 
            ? (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size={'large'}/>
                </View>
            ) 
            : (
                <View style={{flex: 0, justifyContent: 'center', alignItems: 'center'}}>
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
      "https://2f214e30.ngrok.io/upload_nn",
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

    takePicture = async () => {
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

            // let callback = this.props.navigation.getParam('callback', null)
            // callback(data)
            // this.props.navigation.goBack();
        }
    };

    getBookDataFromIsbn = async (jsonResponse) => {
        let newBookData = []
        console.log("LIKY");
        console.log(jsonResponse.likey)
        for (let i = 0; i < jsonResponse.books.length; i++) {
            if (true) {
                let url = "https://www.goodreads.com/search/index.xml?key=" + GoodReadApiKey + "&q=" + jsonResponse.books[i]
                let response = await fetch(
                    url,
                    {
                        method: "GET"
                    }
                )
                console.log("fetch done")
                let string = await response.text()
                // console.log("parse done" + string)
                newBookData.push(Object.assign({}, xmlToBook(string,jsonResponse.books[i]), {likey: (jsonResponse.likey && jsonResponse.likey[i]) === 1 ? true : false}))
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

    getGridSquareDimension = () => {
        console.log("Dimension of each square " + screenHeight / 3 - 50)
        return screenHeight / 3 - 50
    }

    getGridSquares = () => {
        let array = [1, 2 ,3]

        array.map((value, key) => {
            return (
                <View 
                    style={{
                        position: 'absolute',
                        aspectRatio: 1,
                        borderWidth: 3,
                        borderStyle: 'dashed',
                        borderColor: "#000000",
                        top: screenHeight / 2 - this.getGridSquareDimension() / 2,
                        left: screenWidth / 6 * (value * 2 - 1) - this.getGridSquareDimension() / 2,
                        width: this.getGridSquareDimension()
                    }}
                >

                </View>
            )
        })
    }
}

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    position: 'absolute',
    width: '100%',
    height: '100%', top: 0, left: 0
  },
  previewOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%', top: 0, left: 0
  },
  gridSquare: {
    position: 'absolute',
    aspectRatio: 1,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: "#000000"
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