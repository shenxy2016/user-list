import React, {Component} from 'react';
// import axios from 'axios';
import {NavLink} from 'react-router-dom';
import {addPage, minusPage, fetchDataFromApi, deleteUserFromApi} from './reducer'
import { connect } from 'react-redux';

class Home extends Component{
    componentDidMount() {
        this.props.fetchDataFromApi('/api/user');
    }

   

 render(){
    const currentPage = this.props.page;

    const currentContent = this.props.userList.slice(currentPage * 5, currentPage * 5 + 5);
     return(
         <div>
             <h1>Users</h1>
             <table>
                    <thead>
                        <tr>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Sex</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        currentContent.map((item, index) =>
                            <tr key={index}>
                                <td><button><NavLink to={`/editUser/${item._id}`} >Edit</NavLink></button></td>
                                <td><button onClick={() => {this.props.deleteUserFromApi(item._id);this.props.fetchDataFromApi('/api/user');}}>Delete</button></td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.gender}</td>
                                <td>{item.age}</td>
                            </tr>)
                    }
                    </tbody>
                    </table>
                    <button onClick={this.props.minusPage}>Prev Page</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={this.props.addPage}>Next Page</button>
                    <div>{currentPage + 1}</div>
                    <NavLink to='/createUser'>Create New User</NavLink>
                    

         </div>
     );
 }   
}
const mapStateToProps = state => ({
    userInfo: state.userInfo,
    userList: state.userList,
    page: state.page
});

const mapDispatchToProps = dispatch => {
    return({
        addPage: () =>{
            dispatch(addPage());
        },
        minusPage: () => {
            dispatch(minusPage());
        },
        fetchDataFromApi: (url) => {
            dispatch(fetchDataFromApi(url));
        },
        deleteUserFromApi: (id)=>{
            dispatch(deleteUserFromApi(id));
        }
        
    });
}



export default connect(mapStateToProps, mapDispatchToProps) (Home);


