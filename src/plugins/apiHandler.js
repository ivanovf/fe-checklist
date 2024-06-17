/* @todo Check this implementation */
const callEndpoint = async function(axios, method, path, token = null, body = null) {

  const baseUrl = process.env.VUE_APP_BE_HOST;
  const opts = { headers: {'Authorization': `Bearer ${ token }`}};
  let response = {};

  if (!path && !token) {
    response = errorHandler({type: 'data', msg: `No valid method ${path} in route ${token}` });
    return;
  }

  try {
    switch (method) {
      case 'get':
        response = await axios.get(baseUrl + path, opts);
        break;

      case 'post':
        response = await axios.post(baseUrl + path, body, opts);
        break;

      case 'put':
        response = await axios.put(baseUrl + path, body, opts);
        break;

      case 'delete':
        response = await axios.delete(baseUrl + path, opts);
        break;

      default:
        response = errorHandler({type: 'data', msg: `No valid method ${path} in route ${token}` });
        break;
    }
  } catch (error) {
    response = errorHandler(error);
  }

  return response;
}

const errorHandler = function(error) {

  if (error?.response?.status === 401) {
    return {
      error: {
        logMsg: 'Not alowed 401',
        type: 'error'
      }
    };
  }
  else {
    return {
      error: {
        logMsg: 'Data error',
        displayMsg: 'Ups algo salió mal, intenta más tarde!!!',
        type: 'error',
      }
    }
  }
}

export default callEndpoint;
