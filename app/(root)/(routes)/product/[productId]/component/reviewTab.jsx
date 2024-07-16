'use client'

import StarRatings from "react-star-ratings";
import ProgressBar from "./progressBar";


const CustomerReviews = () => {
    return ( 
        <div className="flex flex-row justify-evenly place-items-end py-4">
            <div>
                <h1 className="font-bold text-xl text-gray-900 py-10">Customer Reviews (500)</h1>
                <h1 className="font-bold text-6xl text-gray-900">4.5</h1>
                <StarRatings
                    rating={4.5}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name='rating'
                    starDimension="15px"
                    starSpacing="0.5px"
                />
                <p className="text-sm">All from verified purchases</p>
            </div>
            <div>
                <ProgressBar value ={80}  stars={5} reviews={100}/>
                <ProgressBar value ={60}  stars={4} reviews={100}/>
                <ProgressBar value ={40}  stars={3} reviews={100}/>
                <ProgressBar value ={20}  stars={2} reviews={100}/>
                <ProgressBar value ={10}  stars={1} reviews={100}/>
            </div>
        </div>
     );
}
 
export default CustomerReviews;