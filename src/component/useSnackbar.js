import { useDispatch, useSelector } from 'react-redux';
import {
	MESSAGES,
	REASONS,
	originKeyExtractor,
	omitContainerKeys,
	DEFAULTS,
	merge,
	transformer,
	isDefined,
} from '../utils/constant';
import { setReduxState, setSnack, setQueueSnack } from '../action';

export const useSnackbar = () => {
	const dispatch = useDispatch();
	const { queue, snacks, maxSnackLength } = useSelector((state) => state);
	const reduxState = useSelector((state) => state);

	const maxSnack = () => {
		return maxSnackLength || DEFAULTS.maxSnack;
	};

	const processQueue = (state) => {
		const { queue, snacks } = state;
		console.log('ABCD Process qiueue', queue, snacks);
		if (queue.length > 0) {
			return {
				...state,
				snacks: [...snacks, queue[0]],
				queue: queue.slice(1, queue.length),
			};
		}
		console.log('ABCD process end', state);
		return state;
	};

	const handleDisplaySnack = (state) => {
		const { snacks } = state;
		console.log('ABCD display', snacks);
		if (snacks.length >= maxSnack()) {
			return handleDismissOldest(state);
		}
		return processQueue(state);
	};

	const handleDismissOldest = (state) => {
		if (state.snacks.some((item) => !item.open || item.requestClose)) {
			return state;
		}

		let popped = false;
		let ignore = false;

		const persistentCount = state.snacks.reduce(
			(acc, current) => acc + (current.open && current.persist ? 1 : 0),
			0
		);

		if (persistentCount === maxSnack()) {
			ignore = true;
		}

		const snacks = state.snacks.map((item) => {
			if (!popped && (!item.persist || ignore)) {
				popped = true;

				if (!item.entered) {
					return {
						...item,
						requestClose: true,
					};
				}

				if (item.onClose) item.onClose(null, REASONS.MAXSNACK, item.key);

				return {
					...item,
					open: false,
				};
			}

			return { ...item };
		});

		return { ...state, snacks };
	};

	const enqueueSnackbar = (message, opts = {}) => {
		const { key, preventDuplicate, ...options } = opts;

		const hasSpecifiedKey = isDefined(key);
		const id = hasSpecifiedKey ? key : new Date().getTime() + Math.random();

		const merger = merge(options, {}, DEFAULTS);
		const snack = {
			key: id,
			...options,
			message,
			open: true,
			entered: false,
			requestClose: false,
			// variant: merger['variant'],
			// anchorOrigin: merger['anchorOrigin'],
		};

		if (options.persist) {
			snack.autoHideDuration = undefined;
		}
		console.log('ABCD ENQUEUErtyui', snacks);
		const value = handleDisplaySnack({
			snacks,
			queue: [...queue, snack],
		});

		console.log('ABCD ENQUEUE', value);

		dispatch(setReduxState(value));

		return id;
	};

	const handleEnteredSnack = (key) => {
		const newSnack = snacks.map((item) =>
			item.key === key ? { ...item, entered: true } : { ...item }
		);
		console.log('ABCD ENTERWD', key, newSnack);
		dispatch(setSnack(newSnack));
	};

	const handleCloseSnack = (event, reason, key) => {
		if (reason === REASONS.CLICKAWAY) return;
		const shouldCloseAll = key === undefined;
		console.log('KEY::', key);
		const newSnack = snacks.map((item) => {
			if (!shouldCloseAll && item.key !== key) {
				return { ...item };
			}

			return item.entered
				? { ...item, open: false }
				: { ...item, requestClose: true };
		});

		const newqueue = queue.filter((item) => item.key !== key);

		console.log('ABC:: Snack and Queue curr:', snacks, queue);
		dispatch(
			setQueueSnack({
				snacks: newSnack,
				queue: newqueue,
			})
		);
	};

	const closeSnackbar = (key) => {
		const toBeClosed = snacks.find((item) => item.key === key);
		if (toBeClosed && toBeClosed.onClose) {
			toBeClosed.onClose(null, REASONS.INSTRUCTED, key);
		}

		handleCloseSnack(null, REASONS.INSTRUCTED, key);
	};

	const handleExitedSnack = (key1, key2) => {
		const key = key1 || key2;

		console.log('ABC:: handleExit', key);
		const newState = processQueue({
			queue,
			snacks: snacks.filter((item) => item.key !== key),
		});

		if (newState.queue.length === 0) {
			dispatch(setReduxState(newState));
		} else {
			dispatch(setReduxState(handleDismissOldest(newState)));
		}
	};

	return {
		enqueueSnackbar,
		closeSnackbar,
		handleEnteredSnack,
		handleExitedSnack,
		handleCloseSnack,
	};
};
