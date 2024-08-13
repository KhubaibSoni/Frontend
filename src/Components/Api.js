import axios from 'axios';

// Use environment variables for base URLs
const ApiFunc = async (method = '', headers = {}, body = {}, url = '' , id="") => {
  try {
    const response = await axios({
      method,
      url:  `${url}/${id}`,
      headers,
      data: body,
    });
    
    console.log('Sucessful Response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response data:', error.response.data.message);
      console.error('Error response status:', error.response.status);
      throw error.response.data.msg
    } else {
      console.error('Error in API request:', error);
    }
    throw error;
  }
};

export default ApiFunc;
