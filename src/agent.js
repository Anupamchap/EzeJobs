import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = 'http://localhost:3000/api';
const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}


const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  register: (usertype, username, email, password) =>    
    requests.post('/users', { user: { usertype, username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};

const User = {
  get: (type, page) =>
  requests.get(`/user?usertype=${encode(type)}&${limit(10, page)}`),
}



const Tags = {
  getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = job => Object.assign({}, job, { slug: undefined })
const Jobs = {
  all: page =>
    requests.get(`/jobs?${limit(10, page)}`),
  byCreator: (creator, page) =>
    requests.get(`/jobs?creator=${encode(creator)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/jobs?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/jobs/${slug}`),
  favorite: slug =>
    requests.post(`/jobs/${slug}/favorite`),
  favoritedBy: (creator, page) =>
    requests.get(`/jobs?favorited=${encode(creator)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/jobs/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/jobs/${slug}`),
  unfavorite: slug =>
    requests.del(`/jobs/${slug}/favorite`),
  update: job =>
    requests.put(`/jobs/${job.slug}`, { job: omitSlug(job) }),
  create: job =>
    requests.post('/jobs', { job })
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/jobs/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/jobs/${slug}/comments/${commentId}`),
  forJob: (slug, usertype,username) =>
    //requests.get(`/jobs/${slug}/comments`)
    //requests.get(`/jobs/comments?slug=${encode(slug)}&usertype=${encode(usertype)}&username=${encode(username)}`)
    requests.get(`/jobs/${slug}/comments?usertype=${encode(usertype)}&username=${encode(username)}`)
};

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

export default {
  Jobs,
  Auth,
  Comments,
  Profile,
  Tags,
  User,
  setToken: _token => { token = _token; }
};
