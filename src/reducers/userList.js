import {
  USER_CHANGE_TAB,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case USER_CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        users: action.payload.users,        
        currentPage: 0,
        tag: null
      };
    default:
      return state;
  }
};
