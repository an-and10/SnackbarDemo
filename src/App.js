import './App.css';
import Notifier from './component/Notifier';
import { useDispatch } from 'react-redux';
import { Typography, Button, MuiThemeProvider } from '@material-ui/core';
import {
	pushNewSnackbar as pushNewSnackbarAction,
	closeSnackbar as closeSnackbarAction,
} from './action';
import theme from './utils/theme';

function App() {
	const dispatch = useDispatch();
	const pushNewSnackbar = (args) => dispatch(pushNewSnackbarAction(args));
	const closeSnackbar = (args) => dispatch(closeSnackbarAction(args));

	const handleClickProgress = () => {
		// NOTE:
		// if you want to be able to dispatch a `closeSnackbar` action later on,
		// you SHOULD pass your own `key` in the options. `key` can be any sequence
		// of number or characters, but it has to be unique for a given snackbar.
		const key = new Date().getTime() + Math.random();
		pushNewSnackbar({
			message: {
				header: (
					<Typography variant="body1">Prefered Successfully Added</Typography>
				),
			},
			options: {
				key,
				variant: 'inProgress',
			},
		});
	};

	const handleClickSent = () => {
		const key = new Date().getTime() + Math.random();
		pushNewSnackbar({
			message: {
				header: (
					<Typography variant="body1">Prefered Successfully Added</Typography>
				),
				content: 'Checking the Update contact | Anand Maurya',
			},
			options: {
				key,
				variant: 'success',
				// action: (key) => (
				// 	<Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
				// ),
			},
		});
	};

	const handleDefault = () => {
		const key = new Date().getTime() + Math.random();
		pushNewSnackbar({
			message: 'Preference Updated Successfully',
		});
	};
	const handleDismissAll = () => {
		closeSnackbar(undefined);
	};
	return (
		<MuiThemeProvider theme={theme}>
			<div className="App">
				<Notifier />
				<Typography variant="h4" gutterBottom>
					Notistack redux example
				</Typography>
				<Button variant="outlined" onClick={handleDefault} primary>
					Default Message
				</Button>
				<Button variant="outlined" onClick={handleClickProgress} primary>
					Email IN Progress
				</Button>
				<Button variant="outlined" onClick={handleClickSent} primary>
					Email Sent Successfully
				</Button>
				<Button variant="outlined" onClick={handleDismissAll}>
					Pop All Snackbar
				</Button>
			</div>
		</MuiThemeProvider>
	);
}

export default App;
