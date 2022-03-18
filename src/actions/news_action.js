import axios from "axios";
import ACTIONS from './action'

const getNews = async (dispatch, newsType, lang) => {
 let url = `https://thetidbit-mw.herokuapp.com/news/getCategoryNews`
 if(lang==='hi')url= `https://thetidbit-mw.herokuapp.com/news/getCategoryNews?lang=${lang}`

  var options = {
    method: 'GET',
    url: url,
    params: { q: newsType }
  };

  let response = await axios.request(options);
  if (response.status == 200) {
    dispatch({ type: ACTIONS.SUCCESS, data: response.data });
    return;
  }
  dispatch({ type: ACTIONS.ERROR, error: response.error });
};

const getSearchedNews = async (dispatch, newsType, lang) => {
  let url = `https://thetidbit-mw.herokuapp.com/news/getSearchedNews`
  if(lang==='hi')url= `https://thetidbit-mw.herokuapp.com/news/getSearchedNews?lang=${lang}`
 
  const options = {
    method: 'GET',
    url: url,
    params: { q: newsType }
  };

  let response = await axios.request(options);
  if (response.status == 200) {
    dispatch({ type: ACTIONS.SUCCESS, data: response.data });
    return;
  }
  dispatch({ type: ACTIONS.ERROR, error: response.error });
};

const getTrendingNews = async (dispatch, newsType, lang) => {
  let url = `https://thetidbit-mw.herokuapp.com/news/getTrendingNews`
  if(lang==='hi')url= `https://thetidbit-mw.herokuapp.com/news/getTrendingNews?lang=${lang}`
 
  const options = {
    method: 'GET',
    url: url
  };

  let response = await axios.request(options);
  if (response.status == 200) {
    dispatch({ type: ACTIONS.SUCCESS, data: response.data });
    return;
  }
  dispatch({ type: ACTIONS.ERROR, error: response.error });
};

const setNewsType = (dispatch, newsType) => {
  dispatch({ type: ACTIONS.SETNEWSTYPE, data: newsType });
}

const setLanguageAction = (dispatch, lang) => {
  // alert('setLanguageAction'+lang)
  dispatch({ type: ACTIONS.SETLANGUAGE, data: lang });
}


export { getNews, setNewsType, getSearchedNews, getTrendingNews, setLanguageAction }