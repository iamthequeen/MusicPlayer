import React from "react"
import "./playlist.css"
import PlayListSong from "./PlayListSong"

export default function PlayList(props){
    const {
        songs,
        active,
        setActive,
        prevIndex,
        setPrevIndex,
        currentIndex,
        setCurrentIndex,
    } = props
   
    return(
        <div className="playList">
        <h2 className="heading">ALL SONGS</h2>
            <ul>
            {
                songs.map((song, idx)=>(
                <li>
                    <PlayListSong
                        idx={idx}
                        currentIndex={currentIndex}
                        setIndex={setCurrentIndex}
                        prevIndex={prevIndex}
                        setPrevIndex={setPrevIndex}
                        active={active}
                        setActive={setActive}
                        title={song.title}
                        artist={song.artist}
                        duration={song.duration}
                        url={song.url}
                        img={song.img}
                    />
                </li>))
                
            }
            </ul>
        </div>
    )
}