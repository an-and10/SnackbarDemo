import React, { Component } from 'react';
import clsx from 'clsx';
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
import SnackbarComponent from './SnackbarComponent';
import SnackbarContainer from './SnackbarContainer';
import warning from '../utils/warning';
import createChainedFunction from '../utils/createChainedFunction';
import { closeSnackbar } from '../action';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { useSnackbar } from './useSnackbar';

const SnackbarProvider = (props) => {
	// const {
	// 	maxSnack: dontspread1,
	// 	preventDuplicate: dontspread2,
	// 	variant: dontspread3,
	// 	anchorOrigin: dontspread4,
	// 	iconVariant,
	// 	dense = DEFAULTS.dense,
	// 	hideIconVariant = DEFAULTS.hideIconVariant,
	// 	domRoot,
	// 	children,
	// 	classes = {},
	// 	...props
	// } = props;

	const {
		classes = {},
		hideIconVariant = DEFAULTS.hideIconVariant,
		children,
		anchorOrigin,
		iconVariant,
	} = props;

	const {
		handleEnteredSnack,
		handleExitedSnack,
		handleCloseSnack,
	} = useSnackbar();

	// get maxSnack() {
	// 	return props.maxSnack || DEFAULTS.maxSnack;
	// }

	// enqueueSnackbar = (message, opts = {}) => {
	// 	const { key, preventDuplicate, ...options } = opts;

	// 	const hasSpecifiedKey = isDefined(key);
	// 	const id = hasSpecifiedKey ? key : new Date().getTime() + Math.random();

	// 	const merger = merge(options, props, DEFAULTS);
	// 	const snack = {
	// 		key: id,
	// 		...options,
	// 		message,
	// 		open: true,
	// 		entered: false,
	// 		requestClose: false,
	// 		variant: merger('variant'),
	// 		anchorOrigin: merger('anchorOrigin'),
	// 		autoHideDuration: merger('autoHideDuration'),
	// 	};

	// 	if (options.persist) {
	// 		snack.autoHideDuration = undefined;
	// 	}

	// 	setState((state) => {
	// 		if (
	// 			(preventDuplicate === undefined && props.preventDuplicate) ||
	// 			preventDuplicate
	// 		) {
	// 			const compareFunction = (item) =>
	// 				hasSpecifiedKey ? item.key === key : item.message === message;

	// 			const inQueue = state.queue.findIndex(compareFunction) > -1;
	// 			const inView = state.snacks.findIndex(compareFunction) > -1;
	// 			if (inQueue || inView) {
	// 				return state;
	// 			}
	// 		}

	// 		return handleDisplaySnack({
	// 			...state,
	// 			queue: [...state.queue, snack],
	// 		});
	// 	});

	// 	return id;
	// };

	// /**
	//  * Reducer: Display snack if there's space for it. Otherwise, immediately
	//  * begin dismissing the oldest message to start showing the new one.
	//  */
	// handleDisplaySnack = (state) => {
	// 	const { snacks } = state;
	// 	if (snacks.length >= maxSnack) {
	// 		return handleDismissOldest(state);
	// 	}
	// 	return processQueue(state);
	// };

	// /**
	//  * Reducer: Display items (notifications) in the queue if there's space for them.
	//  */
	// processQueue = (state) => {
	// 	const { queue, snacks } = state;
	// 	if (queue.length > 0) {
	// 		return {
	// 			...state,
	// 			snacks: [...snacks, queue[0]],
	// 			queue: queue.slice(1, queue.length),
	// 		};
	// 	}
	// 	return state;
	// };

	// /**
	//  * Reducer: Hide oldest snackbar on the screen because there exists a new one which we have to display.
	//  * (ignoring the one with 'persist' flag. i.e. explicitly told by user not to get dismissed).
	//  *
	//  * Note 1: If there is already a message leaving the screen, no new messages are dismissed.
	//  * Note 2: If the oldest message has not yet entered the screen, only a request to close the
	//  *         snackbar is made. Once it entered the screen, it will be immediately dismissed.
	//  */
	// handleDismissOldest = (state) => {
	// 	if (state.snacks.some((item) => !item.open || item.requestClose)) {
	// 		return state;
	// 	}

	// 	let popped = false;
	// 	let ignore = false;

	// 	const persistentCount = state.snacks.reduce(
	// 		(acc, current) => acc + (current.open && current.persist ? 1 : 0),
	// 		0
	// 	);

	// 	if (persistentCount === maxSnack) {
	// 		warning(MESSAGES.NO_PERSIST_ALL);
	// 		ignore = true;
	// 	}

	// 	const snacks = state.snacks.map((item) => {
	// 		if (!popped && (!item.persist || ignore)) {
	// 			popped = true;

	// 			if (!item.entered) {
	// 				return {
	// 					...item,
	// 					requestClose: true,
	// 				};
	// 			}

	// 			if (item.onClose) item.onClose(null, REASONS.MAXSNACK, item.key);
	// 			if (props.onClose)
	// 				props.onClose(null, REASONS.MAXSNACK, item.key);

	// 			return {
	// 				...item,
	// 				open: false,
	// 			};
	// 		}

	// 		return { ...item };
	// 	});

	// 	return { ...state, snacks };
	// };

	// /**
	//  * Set the entered state of the snackbar with the given key.
	//  */
	// handleEnteredSnack = (node, isAppearing, key) => {
	// 	if (!isDefined(key)) {
	// 		throw new Error('handleEnteredSnack Cannot be called with undefined key');
	// 	}

	// 	setState(({ snacks }) => ({
	// 		snacks: snacks.map((item) =>
	// 			item.key === key ? { ...item, entered: true } : { ...item }
	// 		),
	// 	}));
	// };

	// /**
	//  * Hide a snackbar after its timeout.
	//  */
	// handleCloseSnack = (event, reason, key) => {
	// 	// should not use createChainedFunction for onClose.
	// 	// because closeSnackbar called this function
	// 	if (props.onClose) {
	// 		props.onClose(event, reason, key);
	// 	}

	// 	if (reason === REASONS.CLICKAWAY) return;
	// 	const shouldCloseAll = key === undefined;

	// 	setState(({ snacks, queue }) => ({
	// 		snacks: snacks.map((item) => {
	// 			if (!shouldCloseAll && item.key !== key) {
	// 				return { ...item };
	// 			}

	// 			return item.entered
	// 				? { ...item, open: false }
	// 				: { ...item, requestClose: true };
	// 		}),
	// 		queue: queue.filter((item) => item.key !== key), // eslint-disable-line react/no-unused-state
	// 	}));
	// };

	// /**
	//  * Close snackbar with the given key
	//  */
	// closeSnackbar = (key) => {
	// 	// call individual snackbar onClose callback passed through options parameter
	// 	const toBeClosed = state.snacks.find((item) => item.key === key);
	// 	if (isDefined(key) && toBeClosed && toBeClosed.onClose) {
	// 		toBeClosed.onClose(null, REASONS.INSTRUCTED, key);
	// 	}

	// 	handleCloseSnack(null, REASONS.INSTRUCTED, key);
	// };

	// /**
	//  * When we set open attribute of a snackbar to false (i.e. after we hide a snackbar),
	//  * it leaves the screen and immediately after leaving animation is done, this method
	//  * gets called. We remove the hidden snackbar from state and then display notifications
	//  * waiting in the queue (if any). If after this process the queue is not empty, the
	//  * oldest message is dismissed.
	//  */
	// // @ts-ignore
	// handleExitedSnack = (event, key1, key2) => {
	// 	const key = key1 || key2;
	// 	if (!isDefined(key)) {
	// 		throw new Error('handleExitedSnack Cannot be called with undefined key');
	// 	}

	// 	setState((state) => {
	// 		const newState = processQueue({
	// 			...state,
	// 			snacks: state.snacks.filter((item) => item.key !== key),
	// 		});

	// 		if (newState.queue.length === 0) {
	// 			return newState;
	// 		}

	// 		return handleDismissOldest(newState);
	// 	});
	// };

	const categ = props.snacks.reduce((acc, current) => {
		const category = originKeyExtractor(DEFAULTS.anchorOrigin);
		console.log('TEXT category', category);
		const existingOfCategory = acc[category] || [];
		return {
			...acc,
			[category]: [...existingOfCategory, current],
		};
	}, {});
	console.log('ABCD', categ, props.snacks);

	const snackbars = Object.keys(categ).map((origin) => {
		const snacks = categ[origin];
		console.log('ABCD', snacks, origin);
		return (
			<SnackbarContainer
				key={origin}
				className={clsx(
					classes.containerRoot,
					classes[transformer.toContainerAnchorOrigin(origin)]
				)}
				anchorOrigin={snacks[0]?.anchorOrigin || DEFAULTS.anchorOrigin}
			>
				{snacks.map((snack) => (
					<SnackbarComponent
						{...props}
						key={snack.key}
						snack={snack}
						iconVariant={iconVariant}
						hideIconVariant={hideIconVariant}
						classes={classes}
						onClose={handleCloseSnack}
						onExited={createChainedFunction([
							() => handleExitedSnack(snack.key),
							props.onExited,
						])}
						onEntered={handleEnteredSnack}
					/>
				))}
			</SnackbarContainer>
		);
	});

	return (
		<div>
			{children} {snackbars}
		</div>
	);
};

const mapStateToProps = (state) => ({
	queue: state.queue,
	snacks: state.snacks,
});

export default connect(mapStateToProps)(SnackbarProvider);
