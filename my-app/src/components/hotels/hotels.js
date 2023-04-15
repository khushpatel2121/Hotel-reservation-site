import React, { useContext } from 'react'
import Header from '../header /header'
import Navbar from '../Navbar/Navbar'
import './hotels.css'
import { IoLocationSharp } from 'react-icons/io5'
import { useState } from 'react'
import Mail from '../mailList/Mail'
import Footer from '../footer/Footer'
import {AiFillCloseCircle} from 'react-icons/ai'
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from 'react-icons/bs'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../Hooks/useFetch'
import { SearchContext } from '../../SearchContext/searchContext';
import Reserve from '../Reserve/Reserve'
import { AuthContext } from '../../SearchContext/authContext'


const Hotels = () => {
const location = useLocation();
const id = location.pathname.split("/")[2];
const [slideNumber, setSlideNumber] = useState(0);
const [open, setOpen] = useState(false);
const [openModel,setOpenModel] = useState(false);

const navigate  = useNavigate();
const { data, loading, error } = useFetch(`/hotels/find/${id}`);


const {dates, options } = useContext(SearchContext);
const {user} = useContext(AuthContext);

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
function dayDifference(date1, date2) {
  const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  return diffDays;
}

const days = dayDifference(dates[0].endDate, dates[0].startDate);

console.log(days)

const handleOpen = (i) => {
  setSlideNumber(i);
  setOpen(true);
};

const handleMove = (direction) => {
  let newSlideNumber;

  if (direction === "l") {
    newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
  } else {
    newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
  }

  setSlideNumber(newSlideNumber);
};

const handleClick =()=>{
  if(user){
     setOpenModel(true)
  }else{
    navigate("/login")
  }
}
  return(
    <div>
      <Navbar />
      <Header type='list' />
     
      { loading ? ("please wait loading ") : (
       <div className='hotelContainer'>
      {open && (
        <div className='Slider'>
        <AiFillCloseCircle
          className='close'
          onClick={()=>setOpen(false)}
        /> 
        <BsFillArrowLeftCircleFill
          className='arrow'
          onClick={()=>handleMove('l')}
        />
        <div className='sliderWrapper'>
          <img src={data.photos[slideNumber]} alt='' className='sliderImg'/>
        </div>

        <BsFillArrowRightCircleFill
          className='arrow'
          onClick={()=>handleMove('r')}
        />
        </div>
       )}

    
        <div className='hotelWrapper'>
          <button className='bookNow'>Reserve or Book Now</button>
          <h1 className='hotelTitle'>{data.name}</h1>
          <div className='hotelAddress'>
            <IoLocationSharp />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className='hotelImages'>
            {data.photos?.map((photo,i) => (
              <div className='hotelImageWrapper'>
                <img
                  onClick={()=> handleOpen(i)}
                  src={photo}
                  alt=''
                  className='hotelImg'
                />
              </div>
            )) }
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
              {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>₹{days* data.cheapestPrice}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
            </div>
        </div>
        </div>)}
        <Mail/>
        <Footer />
      {openModel && <Reserve setOpen={setOpenModel} HotelId={id}/>}
    </div>
  )
}

export default Hotels
