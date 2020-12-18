import Slide from '@material-ui/core/Slide';
import { SnackbarClassKey } from '@material-ui/core/Snackbar';
import {
	CloseReason,
	ContainerClassKey,
	SnackbarProviderProps,
	VariantType,
	SnackbarOrigin,
	VariantClassKey,
} from '../index';
import { SnackbarItemProps } from '../component/SnackbarComponent';
import { Snack } from '../component/SnackbarProvider';

export const MESSAGES = {
	NO_PERSIST_ALL:
		"WARNING - notistack: Reached maxSnack while all enqueued snackbars have 'persist' flag. Notistack will dismiss the oldest snackbar anyway to allow other ones in the queue to be presented.",
};

export const SNACKBAR_INDENTS = {
	view: { default: 20, dense: 4 },
	snackbar: { default: 6, dense: 2 },
};

export const DEFAULTS = {
	maxSnack: 3,
	dense: false,
	hideIconVariant: false,
	variant: 'default',
	anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
	TransitionComponent: Slide,
	transitionDuration: {
		enter: 225,
		exit: 195,
	},
};

export const capitalise = (text) =>
	text.charAt(0).toUpperCase() + text.slice(1);

export const originKeyExtractor = (anchor) =>
	`${capitalise(anchor.vertical)}${capitalise(anchor.horizontal)}`;

/**
 * Omit SnackbarContainer class keys that are not needed for SnackbarComponent
 */
// export const omitContainerKeys = (classes) =>
// 	// @ts-ignore
// 	Object.keys(classes)
// 	.reduce((obj, key) => ({ ...obj, [key]: classes[key] }), {});

export const REASONS = {
	TIMEOUT: 'timeout',
	CLICKAWAY: 'clickaway',
	MAXSNACK: 'maxsnack',
	INSTRUCTED: 'instructed',
};

/** Tranforms classes name */
export const transformer = {
	toContainerAnchorOrigin: (origin) => `anchorOrigin${origin}`,
	toAnchorOrigin: ({ vertical, horizontal }) =>
		`anchorOrigin${capitalise(vertical)}${capitalise(horizontal)}`,
	toVariant: (variant) => `variant${capitalise(variant)}`,
};

export const isDefined = (value) => !!value || value === 0;

const numberOrNull = (numberish) =>
	typeof numberish === 'number' || numberish === null;

// @ts-ignore
export const merge = (options, props, defaults, name) => {
	if (name === 'autoHideDuration') {
		if (numberOrNull(options.autoHideDuration)) return options.autoHideDuration;
		if (numberOrNull(props.autoHideDuration)) return props.autoHideDuration;
		return DEFAULTS.autoHideDuration;
	}

	return options[name] || props[name] || defaults[name];
};

export function objectMerge(options = {}, props = {}, defaults = {}) {
	return {
		...defaults,
		...props,
		...options,
	};
}
