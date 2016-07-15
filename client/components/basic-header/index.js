import './styles.less';
import React from 'react';
import { Link } from 'react-router';

class BasicHeader extends React.Component {
   constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="basic-footer-container">
        <div>
          <Link to="/">About Company</Link>
          <Link to="/">Privacy</Link>
          <Link to="/">Terms</Link>
          <Link to="/">Help</Link>
        </div>
      </div>
    );
  }

}

export default BasicHeader;
