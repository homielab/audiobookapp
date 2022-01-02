import createStore from 'react-recontext';
import actionsCreators from './actions/index';
import initialState from './initialState';

export const {Provider, Context, dispatch, connect} = createStore({
  displayName: 'AudioBook',
  isEnableLog: false,
  initState: initialState,
  actions: actionsCreators,
});
