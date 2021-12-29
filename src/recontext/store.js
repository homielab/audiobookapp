/**
 * @format
 * @flow
 */
import createStore from '@homielab/react-recontext';
import initialState from './initialState';
import actionsCreators from './actions/index';

const enableLogger = true;

export const {Provider, connect, dispatch} = createStore(
  initialState,
  actionsCreators,
  enableLogger,
);
