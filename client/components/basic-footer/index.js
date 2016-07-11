import './styles.less';
import React from 'react';
import { Link } from 'react-router';

class BasicFooter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: this.getPosition(),
    }
  }

  getPosition = () => {
    return window.innerHeight > this.props.threshold + this.props.height ? 'absolute' : 'relative'
  }

  handleResize = (e) => {
    this.setState({position: this.getPosition()})
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    return (
      <div style={{position:this.state.position, height:this.props.height}} className="basic-footer-container">
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

BasicFooter.defaultProps = {
  threshold: 677,
  height: 40,
}

export default BasicFooter;
