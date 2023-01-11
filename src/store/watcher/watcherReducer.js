import { appActionTypes } from '../app/appActions';
import { watcherActionTypes } from './watcherActions';

const initialState = {
  isLoading: false,
  isChecking: false,
  content: null,
  watchers: [],
  details: null,
};

function handleSetContent(state, { content }) {
  return { ...state, content };
}

function handleSetWatchers(state, { watchers }) {
  return { ...state, watchers };
}

function handleSetDetails(state, { details }) {
  return { ...state, details };
}

function handleIsLoading(state, { loading }) {
  return { ...state, isLoading: loading };
}

function handleIsChecking(state, { checking }) {
  return { ...state, isChecking: checking };
}

function handleReset() {
  return initialState;
}

export function watcherReducer(state = initialState, action) {
  switch (action.type) {
    case watcherActionTypes.SET_CONTENT:
      return handleSetContent(state, action.payload);

    case watcherActionTypes.SET_WATCHERS:
      return handleSetWatchers(state, action.payload);

    case watcherActionTypes.SET_DETAILS:
      return handleSetDetails(state, action.payload);

    case watcherActionTypes.IS_LOADING:
      return handleIsLoading(state, action.payload);

    case watcherActionTypes.IS_CHECKING:
      return handleIsChecking(state, action.payload);

    case appActionTypes.RESET:
      return handleReset();

    default:
      return state;
  }
}
