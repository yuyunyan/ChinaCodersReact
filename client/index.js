import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Login from './screens/login/';
import Signup from './screens/signup/';
import Wrapper from './components/wrapper/';
import Dashboard from './screens/dashboard/';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {lightBlue500, deepOrange500} from 'material-ui/styles/colors';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import Hello from './screens/hello/';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: lightBlue500,
    accent1Color: deepOrange500,
  },
});


class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
            <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
                <Route path="/" component={Wrapper}>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/hello" component={Hello}/>




                    <IndexRedirect to="/login" />
                </Route>
            </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
