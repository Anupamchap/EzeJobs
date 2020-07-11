import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  JOB_SUBMITTED,
  ASYNC_START,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        jobSlug: action.payload ? action.payload.job.slug : '',
        title: action.payload ? action.payload.job.title : '',
        description: action.payload ? action.payload.job.description : '',
        body: action.payload ? action.payload.job.body : '',
        tagInput: '',
        tagList: action.payload ? action.payload.job.tagList : []
      };
    case EDITOR_PAGE_UNLOADED:
      return {};
    case JOB_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };
    case ASYNC_START:
      if (action.subtype === JOB_SUBMITTED) {
        return { ...state, inProgress: true };
      }
      break;
    case ADD_TAG:
      return {
        ...state,
        tagList: state.tagList.concat([state.tagInput]),
        tagInput: ''
      };
    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(tag => tag !== action.tag)
      };
    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
