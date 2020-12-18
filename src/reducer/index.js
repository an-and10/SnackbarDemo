/* eslint-disable import/no-anonymous-default-export */
import {
	PUSH_SNACKBAR,
	CLOSE_SNACKBAR,
	POP_SNACKBAR,
	ENQUEUE_SNACKBAR,
	SET_QUEUE_SNACK,
	SET_SNACK,
	SET_REDUX_STATE,
} from '../action';

const defaultState = {
	notifications: [],
	snacks: [],
	queue: [],
	maxSnackLength: 1,
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case PUSH_SNACKBAR:
			console.log('ABC::inside handle piush333');
			return {
				...state,
				notifications: [
					...state.notifications,
					{
						key: action.key,
						...action.notification,
					},
				],
			};
		case ENQUEUE_SNACKBAR:
			return {
				...state,
				notifications: [
					...state.notifications,
					{
						key: action.key,
						...action.notification,
					},
				],
			};

		case CLOSE_SNACKBAR:
			return {
				...state,
				notifications: state.notifications.map((notification) =>
					action.dismissAll || notification.key === action.key
						? { ...notification, dismissed: true }
						: { ...notification }
				),
			};

		case POP_SNACKBAR:
			return {
				...state,
				notifications: state.notifications.filter(
					(notification) => notification.key !== action.key
				),
			};

		case SET_REDUX_STATE:
			console.log('ABCD REDUX', action.payload);
			return {
				...state,
				...action.payload,
			};

		case SET_SNACK:
			return {
				...state,
				snacks: action.payload,
			};

		case SET_QUEUE_SNACK:
			return {
				...state,
				snacks: action.payload.snacks,
				queue: action.payload.queue,
			};
		default:
			return state;
	}
};
