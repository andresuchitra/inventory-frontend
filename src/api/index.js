import axios from 'axios';

export default axios.create({
  baseURL: 'http://ec2-13-212-201-235.ap-southeast-1.compute.amazonaws.com:3001',
});
