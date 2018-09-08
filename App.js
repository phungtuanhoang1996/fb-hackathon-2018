import React from 'react'
import {View, Image, ScrollView, Dimensions} from 'react-native'
import BookReviewCard from './components/BookReviewCard'
import BookReviewScreen from './components/BookReviewScreen'
import HomeScreen from './components/HomeScreen'
import {createStackNavigator} from 'react-navigation'

export default class TestView extends React.Component {
  cardViewStyle = {
    flex: 0
  }

  render() {
      // console.warn(Dimensions.get('window').width)
    return (
      <RootStack/>
    )
  }
}

const RootStack = createStackNavigator({
	HomeScreen: {
		screen: HomeScreen
	},
	BookReviewScreen: {
		screen: BookReviewScreen
	}
})
