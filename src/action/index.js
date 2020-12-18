export const PUSH_SNACKBAR = 'PUSH_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const POP_SNACKBAR = 'POP_SNACKBAR';
export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';
export const SET_QUEUE_SNACK = 'SET_QUEUE_SNACK';
export const SET_SNACK = 'SET_SNACK';
export const SET_REDUX_STATE = 'SET_REDUX_STATE';

export const pushSnackbar = (notification) => {
	const key = notification.options && notification.options.key;
	console.log('ABC::inside handle piush22');

	return {
		type: PUSH_SNACKBAR,
		notification: {
			...notification,
			key: key || new Date().getTime() + Math.random(),
		},
	};
};
export const pushNewSnackbar = (notification) => {
	const key = notification.options && notification.options.key;

	return {
		type: ENQUEUE_SNACKBAR,
		notification: {
			...notification,
			key: key || new Date().getTime() + Math.random(),
		},
	};
};
export const closeSnackbar = (key) => ({
	type: CLOSE_SNACKBAR,
	dismissAll: !key, // dismiss all if no key has been defined
	key,
});

export const popSnackbar = (key) => ({
	type: POP_SNACKBAR,
	key,
});

export const setReduxState = (payload) => ({
	type: SET_REDUX_STATE,
	payload,
});

export const setSnack = (payload) => ({
	type: SET_SNACK,
	payload,
});

export const setQueueSnack = (payload) => ({
	type: SET_QUEUE_SNACK,
	payload,
});
