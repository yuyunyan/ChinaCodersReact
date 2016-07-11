import './styles.less';
import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid,Row,Col} from 'react-bootstrap';

const someData = [
  {'name':'john'},
  {'name':'ruam'},
  {'name':'ryan'},
  {'name':'razzle'},
  {'name':'dazzle'},
  {'name':'fizzle'},
  {'name':'pop'},
  {'name':'pop'},
  {'name':'pop'},
  {'name':'pop'},
  {'name':'pop'},
  {'name':'pop'},
  {'name':'pop'},
  {'name':'pop'},
  {'name':'pop'},
]

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    name:'',
    nameArr: someData,
  }
  }

  onUpdateName = () => {
    let name = this.refs.name.getValue();

    this.setState({
      'name': name,
    })
  }

  // () => {}    function() {}

  onSubmit = () => {
   console.log("CLICKEDDDDDDD");

   let email = this.refs.email.getValue();
   let password = this.refs.password.getValue();
 // TODO: valation 

   console.log(email, password)

   let url = "http://192.168.1.7:8111/login"
   let method = "POST"
   let payload = {
     'email': email,
     'password': password,

   }
   
   let request = new Request(url, {
     method: method,
     mode: 'cors',
     body: JSON.stringify(payload)
   });

   fetch(request)
     .then((response) => { return response.json()})
     .then(this.onSuccess)
     .catch(this.onError)
 }

 onSuccess = (e) => {
   console.log(e,"success message")
 }
 onError = (e) => {
   console.log(e)
 }


  render() {
     console.log(this.state.nameArr)
    return (
      <div className="hello-container">
        Hello Julia

       
       <Grid>
       <Row className="show-grid">
       <Col md={2}/>
       <Col md={8}>
         <Paper className="login-paper" zDepth={3} >
          <h3> My Name: {this.state.name} </h3>

          <img src="http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-hi.png"/>
          <TextField  className="name" ref="name"
            hintText="Name"
            />
             <RaisedButton className="update-btn" label="Update" primary={true} onClick={this.onUpdateName}/>
          <TextField  className="email"  ref="email"
            hintText="Email"
            />
          <TextField  className="passord"  ref="password"
            hintText="Password Field"
            floatingLabelText="Password"
            type="password"
            />
           
          <RaisedButton className="submit-btn" label="Submit" secondary={true} onClick={this.onSubmit}/>
        </Paper>

       </Col>
       <Col md={2}/>
       </Row>
       </Grid>
       // This where you render the data
    {this.state.nameArr.map((val, ind) => {return(
            <div className="cool-text" key={ind}>{val.name}</div>
          )})}

      </div>
    );
  }
}

export default Hello;
