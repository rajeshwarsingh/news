import '../Appcard.css'
import React, { useState, useMemo, useRef } from 'react'
// import TinderCard from '../react-tinder-card/index'
import TinderCard from 'react-tinder-card'

// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import RecipeReviewCard from '../components/card'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Stack from '@mui/material/Stack';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




// const db = [
//   {
//     name: 'Richard Hendricks',
//     url: './img/richard.jpg'
//   },
//   {
//     name: 'Erlich Bachman',
//     url: './img/erlich.jpg'
//   },
//   {
//     name: 'Monica Hall',
//     url: './img/monica.jpg'
//   },
//   {
//     name: 'Jared Dunn',
//     url: './img/jared.jpg'
//   },
//   {
//     name: 'Dinesh Chugtai',
//     url: './img/dinesh.jpg'
//   }
// ]

function Advanced({db=[]}) {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }


  return (<div>
    <link
      href='https://fonts.googleapis.com/css?family=Damion&display=swap'
      rel='stylesheet'
    />
    <link
      href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
      rel='stylesheet'
    />
   
    <div style={{
    margin: 'auto',width: '100%',padding: '0px'}}>
    {/* <h1>React Tinder Card</h1> */}
    <div className='cardContainer'>
      {console.log("@@@@@@@@@@@",db)}
      {db.map((character, index) => (
        <TinderCard
          ref={childRefs[index]}
          className='swipe'
          key={character.name}
          onSwipe={(dir) => swiped(dir, character.name, index)}
          onCardLeftScreen={() => outOfFrame(character.name, index)}
        >
          <RecipeReviewCard data={[character, index]} />
          {/* <div
            style={{ backgroundImage: 'url(' + character.url + ')' }}
            className='card'
          >
            <h3>{character.name}</h3>
          </div> */}
        </TinderCard>
      ))}
    </div>

    </div>
    <br /><br />
    <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4}>
        <Item><div className='buttons'>
          <Button disabled={!canSwipe} onClick={() => swipe('left')} variant="contained" endIcon={<ArrowBackIosIcon />}></Button>
        </div></Item>
      </Grid>
      <Grid item xs={4}>
        <Item><div className='buttons'>
          <Button disabled={!canGoBack} onClick={() => goBack()} variant="contained" >Undo swipe!</Button>
        </div></Item>
      </Grid>
      <Grid item xs={4}>
        <Item><div className='buttons'>
          <Button disabled={!canSwipe} onClick={() => swipe('right')} variant="contained" endIcon={<ArrowForwardIosIcon />}></Button>
        </div></Item>
      </Grid>
    </Grid>
    {/* <div className='buttons'>
      <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
      <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
      <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
    </div> */}
    {lastDirection ? (
      <h2 key={lastDirection} className='infoText'>
        You swiped {lastDirection}
      </h2>
    ) : (
      <h2 className='infoText'>
        Swipe a card or press a button to get Restore Card button visible!
      </h2>
    )}
  </div>
)

  // return (
    //     <div>
    //       <Stack spacing={2}>
    //       <div className='cardContainer'>
    //           {db.map((character, index) => (
    //           <TinderCard
    //             ref={childRefs[index]}
    //             className='swipe'
    //             key={character.name}
    //             onSwipe={(dir) => swiped(dir, character.name, index)}
    //             onCardLeftScreen={() => outOfFrame(character.name, index)}
    //           >
    //             <RecipeReviewCard/>
    //             {/* <div
    //               style={{ backgroundImage: 'url(' + character.url + ')' }}
    //               className='card'
    //             >
    //               <h3>{character.name}</h3>
    //             </div> */}
    //           </TinderCard>
    //         ))}
    //       </div><br/>
    //       </Stack>
    //       <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    //   <Grid item xs={4}>
    //     <Item>1</Item>
    //   </Grid>
    //   <Grid item xs={4}>
    //     <Item>2</Item>
    //   </Grid>
    //   <Grid item xs={4}>
    //     <Item>3</Item>
    //   </Grid>
    //   <Grid item xs={6}>
    //     <Item>4</Item>
    //   </Grid>
    // </Grid>

    //       <Stack spacing={2}>
    //         <Item><div className='buttons'>
    //         <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    //         {Array.from(Array(6)).map((_, index) => (
    //           <Grid item xs={2} sm={4} md={4} key={index}>
    //             <Item>xs=2</Item>
    //           </Grid>
    //         ))}
    //       </Grid>
    //          <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
    //          <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
    //          <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
    //        </div>
    //        {lastDirection ? (
    //         <h2 key={lastDirection} className='infoText'>
    //           You swiped {lastDirection}
    //         </h2>
    //       ) : (
    //         <h2 className='infoText'>
    //           Swipe a card or press a button to get Restore Card button visible!
    //         </h2>
    //       )}</Item>
    //       </Stack>
    //     </div>
    //     <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    //   <Grid item xs={12}>
    //     <Item>
    //        <link
    //         href='https://fonts.googleapis.com/css?family=Damion&display=swap'
    //         rel='stylesheet'
    //       />
    //       <link
    //         href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
    //         rel='stylesheet'
    //       />
    //       <h1>React Tinder Card</h1>
    //     </Item>
    //   </Grid>
    //   <Grid item xs={12}>
    //     <Item>

    //     <div className='cardContainer'>
    //          {db.map((character, index) => (
    //           <TinderCard
    //             ref={childRefs[index]}
    //             className='swipe'
    //             key={character.name}
    //             onSwipe={(dir) => swiped(dir, character.name, index)}
    //             onCardLeftScreen={() => outOfFrame(character.name, index)}
    //           >
    //             <RecipeReviewCard/>
    //             {/* <div
    //               style={{ backgroundImage: 'url(' + character.url + ')' }}
    //               className='card'
    //             >
    //               <h3>{character.name}</h3>
    //             </div> */}
    //           </TinderCard>
    //         ))}
    //       </div>
    //     </Item>
    //   </Grid>
    //   <Grid item xs={12}>
    //     <Item>3</Item>

    //   </Grid>
    // </Grid>

    //     <Grid container >
    //   <Grid item >
    //     <Item><div>
    //       <link
    //         href='https://fonts.googleapis.com/css?family=Damion&display=swap'
    //         rel='stylesheet'
    //       />
    //       <link
    //         href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
    //         rel='stylesheet'
    //       /></div>
    //       <h1>React Tinder Card</h1>
    //       </Item>
    //   </Grid>
    //   <Grid item >
    //     <Item><div className='cardContainer'>
    //         {db.map((character, index) => (
    //           <TinderCard
    //             ref={childRefs[index]}
    //             className='swipe'
    //             key={character.name}
    //             onSwipe={(dir) => swiped(dir, character.name, index)}
    //             onCardLeftScreen={() => outOfFrame(character.name, index)}
    //           >
    //             <RecipeReviewCard/>
    //             {/* <div
    //               style={{ backgroundImage: 'url(' + character.url + ')' }}
    //               className='card'
    //             >
    //               <h3>{character.name}</h3>
    //             </div> */}
    //           </TinderCard>
    //         ))}
    //       </div>
    //       </Item>
    //   </Grid>
    //   <Grid item >
    //     <Item><div className='buttons'>
    //         <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
    //         <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
    //         <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
    //       </div>
    //       {lastDirection ? (
    //         <h2 key={lastDirection} className='infoText'>
    //           You swiped {lastDirection}
    //         </h2>
    //       ) : (
    //         <h2 className='infoText'>
    //           Swipe a card or press a button to get Restore Card button visible!
    //         </h2>
    //       )}
    //     </Item>
    //   </Grid>
    // </Grid>


    // <div>
    //   <link
    //     href='https://fonts.googleapis.com/css?family=Damion&display=swap'
    //     rel='stylesheet'
    //   />
    //   <link
    //     href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
    //     rel='stylesheet'
    //   />
    //   <h1>React Tinder Card</h1>
    //   <div className='cardContainer'>
    //     {db.map((character, index) => (
    //       <TinderCard
    //         ref={childRefs[index]}
    //         className='swipe'
    //         key={character.name}
    //         onSwipe={(dir) => swiped(dir, character.name, index)}
    //         onCardLeftScreen={() => outOfFrame(character.name, index)}
    //       >
    //         <RecipeReviewCard />
    //         {/* <div
    //           style={{ backgroundImage: 'url(' + character.url + ')' }}
    //           className='card'
    //         >
    //           <h3>{character.name}</h3>
    //         </div> */}
    //       </TinderCard>
    //     ))}
    //   </div>
    //   <br />
    //   <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    //     <Grid item xs={4}>
    //       <Item><div className='buttons'>
    //         <Button disabled={!canSwipe} onClick={() => swipe('left')} variant="contained" endIcon={<ArrowBackIosIcon />}></Button>
    //       </div></Item>
    //     </Grid>
    //     <Grid item xs={4}>
    //       <Item><div className='buttons'>
    //         <Button disabled={!canGoBack} onClick={() => goBack()} variant="contained" >Undo swipe!</Button>
    //       </div></Item>
    //     </Grid>
    //     <Grid item xs={4}>
    //       <Item><div className='buttons'>
    //         <Button disabled={!canSwipe} onClick={() => swipe('right')} variant="contained" endIcon={<ArrowForwardIosIcon />}></Button>
    //       </div></Item>
    //     </Grid>
    //   </Grid>
      // {/* <div className='buttons'>
      //   <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
      //   <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
      //   <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      // </div> */}
  //     {lastDirection ? (
  //       <h2 key={lastDirection} className='infoText'>
  //         You swiped {lastDirection}
  //       </h2>
  //     ) : (
  //       <h2 className='infoText'>
  //         Swipe a card or press a button to get Restore Card button visible!
  //       </h2>
  //     )}
  //   </div>
  // )


  // return (
  //   <div>
  //     <link
  //       href='https://fonts.googleapis.com/css?family=Damion&display=swap'
  //       rel='stylesheet'
  //     />
  //     <link
  //       href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
  //       rel='stylesheet'
  //     />
  //     <h1>React Tinder Card</h1>
  //     <div className='cardContainer'>
  //       {db.map((character, index) => (
  //         <TinderCard
  //           ref={childRefs[index]}
  //           className='swipe'
  //           key={character.name}
  //           onSwipe={(dir) => swiped(dir, character.name, index)}
  //           onCardLeftScreen={() => outOfFrame(character.name, index)}
  //         >
  //           <RecipeReviewCard/>
  //           {/* <div
  //             style={{ backgroundImage: 'url(' + character.url + ')' }}
  //             className='card'
  //           >
  //             <h3>{character.name}</h3>
  //           </div> */}
  //         </TinderCard>
  //       ))}
  //     </div>
  //     <div className='buttons'>
  //       <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
  //       <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
  //       <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
  //     </div>
  //     {lastDirection ? (
  //       <h2 key={lastDirection} className='infoText'>
  //         You swiped {lastDirection}
  //       </h2>
  //     ) : (
  //       <h2 className='infoText'>
  //         Swipe a card or press a button to get Restore Card button visible!
  //       </h2>
  //     )}
  //   </div>
  // )
}

export default Advanced
