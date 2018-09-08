import React from 'react'
import {View, Text, Image, Dimensions, Button} from 'react-native'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={{width: "100%", height: "100%", flexDirection: 'column'}}>
                <View style={{width: "100%", aspectRatio: 800/150.0, elevation: 15, backgroundColor: "#33ff22", justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: "100%", height: "100%", zIndex: 1, position: 'absolute'}} source={require('../res/title-bar.png')} resizeMode={'cover'}/>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', zIndex: 2}}>FB Hack 2018</Text>
                </View>

                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../res/bookshelf.png')} style={{width: Dimensions.get('window').width / 4, height: Dimensions.get('window').width / 4, opacity: 0.5}}></Image>
                    <Text style={{textAlign: 'center', margin: 50, marginTop: 10, marginBottom: 10}}>No bookshelf images yet. Take a picture to get reviews of books</Text>
                    <Button
                        title={"Take picture"}
                        color={'#6200EE'}
                        onPress={this.onTakePictureButtonPress}
                    />
                </View>
            </View>
        )
    }

    onTakePictureButtonPress = () => {
        this.props.navigation.navigate('CameraScreen')
    }
}