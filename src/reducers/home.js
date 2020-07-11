import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, CHANGE_HOME_TAB } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        tags: action.payload[0]? action.payload[0].tags: null,
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case CHANGE_HOME_TAB:
      return {...state,
      tab:action.tab};
    default:
      return state;
  }
};
