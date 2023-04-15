import './Mail.css'

const Mail = () => {
  return (
    <div className='mail'>
    <h1 className='mailTitle'>Save Time,Save Money!</h1>
    <span className='mailDesc'>Sign up and we'll send the best deals to you</span>
    <div className='mailInput'>
     <input type='text' placeholder='Your Email Address' className='mailInfo'></input>
     <button className='mailButton'>Subscribe</button>
     </div>
    </div>
  )
}

export default Mail
