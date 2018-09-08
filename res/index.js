import Star00 from './star-00.png'
import Star10 from './star-10.png'
import Star20 from './star-20.png'
import Star30 from './star-30.png'
import Star40 from './star-40.png'
import Star50 from './star-50.png'
import Star60 from './star-60.png'
import Star70 from './star-70.png'
import Star80 from './star-80.png'
import Star90 from './star-90.png'
import Star100 from './star-100.png'

export const getUncompletedStar = (fractionalPart) => {
	let starImageArray = [
		Star00, Star10, Star20, Star30, Star40, Star50, Star60, Star70, Star80, Star90, Star100
	]

	return starImageArray[Math.round(fractionalPart * 10)]
}