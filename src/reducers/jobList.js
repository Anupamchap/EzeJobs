import {
  JOB_FAVORITED,
  JOB_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case JOB_FAVORITED:
    case JOB_UNFAVORITED:
      return {
        ...state,
        jobs: state.jobs.map(job => {
          if (job.slug === action.payload.job.slug) {
            return {
              ...job,
              favorited: action.payload.job.favorited,
              favoritesCount: action.payload.job.favoritesCount
            };
          }
          return job;
        })
      };
    case SET_PAGE:
      return {
        ...state,
        jobs: action.payload.jobs,
        jobsCount: action.payload.jobsCount,
        currentPage: action.page
      };
    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        jobs: action.payload.jobs,
        jobsCount: action.payload.jobsCount,
        //tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        tags: action.payload? action.payload[0].tags : null,
        //tags: action.payload[0]? action.payload[0].tags : null,
        jobs: action.payload[1]? action.payload[1].jobs : null,
        jobsCount: action.payload[1]? action.payload[1].jobsCount : null,
        currentPage: 0,
        //tab: action.tab
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        jobs: action.payload.jobs,
        jobsCount: action.payload.jobsCount,
        //tab: action.tab,
        currentPage: 0,
        tag: null
      };
    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        jobs: action.payload[1].jobs,
        jobsCount: action.payload[1].jobsCount,
        currentPage: 0
      };
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
