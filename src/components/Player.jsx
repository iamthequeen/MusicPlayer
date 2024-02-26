import React,{useState,useEffect,useRef} from 'react';
import {BsPlayFill,BsPauseFill,BsShuffle,BsSkipEndFill,BsSkipStartFill} from "react-icons/bs";
import {ImLoop} from "react-icons/im";
import"./player.css"
export default function Player(props)
{
    const {active,setActive}=props

    console.log("player rendered",active.isPlaying)

    const [currentTime,setCurrentTime]=useState(0)
    const audioEl=useRef(null)
    const duration=props.songs[props.currentIndex].duration
    useEffect(()=>{
        console.log("time updated",audioEl.current.currentTime)
        function watchtime(){
            setCurrentTime(audioEl.current.currentTime)
        }
        audioEl.current.addEventListener("timeupdate",watchtime)
        return function(){
            audioEl.current.removeEventListener("timeupdate",watchtime)
        }
    },[currentTime])
    
    function changeHandler(event){
        audioEl.current.currentTime=event.target.value*audioEl.current.duration/1000;
    }

    useEffect(()=>{
        console.log("isPlaying render")
        if(active.isPlaying)
        {
            audioEl.current.play()
            document.getElementById("cover-img").style.animationPlayState = "running";
        }  
        else{
            audioEl.current.pause()
            document.getElementById("cover-img").style.animationPlayState = "paused";
        }
    })

    useEffect(()=>{
        console.log("loop render")
        if(active.isLoop)
        {
            audioEl.current.loop=true;
        }  
        else{
            audioEl.current.loop=false;
        }
    },[active.isLoop])

    function skipSong(forward = true)
    {
        console.log("skipSong",props.currentIndex)
        setCurrentTime(0)
        audioEl.current.currentTime=0;
        props.setPrevIndex(props.currentIndex)
        setActive(function(prev){
            return({
                ...prev,
                isPlaying:true
            })
        })
        if(forward)
        {
            props.setCurrentIndex((temp)=>{
              return ((temp+1)%(props.songs.length))
            })
        }
        else{
            props.setCurrentIndex(()=>{
                let temp=props.currentIndex
                temp--
                if(temp<0)
                {
                    temp=props.songs.length-1
                }
                return temp
            })   
        }
    }

    function loopHandler(){
        
            setActive(function(prev){
                return({
                    ...prev,
                    isLoop:!prev.isLoop
                })
            })
            console.log("loop clicked",active.isLoop)
    }

    function playHandler(){ 
        setActive(function(prev){
            return({
                ...prev,
                isPlaying:!prev.isPlaying
            })
        })
        console.log(" play clicked",active.isPlaying)
    }

    function shuffleHandler(){
        const random=Math.floor(Math.random() * props.songs.length)
        document.getElementById(`play-gif${props.currentIndex}`).style.visibility="hidden";
        document.getElementById(`play-gif${random}`).style.visibility="visible";
        props.setCurrentIndex(random)
        console.log("shuffle clicked")
    }

    function formatter(myNumber){
        myNumber=Math.floor(myNumber%60)
        return ("0" + myNumber).slice(-2);
    }

    return(
        <div className="card">

            <audio 
            src={props.songs[props.currentIndex].url} 
            ref={audioEl} preload="auto" 
            onEnded={()=>{
                document.getElementById(`play-gif${props.currentIndex}`).style.visibility="hidden";
                skipSong(true)}}
            />

            <div className="cd">
                <img 
                id="cover-img" 
                src={props.songs[props.currentIndex].img}
                />
                <div className="circle"></div>
            </div>

            <h4 className="title">
            {props.songs[props.currentIndex].title}
            </h4>

            <p className="author">
            {props.songs[props.currentIndex].author}
            </p>

            <input 
            min="1" 
            max="1000" 
            className="slider" 
            type="range" 
            value={Math.floor((currentTime/duration)*1000)} 
            onChange={changeHandler} />

            <div className="time">
                <p>{Math.floor(currentTime/60)}:{formatter(currentTime)}</p>
                <p>{Math.floor(duration/60)}:{formatter(duration)}</p>
            </div>
            <div className="button-container">
                <BsShuffle   id="shuffle" onClick={shuffleHandler}/>
                <BsSkipStartFill  className="button"  onClick={()=>skipSong(false)}/>
                {!(active.isPlaying) ?
                 <BsPlayFill  className="button" onClick={playHandler} />
                : <BsPauseFill  className="button" onClick={playHandler} />
                }
                <BsSkipEndFill  className="button" onClick={()=>skipSong(true)}/>
                <ImLoop className={active.isLoop && "loopActive"} onClick={loopHandler}/>
            </div>
        </div>
    )
}