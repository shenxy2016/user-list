import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import CreateUser from './components/CreateUser'
import Home from './components/Home'
import EditUser from './components/EditUser'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Route exact={true} path ="/" render={()=><Home />}/>
            <Route exact={true} path ="/createUser" render={()=><CreateUser />}/>
            <Route exact={true} path ="/editUser/:id" render={(props)=><EditUser url={props.match.url}/>}/>
        </div>
    </BrowserRouter>
    
    );
  }
}

export default App;
