import React from 'react'
import './featured.css'
import useFetch from '../Hooks/useFetch'

const Featured = () => {

const {data, loading , error} = useFetch("/hotels/countbycities?cities=Ahmedabad,Mumbai,Delhi");

  return (
    <div className='featured'>
    {loading ? ("loading please wait") : (
      <>
   
      <div className='featuredItem'>
<img
    src='https://www.ust.com/content/dam/ust/images/pr/press-releases/Thumbnail-USTs-BlueConch-Technologies-Opens-New-Delivery-Center-in-Ahmedabad-Gujarat.jpg'
    alt=""
    className='featuredImg'
    />
    <div className='featuredTitles'>
    <h1>Ahmedabad</h1>
    <h2>{data[0]} properties</h2>
    </div>
      </div>
      <div className='featuredItem'>
<img
    src='https://static.toiimg.com/photo/75012798/mumbai-live.jpg?width=748&resize=4'
    alt=""
    className='featuredImg'
    />
    <div className='featuredTitles'>
    <h1>Mumbai</h1>
    <h2>{data[1]} properties</h2>
    </div>
      </div>
      <div className='featuredItem'>
<img
    src='https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg'
    alt=""
    className='featuredImg'
    />
    <div className='featuredTitles'>
    <h1>Delhi</h1>
    <h2>{data[2]} properties</h2>
    </div>
      </div>
      </>
      )}

    </div>
    )}

    
  


export default Featured
