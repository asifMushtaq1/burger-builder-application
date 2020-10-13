import axios from 'axios';

const instance = axios.create({  
  baseURL : 'https://my-react-burger-app-c71e1.firebaseio.com/'
});

export default instance;