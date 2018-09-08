import React from 'react'
import {View, Text, Image} from 'react-native'
import {getUncompletedStar} from '../res'

/*
    props: width (string), height (string), stars (int), name (string), reviewCount (int), cover (image)
*/

class BookReviewCard extends React.Component {
    constructor(props) {
        super(props)
    }

    getRatingStars = (rating) => {
        let fractionalPart = rating - Math.floor(rating)
        let integerPart = Math.floor(rating)

        var temp = [1, 2, 3, 4, 5]

        return (
            <View style={this.styles.ratingStarsView}>
                {
                    temp.map((number, key) => {
                        if (number <= integerPart) {
                            return <Image key={key} source={require("../res/star-100.png")} style={{width: 20, height: 20, marginRight: 3}}/>
                        } else if (number === integerPart + 1) {
                            return <Image key={key} source={getUncompletedStar(fractionalPart)} style={{width: 20, height: 20}}/>
                        } else {
	                        return <Image key={key} source={require("../res/star-00.png")} style={{width: 20, height: 20}}/>
                        }
                    })
                }
            </View>
        )
    }

    styles = {
        enclosingView: {
            backgroundColor: "#FFFFFF",
            borderRadius: 5,
            padding: 10,
	        elevation: 5,
            flexDirection: 'row',
	        ...this.props.cardViewStyle
        },
	    bookDetailsView: {
            flex: 1,
            marginRight: 5,
            justifyContent: "center"
        },
        bookCoverEnclosingView: {
            height: 100,
            aspectRatio: 1,
            marginLeft: 5,
        },
        bookTitleText: {
            fontWeight: 'bold',
            fontSize: 15,
            marginBottom: 3,
        },
	    ratingStarsView: {
            flexDirection: "row",
            marginBottom: 3
        }
    }

    render() {
        return (
            <View style={this.styles.enclosingView}>
                <View style={this.styles.bookDetailsView}>
                    <Text style={this.styles.bookTitleText}>{this.props.name + " (" + this.props.rating + " / 5)"}</Text>
                    {this.getRatingStars(this.props.rating)}
	                <Text>Review: {this.props.reviewCount}</Text>
                </View>

                <View style={this.styles.bookCoverEnclosingView}>
	                <Image style={{height: 100}} source={{uri: this.props.imageUrl}}/>
                </View>

            </View>
        )
    }
}

export default BookReviewCard