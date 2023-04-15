import React from 'react'
import "./home.css"
import Navbar from '../Navbar/Navbar'
import Header from '../header /header'
import Featured from '../Featured/featured'
import FeaturedProperties from '../FeaturedProperties/FeaturedProperties'
import PropertyType from '../PropertyType/PropertyType'
import Mail from "../mailList/Mail"
import Footer from "../footer/Footer"
const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className='homeContainer '>
        <Featured />
        <h1 className='homeTitle'>
          Browse by property type
        </h1>
        <PropertyType/>
        <h1 className='homeTitle'>
         Featured properties
        </h1>
        <FeaturedProperties/>
        <Mail/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
