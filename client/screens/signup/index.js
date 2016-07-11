import './styles.less';
import React from 'react';
import sha256 from 'sha256';
import Paper from 'material-ui/Paper';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import BasicFooter from '../../components/basic-footer';
import { BASE_URL, EMAIL_REGEX, ajax, getErrorMessage } from '../../globals';

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			'errorCode': '',
		}
	}

	onEnter = (e) => {
		if (e.keyCode == 13) { this.onSignup() }
	}

	onSignup = () => {
		let email = this.refs.email.getValue();
		if (EMAIL_REGEX.exec(email)) {
			this.setState({
				errorCode: '',
			})
			this._onSignup(
				this.refs.fname.getValue(),
				this.refs.lname.getValue(),
				email, 
				this.refs.password.getValue()); 
		} else {
			this.setState({
				errorCode: 'BAD_EMAIL_PROVIDED',
			})
		} 
	}

	_onSignup = (_fname, _lname, _email, _password) => {
		let url = BASE_URL + '/signup';
		let payload = {
			fname: _fname,
			lname: _lname,
			email: _email,
			password: sha256(_password),
		};

		ajax('POST', url, payload, this.completeSignup, this.completeSignup)
	}

	completeSignup = (data) => {
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
			<div className="signup-container">
				<div className="header-text">Company</div>
				<div className="header-detail">Sign up for an Company Account</div>
				<Paper className="signup-paper">
					<div className="signup-avatar">
						<img src="/assets/images/noProfile.png"/>
					</div>
					<TextField
						className="signup-fname"
						hintText="First Name"
						floatingLabelText="First Name"
						ref="fname"
						onKeyDown={this.onEnter}/>
					<TextField
						className="signup-lname"
						hintText="Last Name"
						floatingLabelText="Last Name"
						ref="lname"
						onKeyDown={this.onEnter}/>
					<TextField
						className="signup-email"
						hintText="Email Address"
						floatingLabelText="Email"
						ref="email"
						onKeyDown={this.onEnter}/>
					<TextField
						className="signup-password"
						hintText="Password"
						floatingLabelText="Password"
						type="password"
						ref="password"
						onKeyDown={this.onEnter}/>
					<RaisedButton 
						className="signup-button" 
						label="Sign Up" 
						secondary={true} 
						onClick={this.onSignup}/>
					<div className="signup-error"><span>{errorText}</span></div>
				</Paper>
				<BasicFooter threshold={821} height={40}/>
			</div>
		)
	}
};

export default Signup;