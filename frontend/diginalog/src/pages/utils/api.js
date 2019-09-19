import axios from 'axios';

export default axios.create({
<<<<<<< HEAD
    baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'
})
=======
  baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000'
})
>>>>>>> feature/creator/list
