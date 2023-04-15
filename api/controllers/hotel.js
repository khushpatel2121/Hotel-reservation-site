import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";


export const createHotel = async(req,res,next) =>{
    const newHotel = new Hotel(req.body)

    try{
      const savedHotel =  await  newHotel.save()
        return res.status(200).json(savedHotel);
    }catch(err){
      next(err);
    }
}

export const updateHotel = async(req,res,next) =>{
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,
            {$set: req.body},
            {new:true}
        )
        res.status(200).json(updateHotel)
    }catch{
       next(err)
    }
}

export const deleteHotel = async(req,res,next) =>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
         res.status(200).json("Hotel Deleted")
     }catch{
       next(err)
     }
}

export const getHotel = async(req,res,next) =>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    }catch(err){
        next(err)
    }
}

export const getAllHotel = async(req,res,next) =>{

    const {min , max , ...others} = req.query;

    try{
        const hotels = await Hotel.find({...others, cheapestPrice: { $gt:min|1 , $lt:max||999},
        }).limit(4);
        res.status(200).json(hotels);
    }catch(err){
       next(err)
    }
}

export const countByCity = async(req,res,next) =>{
    const cities = req.query.cities.split(",");
    try{
      const list = await Promise.all(
        cities.map((city)=>{
            return Hotel.countDocuments({city:city});
        })
      )
        res.status(200).json(list);
    }catch(err){
       next(err)
    }
}

export const countByType = async(req,res,next) =>{


  try{
    const countHotel = await Hotel.countDocuments({type:"Hotel"});
    const countApartment = await Hotel.countDocuments({type:"apartment"});
    const countResort = await Hotel.countDocuments({type:"resort"});
    const countVilla = await Hotel.countDocuments({type:"villa"});
    const countCabin = await Hotel.countDocuments({type:"cabin"});

    res.status(200).json([
        {type: "hotel" , count:countHotel},
        {type: "apartment" , count:countApartment},
        {type: "resort" , count:countResort},
        {type: "villa" , count:countVilla},
        {type: "cabin" , count:countCabin},
        
    ])
  }catch(err){
    next(err)
  }

}

export const getRooms = async(req,res,next)=>{
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room)=>{
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err)
  }
}