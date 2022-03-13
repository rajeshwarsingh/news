import axios  from "axios";
import ACTIONS from './action'

const getNews = async (dispatch, newsType) => {

    var options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: { q: newsType, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
      headers: {
        'x-bingapis-sdk': 'true',
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': 'e278301744msh1c99c69b72ab917p149b25jsn246205d45abb'
      }
    };

    let response = await axios.request(options);
    if (response.status == 200) {

        let db = response.data.value.map(news => {
              let img = ''
              let url = ''
              if (news, news.provider.length && news.provider[0].image) {
                img = news.provider[0].image.thumbnail.contentUrl
                url = news.provider[0].image.thumbnail.contentUrl
              }
              
              return {
                name: news.name,
                url: url,
                description: news.description,
                link:news.url
              }
            });

      dispatch({ type: ACTIONS.SUCCESS, data: db });
      return;
    }
    dispatch({ type: ACTIONS.ERROR, error: response.error });
};

const setNewsType = (dispatch, newsType)=>{

  dispatch({ type: ACTIONS.SETNEWSTYPE, data: newsType });
}

  export  {getNews, setNewsType}