import './styles.less';
import React from 'react';
import sha256 from 'sha256';
import Paper from 'material-ui/Paper';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import BasicFooter from '../../components/basic-footer';
import { BASE_URL, EMAIL_REGEX, ajax, getErrorMessage } from '../../globals';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'errorCode': '',
		}
	}

	onEnter = (e) => {
		if (e.keyCode == 13) { this.onLogin() }
	}

	onLogin = () => {
		let email = this.refs.email.getValue();
		if (EMAIL_REGEX.exec(email)) {
			this.setState({
				errorCode: '',
			})
			this._onLogin(
				email, 
				this.refs.password.getValue()); 
		} else {
			this.setState({
				errorCode: 'BAD_EMAIL_PROVIDED',
			})
		} 
	}

	_onLogin = (_email, _password) => {
		let url = BASE_URL + '/login';
		let payload = {
			email: _email,
			password: sha256(_password),
		};

		ajax('POST', url, payload, this.completeLogin, this.completeLogin)
	}

	completeLogin = (data) => {
		if (data.success) {
			this.setState({
				errorCode: '',
			})
			browserHistory.push('/dashboard');
		}
		else {
			this.setState({
				errorCode: data.error ? data.error : 'NOT_CONNECT_TO_SERVER',
			})
		}
	}

	render() {
		let errorText = getErrorMessage(this.state.errorCode);
		return(
			<div className="login-container">
				<div className="header-text">Company</div>
				<div className="header-detail">Sign in with your Company Account</div>
				<Paper className="login-paper">
					<div className="login-avatar">
						<img src="/assets/images/noProfile.png"/>
					</div>
					<TextField
						className="login-email"
						hintText="Email Address"
						floatingLabelText="Email"
						ref="email"
						onKeyDown={this.onEnter}/>
					<TextField
						className="login-password"
						hintText="Password"
						floatingLabelText="Password"
						type="password"
						ref="password"
						onKeyDown={this.onEnter}/>
					<RaisedButton 
						className="login-signin" 
						label="Sign In" 
						secondary={true} 
						onClick={this.onLogin}/>
					<div className="login-error"><span>{errorText}</span></div>
				</Paper>
				<BasicFooter/>
			</div>
		)
	}
};

export default Login;