import React from 'react';
import { useEffect } from 'react';
import "./playListSong.css"
import {AiOutlineHeart} from "react-icons/ai"
import {BsThreeDotsVertical} from "react-icons/bs"

export default function PlayListSong(props){

    const {
        idx,
        prevIndex,
        setPrevIndex,
        active,
        setActive,
        currentIndex,
        setCurrentIndex,
        title,
        author,
        duration,
        url,
        img,
    } = props

    function formatter(myNumber){
        myNumber = Math.floor(myNumber % 60)
        return ("0" + myNumber).slice(-2);
    }

    useEffect(()=>{
    //     if (active.isPlaying){
    //         document.getElementById(`play-gif${currentIndex}`).style.visibility="visible";
    //     } else {
    //         document.getElementById(`play-gif${currentIndex}`).style.visibility="hidden";
    //    }

            if (prevIndex >=0 && currentIndex!=prevIndex) // && active.isPlaying===false
        {
            document.getElementById(`play-gif${prevIndex}`).style.visibility="hidden"
        }
    },[active, currentIndex])

    function playSong(){

        setCurrentIndex(idx)
        document.getElementById(`play-gif${currentIndex}`).style.visibility="visible";
        setPrevIndex(currentIndex);
        setActive(function(prev){
            return({
                ...prev,
                isPlaying:true
            })
        })
    }

    return(
        <div className="playListSong" onClick={playSong}>
            <div className="img-detail">
                        <img src={img}/>
                        <div className="song-detail">
                            <h3>{title}</h3>
                            <p>{author}</p>
                        </div>
                    </div>
                    <img src="./images/play7.gif" id={`play-gif${idx}`} className="play-gif" style={{
                        width:'35px',
                        visibility: active.isPlaying ? "visible" : "hidden",
                        }}/>
                    <AiOutlineHeart className="icon heart"/>
                    <p className='duration'>{Math.floor(duration/60)}:{formatter(duration)}</p>
                    <BsThreeDotsVertical className="more-option"/>
        </div>
    )
}