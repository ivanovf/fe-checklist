
const callEndpoint = async function(axios, method, path, token = null, body = null) {

  const baseUrl = process.env.VUE_APP_BE_HOST;
  let response = {};

  switch (method) {
    case 'get':
      if (!path && !token) {
        response = errorHandler({type: 'data', msg: `No valid method ${path} in route ${token}` });
        break;
      }

      try {
        const res = await axios.get(baseUrl + path, { headers: {'Authorization': `Bearer ${ token }`}});
        response.data = res.data;
      }
      catch(error) {
        response = errorHandler(error);
      }

      break;

    case 'post':
      if (!path && !token && !body) {
        response = errorHandler({type: 'data', msg: `No valid method ${path} in route ${token}` });
        break;
      }

      try {
        const res = await axios.post(baseUrl + path, body, { headers: {'Authorization': `Bearer ${ token }`}});
        response.data = res.data;
      }
      catch(error) {
        response = errorHandler(error);
      }
      break;

    case 'put':
      if (!path && !token && !body) {
        response = errorHandler({type: 'data', msg: `No valid method ${path} in route ${token}` });
        break;
      }

      try {
        const res = await axios.put(baseUrl + path, body, { headers: {'Authorization': `Bearer ${ token }`}});
        response.data = res.data;
      }
      catch(error) {
        response = errorHandler(error);
      }
      break;

    case 'delete':
      if (!path && !token) {
        response = errorHandler({type: 'data', msg: `No valid method ${path} in route ${token}` });
        break;
      }

      try {
        const res = await axios.delete(baseUrl + path, { headers: {'Authorization': `Bearer ${ token }`}});
        response.data = res.data;
      }
      catch(error) {
        response = errorHandler(error);
      }
      break;

    default:
      response = errorHandler({type: 'data', msg: `No valid method ${path} in route ${token}` });
      break;
  }

  return response;
}

const errorHandler = function(error) {

  console.log(error);
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
