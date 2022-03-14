import '../resource/css/Appcard.css'
import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import RecipeReviewCard from '../components/card'

function Advanced({ db = [] }) {
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
      margin: 'auto', width: '100%', padding: '0px'
    }}>
      {/* <h1>React Tinder Card</h1> */}
      <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <RecipeReviewCard data={[character, index]} />
          </TinderCard>
        ))}
      </div>

    </div>
    <br /><br />
  </div>
  )
}

export default Advanced
