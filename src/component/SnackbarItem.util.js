import clsx from 'clsx';

const DIRECTION = {
	right: 'left',
	left: 'right',
	bottom: 'up',
	top: 'down',
};
// export type DirectionType = typeof DIRECTION[keyof typeof DIRECTION]

export const getTransitionDirection = (anchorOrigin) => {
	if (anchorOrigin.horizontal !== 'center') {
		return DIRECTION[anchorOrigin.horizontal];
	}
	return DIRECTION[anchorOrigin.vertical];
};

/**
 * Omit all class keys except what we need for collapse component
 */
export const omitNonCollapseKeys = (classes, dense) => ({
	container: classes.collapseContainer,
	wrapper: clsx(classes.collapseWrapper, {
		[classes.collapseWrapperDense]: dense,
	}),
});
