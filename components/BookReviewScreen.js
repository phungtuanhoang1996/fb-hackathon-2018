import React from 'react'
import {ScrollView} from 'react-native'
import BookReviewCard from './BookReviewCard'

export default class BookReviewScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookData: [

            ]
        }
    }

    componentDidMount() {
        // this.props.bookISBNs.map((isbn, key) => {
        //     //do something to get
        // })

        this.setState({
            bookData: [
                {
                    isbn: '0439136369',
                    name: 'Kamasutra Book',
                    rating: 4.75,
                    reviewCount: 123
                }, 
                {
                    isbn: '0439785960',
                    name: 'Sex Book',
                    rating: 3.2,
                    reviewCount: 1223
                },
                {
                    isbn: '0439064872',
                    name: 'Random Book',
                    rating: 4.0,
                    reviewCount: 1233
                }
            ]
        })
    }

    render() {
        return(
            <ScrollView>
                {
                    this.state.bookData.map((book, key) => {
                        if (key === 0) {
                            return (
                                <BookReviewCard
                                    cardViewStyle={Object.assign({}, this.cardViewStyle, {marginTop: 30})}
                                    key={key}
                                    isbn={book.isbn}
                                    name={book.name}
                                    rating={book.rating}
                                    reviewCount={book.reviewCount}
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
                                />
                            )
                        }
                    })
                }
            </ScrollView>
        ) 
    }

    cardViewStyle = {
        margin: 20,
        marginTop: 5,
        marginBottom: 5
    }
}