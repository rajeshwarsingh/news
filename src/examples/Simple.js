import React, { useState,useEffect } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'
// import { useEffect } from 'react/cjs/react.production.min'

let db = [
  // {
  //   name: 'Richard Hendricks',
  //   url: './img/richard.jpg'
  // },
  // {
  //   name: 'Erlich Bachman',
  //   url: './img/erlich.jpg'
  // },
  // {
  //   name: 'Monica Hall',
  //   url: './img/monica.jpg'
  // },
  // {
  //   name: 'Jared Dunn',
  //   url: './img/jared.jpg'
  // },
  // {
  //   name: 'Dinesh Chugtai',
  //   url: './img/dinesh.jpg'
  // }
]


async function searchNews(q) {
  q = encodeURIComponent(q);
  const response = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${q}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": "e278301744msh1c99c69b72ab917p149b25jsn246205d45abb",
      "x-bingapis-sdk": "true"
    }
  });
  const body = await response.json();
  return body.value;
}

function Simple () {
  useEffect(()=>{

  searchNews('docker').then(result=> {
    console.log("result :",result)
    db=result.map(news=>{
      // console.log("news :",news,news.provider[0].image.thumbnail.contentUrl)
      let img = ''
      if(news,news.provider.lenth){
        img = news.provider[0].image.thumbnail.contentUrl
      }
      return {
        name:news.name,
        url:news.provider[0].image.thumbnail.contentUrl
      }
    });
console.log("db ----------:",db)
  })
   

    // db = [{
    //   name: 'Dinesh Chugtai',
    //   url: './img/dinesh.jpg'
    // }]
  },[])
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (

    <div>{ console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@",db)}
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>React Tinder Card</h1>
      <div className='cardContainer'>
        {characters.map((character) =>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  )
}

export default Simple
