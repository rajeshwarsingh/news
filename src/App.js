import React, { useEffect, useState, useReducer } from 'react'
import './App.css'
import Advanced from './examples/Advanced'
import ElevationScroll from './components/App_bar'
import FixedBottomNavigation from './footer'
import newsDataReducer from './store/reducer'
import ACTIONS from './actions/action'
import {getNews, setNewsType} from './actions/news_action'

const initialState = {
  newsData: '',
  loading: false,
  error: null,
  newsDataType:''
};


function App() {
  const [state, dispatch] = useReducer(newsDataReducer, initialState);
  const { newsData, loading, error } = state;

  useEffect(() => {
    dispatch({ type: ACTIONS.CALL_API });
    getNews(dispatch, 'current affairs');
    setNewsType(dispatch, 'current affairs')
  }, []);

  return (
    <React.Fragment>
      <ElevationScroll />
      <Advanced db={newsData ? newsData : []} />
      <FixedBottomNavigation />
    </React.Fragment>
  )
}

export default App;
