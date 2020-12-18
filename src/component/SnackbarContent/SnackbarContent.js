import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';

const styles = (theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			flexGrow: 1,
			[theme.breakpoints.up('sm')]: {
				flexGrow: 'initial',
				minWidth: 288,
			},
		},
	});
const SnackbarContent = forwardRef(({ classes, className, ...props }, ref) => (
	<div ref={ref} className={clsx(classes.root, className)} {...props} />
));

export default withStyles(styles)(SnackbarContent);
