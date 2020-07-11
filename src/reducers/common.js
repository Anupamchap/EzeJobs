import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  JOB_SUBMITTED,
  SETTINGS_SAVED,
  LOGIN,
  REGISTER,
  DELETE_JOB,
  JOB_PAGE_UNLOADED,
  EDITOR_PAGE_UNLOADED,
  HOME_PAGE_UNLOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  RECRUITERDATA,
  SEEKERDATA,
  SEEKERDATA_SUBMITTED,  
  UPDATE_FIELD_SEEKERDATA,
  RECRUITERDATA_SUBMITTED,
  UPDATE_FIELD_RECRUITERDATA
} from '../constants/actionTypes';

const defaultState = {
  appName: 'EzeJobs',
  token: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return { ...state, redirectTo: '/', token: null, currentUser: null };
    case JOB_SUBMITTED:
      const redirectUrl = `/job/${action.payload.job.slug}`;
      return { ...state, redirectTo: redirectUrl };
    case SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        currentUser: action.error ? null : action.payload.user
      };
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.user.token,
        currentUser: action.error ? null : action.payload.user
      };
    case DELETE_JOB:
      return { ...state, redirectTo: '/' };
    case JOB_PAGE_UNLOADED:
    case EDITOR_PAGE_UNLOADED:
    case HOME_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    
    case SEEKERDATA:
        return {
          ...state,
          redirectTo: action.error ? null : `/seekerdata/@${action.payload.user.username}`,
          token: action.error ? null : action.payload.user.token,
          currentUser: action.error ? null : action.payload.user
        };
        case SEEKERDATA_SUBMITTED:
          return {
            ...state,
            redirectTo: action.error ? null : '/',
            //currentUser: action.error ? null : action.payload.user
          };   
        case UPDATE_FIELD_SEEKERDATA:      
          {let currentUser=Object.assign(state.currentUser,{[action.key]: action.value})
          return { ...state, currentUser };     }   
    case RECRUITERDATA:
          return {
            ...state,
            redirectTo: action.error ? null : `/recruiterdata/@${action.payload.user.username}`,
            token: action.error ? null : action.payload.user.token,
            currentUser: action.error ? null : action.payload.user
          };
    case RECRUITERDATA_SUBMITTED:
            return {
              ...state,
              redirectTo: action.error ? null : '/',
              //currentUser: action.error ? null : action.payload.user
            };   
    case UPDATE_FIELD_RECRUITERDATA:      
            {let currentUser=Object.assign(state.currentUser,{[action.key]: action.value})
            return { ...state, currentUser };  }      
    default:
      return state;
  }
};
