import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { zhCN } from '@mui/material/locale';
import './resource/css/App.css'
import Advanced from './examples/Advanced'
import ElevationScroll from './components/App_bar'
import FixedBottomNavigation from './components/footer'
import AbountUs from './components/about'
import ContactUs from './components/contact'

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  zhCN,
);

function App() {
  const newsData = useSelector((state) => state.newsData)
  const newsDataType = useSelector((state) => state.newsDataType)
  
  return (
    <ThemeProvider theme={theme}>
  <ElevationScroll />
  {newsDataType === 'aboutUs' && <AbountUs/>}
  {newsDataType === 'ContactUs' && <ContactUs/>}
  {newsDataType !== 'ContactUs'  &&  newsDataType !== 'aboutUs' && <Advanced db={newsData ? newsData : []} />}
      
      <FixedBottomNavigation />
</ThemeProvider>
  )
}

export default App;
