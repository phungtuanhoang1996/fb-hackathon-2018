import React from 'react'
import {ScrollView, View, Image, Dimensions, Text, BackHandler, TouchableOpacity, Button} from 'react-native'
import BookReviewCard from './BookReviewCard'
import GoodReadApiKey from '../GoodReadApiKey'
import { xmlToBook } from './helpers'


export default class BookReviewScreen extends React.Component {
    static navigationOptions = {
        header: null
    } 

    constructor(props) {
        super(props)
        this.state = {
            bookData: this.props.navigation.getParam("bookData", []),
            isShowingRecommended: false,
            isLoading: false
        }
        // console.log(this.state.bookData)
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    }

    getRecommendedBooks = async () => {
        this.setState({
            isLoading: true
        })
        const rawResponse = await fetch('http://efb38acb.ngrok.io/recommend', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({book_list:this.state.bookData.map((data) => data.name)})
          });
        const content = await rawResponse.json();

        let recommendedBooks = content['isbns']
        let newBookData = []

        for (let i = 0; i < recommendedBooks.length; i++) {
            if (true) {
                let url = "https://www.goodreads.com/search/index.xml?key=" + GoodReadApiKey + "&q=" + recommendedBooks[i]
                let response = await fetch(
                    url,
                    {
                        method: "GET"
                    }
                )
                console.log("fetch done")
                let string = await response.text()
                console.log("parse done" + string)
                newBookData.push(xmlToBook(string,recommendedBooks[i]))
                // console.log(newBookData)
                // this.setState({
                //     bookData: newBookData
                // })
            }
        }

        this.setState({
            bookData: newBookData,
            isShowingRecommended: true
        })
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
                            // console.log(this.state.bookData[key])
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
                                        likey={book.likey}
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
                                        likey={book.likey}
                                    />
                                )
                            }
                        })
                    }
                </ScrollView>
                {this.state.isShowingRecommended ? null :
                    <Button
                        title={this.state.isLoading ? "Loading...":"View Recommended Books"}
                        color={'#6200EE'}
                        onPress={this.getRecommendedBooks}
                    />
                }
                
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