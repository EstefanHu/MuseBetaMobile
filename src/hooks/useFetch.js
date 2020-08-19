import { AsyncStorage } from 'react-native';

exports.useFetch = async (url, method, body) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const bodyIsFormData = body instanceof FormData;
    const params = { method }

    method === 'GET' ? params.headers = {}
      : params.headers = {
        Accept: 'application/json',
        'Content-Type': bodyIsFormData ?
          'multipart/form-data' :
          'application/json',
      }
    if (token) params.headers.Authorization = `Bearer ${token}`;
    if (body) params.body = bodyIsFormData ? body : JSON.stringify(body);

    const response = await fetch(url, params);
    const data = await response.json();

    return data;
  } catch (error) {
    return { status: 'failure', payload: error };
  }
};