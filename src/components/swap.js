import { CardSwiper } from "react-card-rotate-swiper";

//...

export default function Swap() {

  const handleSwipe = (d) => {
    //fill this your callback
  };
  
  return (
      <CardSwiper
        // onSwipe={handleSwipe}
        // className={"swiper"}
        // contents={
        //   //fill this your element
        //   <Inner>
        //     <img src={img1} alt="img"></img>
        //   </Inner>
        // }
      />
  );
}