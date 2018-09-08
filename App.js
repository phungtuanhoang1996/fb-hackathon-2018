import React from 'react'
import {View, Image, ScrollView, Dimensions} from 'react-native'
import BookReviewCard from './components/BookReviewCard'

export default class TestView extends React.Component {
  cardViewStyle = {
    flex: 0
  }

  render() {
      // console.warn(Dimensions.get('window').width)
    return (
      <View style={{backgroundColor: "#F7F9F2", width: "100%", height: "100%"}}>
          <View style={{width: "100%", aspectRatio: 800/150.0, elevation: 15, backgroundColor: "#33ff22"}}>
              <Image style={{width: "100%", height: "100%"}} source={require('./res/title-bar.png')} resizeMode={'cover'}/>
          </View>

          <ScrollView style={{flex: 1}}>
	          <BookReviewCard
		          cardViewStyle={this.cardViewStyle}
		          name={"Random Book"}
		          rating={4.27}
		          reviewCount={"1423"}
	          />
	          <BookReviewCard
		          cardViewStyle={this.cardViewStyle}
		          name={"Random Book"}
		          rating={4.27}
		          reviewCount={"1423"}
	          />
	          <BookReviewCard
		          cardViewStyle={this.cardViewStyle}
		          name={"Random Book"}
		          rating={4.27}
		          reviewCount={"1423"}
	          />
	          <BookReviewCard
		          cardViewStyle={this.cardViewStyle}
		          name={"Random Book"}
		          rating={4.27}
		          reviewCount={"1423"}
	          />
	          <BookReviewCard
		          cardViewStyle={this.cardViewStyle}
		          name={"Random Book"}
		          rating={4.27}
		          reviewCount={"1423"}
	          />
	          <BookReviewCard
		          cardViewStyle={this.cardViewStyle}
		          name={"Random Book"}
		          rating={4.27}
		          reviewCount={"1423"}
	          />
	          <BookReviewCard
		          cardViewStyle={this.cardViewStyle}
		          name={"Random Book"}
		          rating={4.27}
		          reviewCount={"1423"}
	          />
          </ScrollView>

      </View>
    )
  }

  cardViewStyle = {
      margin: 20,
      marginTop: 5,
      marginBottom: 5
  }
}
