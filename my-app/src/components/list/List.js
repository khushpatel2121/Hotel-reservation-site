import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Header from '../header /header'
import { DateRange } from 'react-date-range'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import './list.css'
import SearchItem from './SearchItems/SearchItem'
import useFetch from '../Hooks/useFetch';
import { SearchContext } from '../../SearchContext/searchContext'
import { useContext } from 'react'


const List = () => {

  const location = useLocation();
  const [Destination, setDestination] = useState(location.state.Destination);
  const [dates, setDate] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);


  const { data, loading, error, reFetch } = useFetch(`/hotels?city=${Destination}&min=${min || 0}&max=${max || 999} `);


  const { dispatch } = useContext(SearchContext);
  const handleClick = () => {
    reFetch();
    dispatch({ type: "NEW_SEARCH", payload: { Destination, dates, options } });
 
  }



  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className='listContainer'>

        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='lsTitle'>Search</h1>
            <div className='lsItem'>
              <label>Destination</label>
              <input placeholder={Destination} type='text'></input>
            </div>
            <div className='lsItem'>
              <label>Check-in-Date</label>
              <span onClick={() => setOpenDate(!openDate)} onChange={(e)=>setDate(e.target.value)} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (<DateRange

                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={ dates}
                minDate={new Date()} 
             
              />)}
            </div>
            <div className='lsItem'>
              <label>Options</label>
              <div className='lsOptions'>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Min Price  <small>per night</small>
                  </span>
                  <input onChange={(e) => setMin(e.target.value)} type='number' className='lsOptionInput' />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Max Price <small>per night</small>
                  </span>
                  <input onChange={(e) => setMax(e.target.value)} type='number' className='lsOptionInput' />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Adult
                  </span>
                  <input type='number' className='lsOptionInput' placeholder={options.adult} min={1} />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Children
                  </span>
                  <input type='number' className='lsOptionInput' placeholder={options.Children} min={0} />
                </div>
                <div className='lsOptionItem'>
                  <span className='lsOptionText'>
                    Rooms
                  </span>
                  <input type='number' className='lsOptionInput' placeholder={options.Room} min={1} />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {
              loading ? ("Loading please wait") : (
                <>
                  {data.map((item) => (

                    <SearchItem key={item._id} item={item} />


                  ))}
                </>
              )
            }


          </div>
        </div>

      </div>

    </div>
  )
}

export default List
