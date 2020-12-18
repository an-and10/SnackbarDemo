import { createStore } from 'redux';
import reducer from '../reducer';
// eslint-disable-next-line import/no-cycle
console.log('ABC::inside handle piush55555', reducer);
export const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
);
