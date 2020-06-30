const API = 'http://192.168.1.10:4000';

const loginUrl = API + '/api/v1/user/login';
const registerUrl = API + '/api/v1/user/register';
const profileUrl = API + '/api/v1/user/me';
const storyUrl = API + '/api/v1/story';

export {
  API,
  loginUrl,
  registerUrl,
  profileUrl,
  storyUrl
}