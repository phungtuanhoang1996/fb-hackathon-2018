

export function xmlToBook(string, isbn) {
    return {
        isbn: isbn,
        rating: parseFloat(string.split('<average_rating>').pop().split('</average_rating>').shift()),
        name: string.split('<title>').pop().split('</title>').shift(),
        reviewCount: string.split('<ratings_count type="integer">').pop().split('</ratings_count>').shift(),
        imageUrl: string.split('<image_url>').pop().split('</image_url>').shift()
    }
}