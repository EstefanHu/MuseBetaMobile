const API = 'http://192.168.1.10:4000';

const loginUrl = API + '/api/v1/user/login';
const registerUrl = API + '/api/v1/user/register';
const profileUrl = API + '/api/v1/user/me';
const addToLibrary = API + '/api/v1/user/addStoryToLibrary';
const removeFromLibrary = API + '/api/v1/user/removeStoryFromLibrary';
const getLibrary = API + '/api/v1/story/library';
const storyUrl = API + '/api/v1/story';

export {
  API,
  loginUrl,
  registerUrl,
  profileUrl,
  addToLibrary,
  removeFromLibrary,
  getLibrary,
  storyUrl
}