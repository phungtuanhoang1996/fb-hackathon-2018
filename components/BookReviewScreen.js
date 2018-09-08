import React from 'react'
import {ScrollView, View, Image, Dimensions, Text, BackHandler} from 'react-native'
import BookReviewCard from './BookReviewCard'

export default class BookReviewScreen extends React.Component {
    static navigationOptions = {
        header: null
    } 

    constructor(props) {
        super(props)
        this.state = {
            bookData: this.props.navigation.getParam("bookData", [])
        }
        console.log(this.state.bookData)
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    }

    render() {
        return(
            <View style={{backgroundColor: "#F7F9F2", width: "100%", height: "100%", flexDirection: 'column'}}>
                <View style={{width: "100%", aspectRatio: 800/150.0, elevation: 15, backgroundColor: "#33ff22", justifyContent: 'center', alignItems: 'center'}}>
                    <Image style={{width: "100%", height: "100%", zIndex: 1, position: 'absolute'}} source={require('../res/title-bar.png')} resizeMode={'cover'}/>
                    <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', zIndex: 2}}>Result</Text>
                </View>

                <ScrollView style={{flex: 1}}>
                    {
                        this.state.bookData.map((book, key) => {
                            console.log(this.state.bookData[key])
                            if (key === 0) {
                                return (
                                    <BookReviewCard
                                        cardViewStyle={Object.assign({}, this.cardViewStyle, {marginTop: 30})}
                                        key={key}
                                        isbn={book.isbn}
                                        name={book.name}
                                        rating={book.rating}
                                        reviewCount={book.reviewCount}
                                        imageUrl={book.imageUrl}
                                    />
                                )
                            } else {
                                return (
                                    <BookReviewCard
                                        key={key}
                                        cardViewStyle={this.cardViewStyle}
                                        isbn={book.isbn}
                                        name={book.name}
                                        rating={book.rating}
                                        reviewCount={book.reviewCount}
                                        imageUrl={book.imageUrl}
                                    />
                                )
                            }
                        })
                    }
                </ScrollView>
            </View>
        ) 
    }

    onBackButtonPressAndroid = () => {
        this.props.navigation.popToTop()
        return true;
    };

    cardViewStyle = {
        margin: 20,
        marginTop: 5,
        marginBottom: 5
    }
}