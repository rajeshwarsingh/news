import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { zhCN } from '@mui/material/locale';
import './resource/css/App.css'
import Advanced from './examples/Advanced'
import ElevationScroll from './components/App_bar'
import FixedBottomNavigation from './components/footer'
import AbountUs from './components/about'
import ContactUs from './components/contact'
import {getFCMToken, onMessageListener} from './firebase'
import Notifications from "./components/Notifications/Notifications";
import ReactNotificationComponent from "./components/Notifications/ReactNotification";
import {setToken} from './actions/push_web'

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  zhCN,
);

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  const newsData = useSelector((state) => state.newsData)
  const newsDataType = useSelector((state) => state.newsDataType)
  useEffect(async()=>{
    
    const token = await getFCMToken()
    setToken(token)
    onMessageListener()
    .then((payload) => {
      // setShow(true);
      // setNotification({
      //   title: payload.notification.title,
      //   body: payload.notification.body,
      // });
    })
    .catch((err) => console.log("failed: ", err));
    
  },[])
  return (
    <ThemeProvider theme={theme}>
  <ElevationScroll />
  {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      <Notifications />
  {newsDataType === 'aboutUs' && <AbountUs/>}
  {newsDataType === 'ContactUs' && <ContactUs/>}
  {newsDataType !== 'ContactUs'  &&  newsDataType !== 'aboutUs' && <Advanced db={newsData ? newsData : []} />}
      
      <FixedBottomNavigation />
</ThemeProvider>
  )
}

export default App;
