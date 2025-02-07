import MusicData from "./MusicData"
import React, { useState, useRef } from  "react"
import Player from "./components/Player.jsx"
import PlayList from "./components/PlayList.jsx"
import Navbar from "./components/Navbar.jsx"
import VerticalNavbar from "./components/VerticalNavbar.jsx"

export default function App()
{
  const songs = useState(MusicData)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [active, setActive] = useState({
    isLoop: false,
    isPlaying: false,
})

return(
    <div className="app">
      <Navbar />
      <div className="main">
        <VerticalNavbar />
        <PlayList
          prevIndex={prevIndex}
          setPrevIndex={setPrevIndex}
          active={active}
          setActive={setActive}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          songs={songs}
        />
        <Player
          prevIndex={prevIndex}
          setPrevIndex={setPrevIndex}
          active={active}
          setActive={setActive}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          songs={songs}
        />
      </div>
    </div>
  )
}