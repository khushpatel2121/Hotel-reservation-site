import React from 'react'
import './PropertyType.css'
import useFetch from '../Hooks/useFetch';

const PropertyType = () => {

   const { data , loading, error} = useFetch("/hotels/countbyType");

   const images = [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    'https://media.cntraveler.com/photos/53da60a46dec627b149e66f4/master/pass/hilton-moorea-lagoon-resort-spa-moorea-french-poly--110160-1.jpg',
    'https://img.vistarooms.com/gallery/vista-sadh-villa-c227d4.jpg',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D&w=1000&q=80',
    'https://www.familyhandyman.com/wp-content/uploads/2018/02/handcrafted-log-home.jpg',
];

    return (

        <div className='Prop'>

        {loading?("loading please wait "): (<>

        {data && images.map((img, i )=>(
            <div className='PropItems' key={i}>
                <img src={img}
                 alt=''
                    className='PropImg'
                />
                <div className='PropTitle'>
                <span className='PropType'>
                  {data[i]?.type}
                </span>
                <span className='PropNumber'>
                  {data[i]?.count}
                </span>
                </div>
           
            </div>
        ))}
            
           
            
    
        </>)}
        </div>)
}

export default PropertyType;