import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
	withStyles,
	createStyles,
	Theme,
	emphasize,
} from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
// import SnackbarContent from './SnackbarContent';
import {
	getTransitionDirection,
	omitNonCollapseKeys,
} from './SnackbarItem.util';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import {
	REASONS,
	SNACKBAR_INDENTS,
	objectMerge,
	DEFAULTS,
	transformer,
} from '../utils/constant';

import defaultIconVariants from '../utils/defaultIconVariants';
import createChainedFunction from '../utils/createChainedFunction';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { ReactComponent as Hourglass } from '../assets/svg/hourglass-start-solid.svg';
import { ReactComponent as DoneIcon } from '../assets/check-icon.svg';
import { ReactComponent as WarningIcon } from '../assets/error-snack.svg';
import { pxToRem } from '../utils/theme';

// import Snackbar from './Snackbar';

const styles = (theme) => {
	const mode = theme.palette.mode || theme.palette.type;
	const backgroundColor = emphasize(
		theme.palette.background.default,
		mode === 'light' ? 0.8 : 0.98
	);
	return createStyles({
		lessPadding: {
			paddingLeft: 8 * 2.5,
		},
		// variantSuccess: {
		// 	backgroundColor: '#43a047 !important', // green
		// 	color: '#fff !important',
		// },
		// variantError: {
		// 	backgroundColor: '#d32f2f !important', // dark red
		// 	color: '#fff !important',
		// },
		// variantInfo: {
		// 	backgroundColor: '#2196f3 !important', // nice blue
		// 	color: '#fff !important',
		// },
		// variantWarning: {
		// 	backgroundColor: '#ff9800 !important', // amber
		// 	color: '#fff !important',
		// },
		// contentRoot: {
		// 	backgroundColor,
		// 	color: theme.palette.getContrastText(backgroundColor),
		// 	alignItems: 'center',
		// 	padding: '6px 16px',
		// 	borderRadius: '4px',
		// 	boxShadow:
		// 		'0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
		// },
		// message: {
		// 	display: 'flex',
		// 	alignItems: 'center',
		// 	padding: '8px 0',
		// },
		// action: {
		// 	display: 'flex',
		// 	alignItems: 'center',
		// 	marginLeft: 'auto',
		// 	paddingLeft: 16,
		// 	marginRight: -8,
		// },
		wrappedRoot: {
			position: 'relative',
			transform: 'translateX(0)',
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
		collapseContainer: {
			[theme.breakpoints.down('xs')]: {
				paddingLeft: theme.spacing(1),
				paddingRight: theme.spacing(1),
			},
		},
		collapseWrapper: {
			transition: theme.transitions.create(['margin-bottom'], {
				easing: 'ease',
			}),
			marginTop: SNACKBAR_INDENTS.snackbar.default,
			marginBottom: SNACKBAR_INDENTS.snackbar.default,
		},
		collapseWrapperDense: {
			marginTop: SNACKBAR_INDENTS.snackbar.dense,
			marginBottom: SNACKBAR_INDENTS.snackbar.dense,
		},
		inProgress: {
			width: pxToRem(450),
			// backgroundColor: '#2196f3 !important', // nice blue
			// color: '#fff !important',
		},
		error: {
			backgroundColor: '#FFE5E5',
			width: pxToRem(555),
			backgroundColor: '#d32f2f !important', // dark red
			color: '#fff !important',
		},
		success: {
			width: pxToRem(555),
			// backgroundColor: '#43a047 !important', // green
			color: '#fff !important',
		},
		errorIcon: {
			width: pxToRem(24),
			height: pxToRem(24),
			height: pxToRem(24),
			paddingTop: '0.5rem',
		},
		icon: {
			marginRight: pxToRem(10),
			marginTop: 0,
		},
		inProgressIcon: {
			width: '0.9vw',
			height: '2vh',
			animation: '$spin 1.5s linear infinite forwards',
		},
		successIcon: {
			width: pxToRem(24),
			height: pxToRem(24),
			paddingTop: '0.3rem',
		},
		'@keyframes spin': {
			'0%,10%,20%': {
				transform: 'rotate(0deg)',
			},
			'50%,60%,70%': {
				transform: 'rotate(180deg)',
			},
			'100%': {
				transform: 'rotate(360deg)',
			},
		},
		loading: {
			content: '.',
			animation: '$dots 0.5s steps(5, end) infinite',
		},
		'@keyframes dots': {
			'0%': {},
			'20%': {
				color: 'rgba(0, 0, 0, 0)',
				textShadow: '0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0)',
			},
			'40%': {
				color: '#435368',
				textShadow: '0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0)',
			},
			'60%': {
				textShadow: '0.25em 0 0 #435368, 0.5em 0 0 rgba(0, 0, 0, 0)',
			},
			'80%': {},
			'100%': {
				textShadow: '0.25em 0 0 #435368, 0.5em 0 0 #435368',
			},
		},
		actionstyle: {
			alignItems: 'flex-start',
			paddingTop: '0.5rem',
		},
		mainContentHeader: { display: 'flex', alignItems: 'center' },
		nostyle: {},

		anchorOriginBottomLeft: {
			'@media (min-width: 600px)': {
				left: pxToRem(24),
				bottom: pxToRem(24),
			},
			left: pxToRem(24),
			bottom: pxToRem(24),
			right: 'auto',
		},
		root: { boxSizing: 'border-box' },
		snackbarContentRoot: {
			'@media (min-width: 600px)': {
				boxSizing: 'border-box',
				minWidth: pxToRem(450),
				maxWidth: pxToRem(568),
				borderRadius: pxToRem(8),
				flexWrap: 'nowrap',
				wordBreak: 'break-word',
			},
			backgroundColor: '#E5F3FF',
			minWidth: pxToRem(450),
			minHeight: pxToRem(70),
			padding: `${pxToRem(6)} ${pxToRem(24)} ${pxToRem(6)} ${pxToRem(24)}`,
			borderRadius: pxToRem(8),
			opacity: 1,
			flexWrap: 'nowrap',
			wordBreak: 'break-word',
			marginLeft: '3.85vw',
			marginBottom: '1.8vh',
			boxSizing: 'border-box',
		},
		action: {
			paddingLeft: pxToRem(24),
			marginRight: `-${pxToRem(8)}`,
			color: 'inherit',
		},
		message: {
			paddingTop: pxToRem(8),
			paddingBottom: pxToRem(5),
			color: '#435368',
			fontWeight: 'bold',
			fontSize: pxToRem(20),
		},
	});
};

const SnackbarComponent = React.forwardRef(({ classes, ...props }, ref) => {
	const getIconVariantObj = (getCurrSnack) => {
		switch (getCurrSnack?.variant) {
			case 'inProgress':
				return {
					class: classes.inProgressIcon,
					icon: Hourglass,
					actionStyle: classes.actionstyle,
				};
			case 'error':
				return {
					class: classes.errorIcon,
					icon: WarningIcon,
					actionStyle: classes.actionstyle,
				};
			case 'success':
				return {
					class: classes.successIcon,
					icon: DoneIcon,
					actionStyle: classes.actionstyle,
				};
			default:
				return {
					class: classes.nostyle,
					icon: null,
					actionStyle: classes.nostyle,
				};
		}
	};
	const timeout = useRef();
	const [collapsed, setCollapsed] = useState(true);

	useEffect(
		() => () => {
			if (timeout.current) {
				clearTimeout(timeout.current);
			}
		},
		[]
	);

	const handleClose = createChainedFunction(
		[props.snack.onClose, props.onClose],
		props.snack.key
	);

	const handleEntered = () => {
		if (props.snack.requestClose) {
			handleClose(null, REASONS.INSTRCUTED);
		}
	};

	const handleExitedScreen = () => {
		timeout.current = setTimeout(() => {
			setCollapsed(!collapsed);
		}, 125);
	};

	const {
		style,
		dense,
		ariaAttributes: otherAriaAttributes,
		className: otherClassName,
		hideIconVariant,
		iconVariant,
		snack,
		action: otherAction,
		content: otherContent,
		TransitionComponent: otherTranComponent,
		TransitionProps: otherTranProps,
		transitionDuration: otherTranDuration,
		onEnter: ignoredOnEnter,
		onEntered: ignoredOnEntered,
		onEntering: ignoredOnEntering,
		onExit: ignoredOnExit,
		onExited: ignoredOnExited,
		onExiting: ignoredOnExiting,
		...other
	} = props;

	const {
		persist,
		key,
		open,
		entered,
		requestClose,
		className: singleClassName,
		variant,
		content: singleContent,
		action: singleAction,
		ariaAttributes: singleAriaAttributes,
		anchorOrigin = DEFAULTS.anchorOrigin,
		message: snackMessage,
		TransitionComponent: singleTranComponent,
		TransitionProps: singleTranProps,
		transitionDuration: singleTranDuration,
		onEnter,
		onEntered,
		onEntering,
		onExit,
		onExited,
		onExiting,
		...singleSnackProps
	} = snack;

	// const icon = {
	// 	...defaultIconVariants,
	// 	...iconVariant,
	// }[variant];

	const ariaAttributes = {
		'aria-describedby': 'notistack-snackbar',
		...objectMerge(singleAriaAttributes, otherAriaAttributes),
	};

	const TransitionComponent = DEFAULTS.TransitionComponent;
	const transitionDuration = objectMerge(
		singleTranDuration,
		otherTranDuration,
		DEFAULTS.transitionDuration
	);
	const transitionProps = {
		direction: getTransitionDirection(anchorOrigin),
		...objectMerge(singleTranProps, otherTranProps),
	};
	console.log('TRANSITION PROPS', transitionProps);

	let action = singleAction || otherAction;
	if (typeof action === 'function') {
		action = action(key);
	}

	let content = singleContent || otherContent;
	if (typeof content === 'function') {
		content = content(key, snack.message);
	}

	const callbacks = [
		'onEnter',
		'onEntering',
		'onEntered',
		'onExit',
		'onExiting',
		'onExited',
	].reduce(
		(acc, cbName) => ({
			...acc,
			[cbName]: createChainedFunction(
				[props.snack[cbName], props[cbName]],
				props.snack.key
			),
		}),
		{}
	);

	const variantObj = getIconVariantObj(snack);
	const Icon = variantObj?.icon;
	const modifiedCurrSnack = {
		message: snack?.message?.header ? (
			<>
				<div className={classes.mainContentHeader}>
					<Icon className={clsx(classes.icon, variantObj.class)} />
					{snack?.message?.header}
				</div>
				{snack?.message?.content || null}
			</>
		) : (
			snack?.message
		),
	};
	const duration = snack.autoHideDuration === null ? undefined : 5000;
	console.log('CURR', snack, snack.autoHideDuration);
	return (
		<Collapse
			unmountOnExit
			timeout={175}
			in={collapsed}
			classes={omitNonCollapseKeys(classes, dense)}
			onExited={callbacks.onExited}
		>
			{/* @ts-ignore */}
			<Snackbar
				{...other}
				{...singleSnackProps}
				open={open}
				className={clsx(
					classes.wrappedRoot,
					classes[transformer.toAnchorOrigin(anchorOrigin)]
				)}
				onClose={handleClose}
				key={snack?.key}
				autoHideDuration={duration}
				classes={{
					anchorOriginBottomLeft: classes.anchorOriginBottomLeft,
					root: classes.root,
				}}
			>
				{/* @ts-ignore */}
				<TransitionComponent
					appear
					in={open}
					timeout={transitionDuration}
					{...transitionProps}
					onExit={callbacks.onExit}
					onExiting={callbacks.onExiting}
					onExited={handleExitedScreen}
					onEnter={callbacks.onEnter}
					onEntering={callbacks.onEntering}
					// order matters. first callbacks.onEntered to set entered: true,
					// then handleEntered to check if there's a request for closing
					onEntered={() => {
						callbacks.onEntered(key);
						handleEntered();
					}}
				>
					{/* @ts-ignore */}
					{content || (
						<SnackbarContent
							ref={ref}
							{...ariaAttributes}
							role="alert"
							style={style}
							// className={clsx(
							// 	classes.contentRoot,
							// 	{ [classes.lessPadding]: !hideIconVariant && icon },
							// 	classes[transformer.toVariant(variant)],
							// 	otherClassName,
							// 	singleClassName
							// )}
							classes={{
								root: classes.snackbarContentRoot,
								action: classes.action,
								message: classes.message,
							}}
							action={
								<IconButton
									aria-label="close"
									color="#000000"
									onClick={handleClose}
								>
									{snack?.variant === 'inProgress' || <CloseIcon />}
								</IconButton>
							}
							className={clsx(
								classes[snack?.variant],
								variantObj?.actionStyle,
								classes[transformer.toVariant(variant)]
							)}
							{...modifiedCurrSnack}
						/>
					)}
				</TransitionComponent>
			</Snackbar>
		</Collapse>
	);
});

export default withStyles(styles)(SnackbarComponent);
