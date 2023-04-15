import React from 'react'
import { useState, useContext } from 'react'
import { RiHotelBedFill } from "react-icons/ri"
import { IoIosAirplane } from "react-icons/io"
import { IoCarSharp } from "react-icons/io5"
import { BsFillPersonFill } from "react-icons/bs"
import { MdLocalTaxi } from "react-icons/md"
import { FaPlaceOfWorship } from "react-icons/fa"
import { AiFillCalendar } from "react-icons/ai"
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import "./header.css"
import { useNavigate } from "react-router-dom";
import { SearchContext } from '../../SearchContext/searchContext'
import { AuthContext } from '../../SearchContext/authContext'


function Header({ type }) {
    const [Destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [dates, setdate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        },
    ]);

    const [openOptions, setopenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        Children: 0,
        Room: 1,
    });

    const navigate = useNavigate();

    const handleOptions = (name, operations) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operations === "i" ? options[name] + 1 : options[name] - 1,
            }
        });
    }


    const { dispatch } = useContext(SearchContext);
    const handleSearch = () => {
        dispatch({ type: "NEW_SEARCH", payload: { Destination, dates, options } });
        navigate('/hotels', {
            state: {
                Destination,
                dates,
                options
            }
        });
    };

const {user} = useContext(AuthContext);

    return (
        <div className='header'>
            <div className={type === "list" ? "headerContainer ListMode " : "headerContainer"}>
                <div className='headerList'>

                    <div className='headerItems active '>
                        <RiHotelBedFill />
                        <span>Stays</span>
                    </div>
                    <div className='headerItems'>
                        <IoIosAirplane />
                        <span>Flights</span>
                    </div>
                    <div className='headerItems'>
                        <IoCarSharp />
                        <span>Car Rental</span>
                    </div>
                    <div className='headerItems'>
                        <FaPlaceOfWorship />
                        <span>Attractions</span>
                    </div>
                    <div className='headerItems'>
                        <MdLocalTaxi />
                        <span>Airport Taxi</span>
                    </div>
                </div>


                {type !== "list" && (<>
                    <h1 className='headerTile'>
                        A life of discounts? It's Genius.
                    </h1>
                    <p className='headerDesc'>
                        Get rewards for your travels or register with bookig.kp to get instant discounts from your booking.kp account
                    </p>
                    {!user && <button className='headerBtn'>sign in/ register</button>}
                    
                    <div className='headerSearch'>
                        <div className='headerSearchItems'>
                            <RiHotelBedFill className='headerIcon' />
                            <input className="headerInput" type="text" placeholder='Where are you going?'
                                onChange={(e) => setDestination(e.target.value)}
                            />
                        </div>


                        <div className='headerSearchItems'>
                            <AiFillCalendar className='headerIcon' />
                            <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate && (<DateRange
                                editableDateInputs={true}
                                onChange={item => setdate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={dates}
                                className='date'
                                minDate={new Date()}
                            />)}
                        </div>


                        <div className='headerSearchItems'>
                            <BsFillPersonFill className='headerIcon' />
                            <span onClick={() => setopenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult · ${options.Children} children · ${options.Room} room`} </span>
                            {openOptions && (<div className='options'>

                                <div className='optionsItems'>

                                    <span className='optionText'>Adult</span>
                                    <div className='optionCounter'>
                                        <button className='optionCounterButton'
                                            disabled={options.adult <= 1}
                                            onClick={() => handleOptions("adult", "d")}>-</button>
                                        <span className='optionCounterNumber'>{options.adult}</span>
                                        <button className='optionCounterButton' onClick={() => handleOptions("adult", "i")}>+</button>
                                    </div>
                                </div>
                                <div className='optionsItems'>

                                    <span className='optionText'>Children</span>
                                    <div className='optionCounter'>
                                        <button className='optionCounterButton'
                                            disabled={options.Children <= 0}
                                            onClick={() => handleOptions("Children", "d")}>-</button>
                                        <span className='optionCounterNumber'>{options.Children}</span>
                                        <button className='optionCounterButton' onClick={() => handleOptions("Children", "i")}>+</button>
                                    </div>
                                </div>
                                <div className='optionsItems'>

                                    <span className='optionText'>Room</span>
                                    <div className='optionCounter'>
                                        <button className='optionCounterButton'
                                            disabled={options.Room <= 1}
                                            onClick={() => handleOptions("Room", "d")}>-</button>
                                        <span className='optionCounterNumber'>{options.Room}</span>
                                        <button className='optionCounterButton' onClick={() => handleOptions("Room", "i")}>+</button>
                                    </div>
                                </div>
                            </div>)}
                        </div>


                        <div className='headerSearchItems'><button className='headerBtn' onClick={handleSearch}>Search</button>
                        </div>


                    </div>
                </>
                )}

            </div>
        </div>
    )
}

export default Header;
