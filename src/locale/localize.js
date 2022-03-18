import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      how:"How do you want your egg today?",
      boiledEgg:"Boiled egg",
      softBoiledEgg:"Soft-boiled egg",
      choice:"How to choose the egg",
      current_affairs:'current affairs',
      Stock:'Stock',
      sports:'sports',
      news:'news',
      bollywood:'bollywood',
      aboutUs:'aboutUs',
      ContactUs:'ContactUs',
      regular:"Regular",
      trending:"Trending",
      search:'search'
    },
    hi: {
        how:"आओ वुई इल तुओ उवो ओगी?",
        boiledEgg:"Uovo sodo",
        softBoiledEgg:"Uovo alla coque",
        choice:"Come scegliere l'uovo",
        current_affairs:'सामयिकी',
        Stock:'भंडार',
        sports:'खेल',
        news:'समाचार',
        bollywood:'बॉलीवुड',
        aboutUs:'हमारे बारे में',
        ContactUs:'संपर्क करें',
        regular:"नियमित",
        trending:"रुझान",
        search:'तलाशी'
      }
   });
   strings.setLanguage('en');

export default strings