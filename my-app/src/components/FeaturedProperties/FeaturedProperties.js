import React from 'react'
import useFetch from '../Hooks/useFetch'
import './FeaturedProperties.css'

const FeaturedProperties = () => {

    const { data, loading, error } = useFetch("/hotels?featured=true")

    return (


        <div className='FeaturedProperties'>
            {loading ? ("Loading plaease wait ") : (
                <>
                    {data.map((item) => (
                        <div className='FeaturedPropertiesItems' key={item._id}>
                            <img src={item.photos[0]}
                                alt=''
                                className='Fpimg' />
                            <span className='FpTitle'>
                                {item.name}
                            </span>
                            <span className='FpName'>
                                {item.city}
                            </span>
                            <span className='FpPrice'>
                                starting from ₹{item.cheapestPrice}/night
                            </span>
                            {item.rating &&
                                <div className='FpRating'>
                                    <button className='FpButton'>{item.rating}</button>
                                    <span classNmae='FpReview'>Exceptional</span>
                                </div>
                            }

                        </div>
                    ))
                    }



                </>
            )}
        </div>
    )
}

export default FeaturedProperties
