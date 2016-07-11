import './styles.less';
import React from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import { PORT, getAuthenticated, ajax } from '../../globals';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
		if (!getAuthenticated()){
			browserHistory.push('/login');
			return
		}
	}

  render() {
    return (
      <div className="dashboard-container">
        Dashboard
      </div>
    );
  }
}

export default Dashboard;
