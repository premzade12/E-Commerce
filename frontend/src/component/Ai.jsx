import React, { useContext, useState } from 'react'
import ai from '../assets/ai.mp4'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import sound from '../assets/sound.mp3'

function Ai() {
    let {showSearch , setShowSearch} = useContext(shopDataContext)
    let navigate = useNavigate()
    let [activeAi,setActiveAi] = useState(false)
    let openingSound = new Audio(sound)

    function speak(message){
        let utterence = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterence)
    }
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
   
    if(!speechRecognition){
        console.log("not supported")
    }
    const recognition = new speechRecognition()

    recognition.onresult = (e)=> {
        const transcript = e.results[0][0].transcript.trim()

        if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch){
            speak("opening search")
            setShowSearch(true)
            navigate("/collections")
        }
        else if(transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("close") && showSearch){
            speak("closing search")
            setShowSearch(false)
            
        }
        else if(transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("products")){
            speak("opening collection page")
            navigate("/collections")
             setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes("aboutpage")){
            speak("opening about page")
            navigate("/about")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("homepage")){
            speak("opening home page")
            navigate("/")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("cart") || transcript.toLowerCase().includes("kaat") || transcript.toLowerCase().includes("caat")){
            speak("opening your cart")
            navigate("/cart")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("contact")){
            speak("opening contact page")
            navigate("/contact")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("myorders") || transcript.toLowerCase().includes("orders") || transcript.toLowerCase().includes("my order")){
            speak("opening your orders page")
            navigate("/order")
            setShowSearch(false)
        }
        else {
            toast.error("Try again")
        }
    }
    recognition.onend = ()=> {
        setActiveAi(false)
    }

  return (
    <div className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] rounded-full' onClick={()=> {openingSound.play().catch(() => {});recognition.start() ,setActiveAi(true)}}>
      <video src={ai} autoPlay loop muted aria-label="AI animation" disablePictureInPicture
  controlsList="nodownload noremoteplayback nofullscreen" className={`w-[80px] h-[80px] z-[9999] cursor-pointer rounded-full object-cover ${activeAi ? 'translate-x-[10%] translate-y-[10%] scale-125' : 'translate-x-0 translate-y-0 scale-100'} transition-transform`} style={{filter:`${activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"}`}}/>
    </div>
  )
}

export default Ai;
