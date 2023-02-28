import { sharedActionTypes } from '../../shared/react/store/sharedActions';
import { watcherActionTypes } from './watcherActions';

const initialState = {
  isLoading: false,
  isLoadingHistory: false,
  isChecking: false,
  isDeleting: false,
  isEditingSchedule: false,
  fetchError: '',
  content: null,
  contentLink: null,
  contentError: null,
  watchers: [],
  details: null,
  history: [],
  startKey: null,
  hasMore: true,
};

function handleSetContent(state, { content, contentLink }) {
  return { ...state, content, contentLink };
}

function handleSetContentError(state, { contentError }) {
  return { ...state, contentError };
}

function handleSetWatchers(state, { watchers, lastOpenTime }) {
  const sorted = watchers
    .sort((a, b) => (b.gotValueAt - a.gotValueAt > 0 ? 1 : -1))
    .map(w => ({
      ...w,
      isNew: !!lastOpenTime && w.gotValueAt > lastOpenTime,
    }));

  return { ...state, watchers: sorted };
}

function handleSetDetails(state, { details }) {
  return { ...state, details };
}

function handleSetHistory(state, { history, startKey, hasMore }) {
  return {
    ...state,
    history,
    startKey: startKey === undefined ? state.startKey : startKey,
    hasMore: hasMore === undefined ? state.hasMore : hasMore,
  };
}

function handleSetFetchError(state, { error }) {
  return { ...state, fetchError: error };
}

function handleIsLoading(state, { value }) {
  return { ...state, isLoading: value };
}

function handleIsLoadingHistory(state, { value }) {
  return { ...state, isLoadingHistory: value };
}

function handleIsChecking(state, { checking }) {
  return { ...state, isChecking: checking };
}

function handleIsDeleting(state, { deleting }) {
  return { ...state, isDeleting: deleting };
}

function handleIsEditingSchedule(state, { value }) {
  return { ...state, isEditingSchedule: value };
}

function handleReset() {
  return initialState;
}

export function watcherReducer(state = initialState, action) {
  switch (action.type) {
    case watcherActionTypes.SET_CONTENT:
      return handleSetContent(state, action.payload);

    case watcherActionTypes.SET_CONTENT_ERROR:
      return handleSetContentError(state, action.payload);

    case watcherActionTypes.SET_WATCHERS:
      return handleSetWatchers(state, action.payload);

    case watcherActionTypes.SET_DETAILS:
      return handleSetDetails(state, action.payload);

    case watcherActionTypes.SET_HISTORY:
      return handleSetHistory(state, action.payload);

    case watcherActionTypes.SET_FETCH_ERROR:
      return handleSetFetchError(state, action.payload);

    case watcherActionTypes.IS_LOADING:
      return handleIsLoading(state, action.payload);

    case watcherActionTypes.IS_LOADING_HISTORY:
      return handleIsLoadingHistory(state, action.payload);

    case watcherActionTypes.IS_CHECKING:
      return handleIsChecking(state, action.payload);

    case watcherActionTypes.IS_DELETING:
      return handleIsDeleting(state, action.payload);

    case watcherActionTypes.IS_EDITING_SCHEDULE:
      return handleIsEditingSchedule(state, action.payload);

    case sharedActionTypes.RESET:
      return handleReset();

    default:
      return state;
  }
}
