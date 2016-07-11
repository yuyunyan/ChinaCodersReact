import './styles.less';
import React from 'react';


class Wrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        {this.props.children}
      </div>
    );
  }
}

export default Wrapper;
