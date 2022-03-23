import axios from "axios";
import ACTIONS from './action'

const setToken = async (token) => {
    let url = `https://thetidbit-mw.herokuapp.com/setToken?token=${token}`
   
     var options = {
       method: 'GET',
       url: url
     };
   
     let data =  await axios.request(options)
   };

export { setToken }