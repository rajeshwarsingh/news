import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './resource/css/App.css'
import Advanced from './examples/Advanced'
import ElevationScroll from './components/App_bar'
import FixedBottomNavigation from './components/footer'

function App() {
  const newsData = useSelector((state) => state.newsData)
  
  return (
    <React.Fragment>
      <ElevationScroll />
      <Advanced db={newsData ? newsData : []} />
      <FixedBottomNavigation />
    </React.Fragment>
  )
}

export default App;
