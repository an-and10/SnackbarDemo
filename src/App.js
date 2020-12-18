import './App.css';
import Notifier from './component/Notifier';
import { useDispatch } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import {
	pushNewSnackbar as pushNewSnackbarAction,
	closeSnackbar as closeSnackbarAction,
} from './action';

function App() {
	const dispatch = useDispatch();
	const pushNewSnackbar = (args) => dispatch(pushNewSnackbarAction(args));
	const closeSnackbar = (args) => dispatch(closeSnackbarAction(args));

	const handleClick = () => {
		// NOTE:
		// if you want to be able to dispatch a `closeSnackbar` action later on,
		// you SHOULD pass your own `key` in the options. `key` can be any sequence
		// of number or characters, but it has to be unique for a given snackbar.
		const key = new Date().getTime() + Math.random();
		pushNewSnackbar({
			message: { header: 'Failed fetching data.' },
			options: {
				key,
				variant: 'success',
				action: (key) => (
					<Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
				),
			},
		});
	};

	const handleDismissAll = () => {
		closeSnackbar(undefined);
	};
	return (
		<div className="App">
			<Notifier />
			<Typography variant="h4" gutterBottom>
				Notistack redux example
			</Typography>

			<Button variant="outlined" onClick={handleClick} primary>
				Display snackbar
			</Button>
			<Button variant="outlined" onClick={handleDismissAll}>
				Pop All Snackbar
			</Button>
		</div>
	);
}

export default App;
