import { createMuiTheme } from '@material-ui/core/styles';

/**
 * @param px input px as per 1920 * 1080 resolution
 */
export const pxToRem = (px) => `${px / 22.5}rem`;

/**
 * @param px input px as per 1920 * 1080 resolution
 */
export const pxToVh = (px) => `${px * 0.09259}vh`;

export const pxToVh1974 = (px) => `${px * 0.10266940451}vh`;

/**
 * @param px input px as per 1920 * 930 resolution
 */
export const pxToVh930 = (value) => {
	const newValue = (value * 1080) / 930;
	return pxToVh(newValue);
};
/**
 * @param px input px as per 1920 * 1080 resolution
 */
export const pxToVw = (px) => `${px * 0.05208}vw`;

export default createMuiTheme({
	overrides: {
		MuiPaper: {
			rounded: {
				borderRadius: pxToRem(4),
			},
		},
		MuiIconButton: {
			root: {
				padding: pxToRem(12),
			},
		},
		MuiListItemIcon: {
			root: {
				marginRight: pxToRem(16),
			},
		},
		MuiListItem: {
			root: {
				paddingTop: pxToRem(11),
				paddingBottom: pxToRem(11),
			},
			gutters: {
				paddingLeft: pxToRem(16),
				paddingRight: pxToRem(16),
			},
			secondaryAction: {
				paddingRight: pxToRem(32),
			},
			dense: {
				paddingTop: pxToRem(8),
				paddingBottom: pxToRem(8),
			},
		},
		MuiList: {
			padding: {
				paddingTop: pxToRem(8),
				paddingBottom: pxToRem(8),
			},
		},
		MuiMenuItem: {
			root: {
				height: pxToRem(24),
			},
			gutters: {
				paddingLeft: pxToRem(16),
				paddingRight: pxToRem(16),
			},
		},
		MuiInputBase: {
			input: {
				fontSize: pxToRem(20),
				padding: `${pxToRem(6)} 0 ${pxToRem(7)}`,
			},
		},
		MuiExpansionPanel: {
			expanded: {
				margin: '0px',
			},
			rounded: {
				'&:last-child': {
					borderBottomLeftRadius: pxToRem(4),
					borderBottomRightRadius: pxToRem(4),
					borderTopLeftRadius: pxToRem(4),
					borderTopRightRadius: pxToRem(4),
				},
				'&:first-child': {
					borderBottomLeftRadius: pxToRem(4),
					borderBottomRightRadius: pxToRem(4),
					borderTopLeftRadius: pxToRem(4),
					borderTopRightRadius: pxToRem(4),
				},
			},
		},
		MuiExpansionPanelSummary: {
			root: {
				minHeight: pxToRem(48),
				'&$expanded': {
					minHeight: pxToRem(64),
				},
			},
			focused: {
				backgroundColor: 'rgba(255, 255, 255, 0.2) !important',
			},
			content: {
				'& > :last-child': {
					paddingRight: pxToRem(32),
				},
				'&$expanded': {
					margin: '0px',
				},
			},
			expandIcon: {
				right: pxToRem(8),
			},
		},
		MuiExpansionPanelDetails: {
			root: {
				padding: `${pxToRem(8)} ${pxToRem(24)} ${pxToRem(24)}`,
			},
		},

		MuiButton: {
			root: {
				minWidth: pxToRem(64),
				padding: `${pxToRem(6)} ${pxToRem(16)}`,
				borderRadius: pxToRem(4),
			},
			text: {
				padding: `${pxToRem(6)} ${pxToRem(8)}`,
			},
			sizeSmall: {
				padding: `${pxToRem(4)} ${pxToRem(8)}`,
				minWidth: pxToRem(64),
			},
			outlined: {
				border: `${pxToRem(1)} solid #3B607A`,
				padding: `${pxToRem(5)} ${pxToRem(16)}`,
			},
			outlinedSecondary: {
				border: `${pxToRem(1)} solid rgba(255,255,255,0.5)`,
				'&:hover': {
					border: `${pxToRem(1)} solid rgba(255,255,255,0.8)`,
				},
			},
		},
		MuiDialogTitle: {
			root: {
				padding: `${pxToRem(24)} ${pxToRem(24)} ${pxToRem(20)}`,
			},
		},
		MuiDialog: {
			paperWidthSm: {
				maxWidth: pxToRem(600),
			},
			paperScrollPaper: {
				maxHeight: `calc(100% - ${pxToRem(96)})`,
			},
		},
		MuiSvgIcon: {
			root: {
				fontSize: pxToRem(24),
			},
			fontSizeLarge: {
				fontSize: pxToRem(35),
			},
			fontSizeSmall: {
				fontSize: pxToRem(20),
			},
		},
		MuiSelect: {
			icon: {
				top: `calc(50% - ${pxToRem(12)})`,
			},
			select: {
				minWidth: pxToRem(16),
				paddingRight: pxToRem(32),
			},
		},
		MuiTableRow: {
			head: {
				height: pxToRem(56),
			},
		},
		MuiFab: {
			root: {
				minHeight: 'unset',
			},
			sizeSmall: {
				height: '1em',
				width: '1em',
				fontSize: '2rem',
			},
		},
		MuiSwitch: {
			root: {
				width: pxToRem(62),
			},
			icon: {
				width: pxToRem(20),
				height: pxToRem(20),
				boxShadow: `${pxToRem(0)} ${pxToRem(3)} ${pxToRem(6)}rgba(0,0,0,.20)`,
			},
			switchBase: {
				width: pxToRem(48),
				height: pxToRem(48),
			},
			bar: {
				width: pxToRem(34),
				height: pxToRem(14),
				marginTop: pxToRem(-7),
				marginLeft: pxToRem(-17),
				borderRadius: pxToRem(7),
			},
		},
		MuiFormControlLabel: {
			labelPlacementStart: {
				marginLeft: pxToRem(16),
				marginRight: pxToRem(-14),
			},
		},
		CustomSelect: {
			selectInputContainer: {
				margin: `${pxToRem(0)} ${pxToRem(0)} ${pxToRem(10)}  ${pxToRem(0)}`,
			},
		},
		MuiInput: {
			formControl: {
				'label + &': {
					marginTop: pxToRem(16),
				},
			},
			underline: {
				'&:before': {
					borderBottom: `${pxToRem(2)} solid #3B607A`,
				},
				'&:hover:before': {
					borderBottom: `${pxToRem(
						2
					)} solid rgba(93, 170, 224, 0.7) !important`,
				},
			},
		},
		MuiInputLabel: {
			formControl: {
				transform: `translate(0, ${pxToRem(24)}) scale(1)`,
			},
		},
		MuiTooltip: {
			tooltip: {
				fontSize: pxToRem(18),
				marginTop: '0.5vh !important',
				marginBottom: '0 !important',
				padding: '1vh !important',
				borderRadius: '1vh !important',
				marginLeft: '0.5vw !important',
				maxWidth: 'infinite',
			},
			touch: {
				fontSize: pxToRem(18),
			},
		},
		MuiTab: {
			root: {
				minWidth: 'unset !important',
			},
			textColorInherit: {
				color: '#FFFFFF',
			},
			selected: {
				color: '#5DAAE0',
			},
			labelContainer: {
				padding: `${pxToRem(6)} ${pxToRem(24)}`,
			},
			labelIcon: {
				minHeight: 'unset',
				paddingTop: pxToRem(9),
			},
		},
		MuiTabs: {
			root: {
				minHeight: 'unset',
				minWidth: 'unset',
				maxWidth: 'unset',
			},
		},
		MuiListItemText: {
			root: {
				padding: `0 ${pxToRem(16)}`,
			},
		},
		MuiGrid: {
			'spacing-xs-8': {
				'& > $item': {
					padding: `${pxToVh(4)} ${pxToVw(4)}`,
				},
				width: `calc(100% + ${pxToVw(8)})`,
				margin: `-${pxToRem(4)}`,
			},
			'spacing-xs-16': {
				'& > $item': {
					padding: `${pxToVh(8)} ${pxToVw(8)}`,
				},
				width: `calc(100% + ${pxToVw(16)})`,
				margin: `-${pxToRem(8)}`,
			},
		},
		MuiSnackbar: {
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
		},
		MuiSnackbarContent: {
			root: {
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
		},
	},
});
