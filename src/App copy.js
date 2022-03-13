import React, { useEffect, useState, useReducer } from 'react'
import { Provider, connect } from 'react-redux';
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
// import reducer from './store/reducer'

function App({count, handleIncrementClick, handleDecrementClick}) {
  const [showAdvanced, setShowAdvanced] = useState(true)
  const [newsData, setNewsData] = useState([])
  // const [state, dispatch] = useReducer(reducer, {count: 0});
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
      Count: {count}
      <button onClick={handleDecrementClick}>Decrement</button>
    <button onClick={handleIncrementClick}>Increment</button>
      <ElevationScroll />
      <Advanced db={newsData ? newsData : []} />
      <FixedBottomNavigation />
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    count: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
    handleDecrementClick: () => dispatch({type: 'DECREMENT'})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
