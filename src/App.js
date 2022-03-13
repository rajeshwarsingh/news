import React, { useEffect, useState } from 'react'
import './App.css'
// import Switch from 'react-ios-switch'
// import Container from '@mui/material/Container';
// import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Advanced from './examples/Advanced'
import Simple from './examples/Simple'
import ResponsiveAppBar from './components/appbar'
import ElevationScroll from './components/App_bar'
import FixedBottomNavigation from './footer'

function App() {
  const [showAdvanced, setShowAdvanced] = useState(true)
  const [newsData, setNewsData] = useState([])
  useEffect(() => {


    let selectedQuery = localStorage.getItem('Name') || 'stock'
    let q = encodeURIComponent(selectedQuery);
    fetch(`https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${q}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": "e278301744msh1c99c69b72ab917p149b25jsn246205d45abb",
        "x-bingapis-sdk": "true"
      }
    }).then(response => response.json()).then((res) => {
      let db = res.value.map(news => {
        let img = ''
        if (news, news.provider.length) {
          img = news.provider[0].image.thumbnail.contentUrl
        }
        
        return {
          name: news.name,
          url: news.provider[0].image.thumbnail.contentUrl,
          description: news.description,
          link:news.url
        }
      });

      setNewsData(db)
    })

  }, [])


  return (
    <React.Fragment>
      <ElevationScroll />
      <Advanced db={newsData ? newsData : []} />
      <FixedBottomNavigation />
    </React.Fragment>
  )
}

export default App
