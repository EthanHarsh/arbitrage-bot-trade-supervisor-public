import axios from 'axios';
import checkVerb from './checkVerb';
export default async function handleError(message) {
  await axios
      .post('http://127.0.0.1:5544', {message})
      .then(function(response) {
        checkVerb(response);
      })
      .catch(function(error) {
        checkVerb(error);
      });
}
