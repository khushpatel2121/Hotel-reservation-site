import React, { useContext ,useState} from 'react';
import "./Reserve.css"
import useFetch from '../Hooks/useFetch';
import {MdCancel} from "react-icons/md"
import { SearchContext } from '../../SearchContext/searchContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Reserve = ({setOpen,HotelId}) => {
    const [selectedRooms, setSelectedRooms] = useState([]); 
    const {data,loaging,error} = useFetch(`/hotels/rooms/${HotelId}`);
    const {dates} = useContext(SearchContext);
    const navigate = useNavigate();

    const getDateRange = (startDate,endDate)=>{
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        const date = new Date(start.getTime());

        const dates =[];

        while(date<=end){
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }

        return dates;
    }

    const allDates = getDateRange(dates[0].startDate,dates[0].endDate);

    const isAvailable = (roomNumber)=>{
        const isFound = roomNumber.unavailableDates.some((date)=>
        allDates.includes(new Date(date).getTime()));

        return !isFound;
    }

const handleSelect  =(e)=>{
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
        checked?[...selectedRooms,value]:selectedRooms.filter((item)=>item !== value)
    );
};

const handleClick =async()=>{
    try {
        await Promise.all(
            selectedRooms.map((roomId)=>{
                const res = axios.put(`/rooms/availability/${roomId}`,{
                    dates:allDates,
                });
                return res.data;
            })
        );
        setOpen(false);
        navigate("/")
        
    } catch (error) {
        
    }
}
    
  return (
    <div className='reserve'>
      <div className='rContainer'>
      <MdCancel
        onClick={()=>setOpen(false)}
        className="rClose"
      />
        <span>Select Our Room</span>
        {
            data.map((item)=>(
                <div className='rItem'>
         <div className='rInfo'>
           <div className='rTitle'>{item.title}</div>
           <div className="rDesc">{item.desc}</div>
           <div className='rMax'>Max People :<b>{item.maxPeople}</b></div>
           <div className='rPrice'>
            {item.price}
           </div>
         </div>
         <div className='rSelectRooms'>
          {
            item.roomNumbers.map((roomNumber)=>(
                <div className='room'>
                 <label>
                    {roomNumber.number}
                 </label>
                <input
                    type='checkbox'
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                />
                </div>

            ))
          }
         </div>
         </div>
            ))
        }
       {

       }
       <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  )
}

export default Reserve
