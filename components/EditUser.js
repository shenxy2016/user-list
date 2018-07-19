import React, { Component } from 'react';
// import axios from "axios/index";
import { Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import { editUserFromApi ,setUserInfo, fetchDataFromApi,changeDirect} from './reducer';

class EditUser extends Component {
    
    componentDidMount() {
        console.log(this.props.redirect);
    }
    render() {
        const url = '/api/user/'+this.props.url.split('/')[2];
        if(!this.props.redirect){
            return (
            
                <div>
                    <h1>Edit User: </h1>
                    <form onSubmit = {e=>{this.props.editUserFromApi(`${url}`,this.props.userInfo);this.props.changeDirect(true);}}>
                        <label>FirstName:</label>
                        <input
                            type="text"
                            id="firstname"
                            value={this.props.userInfo.firstName}
                            onChange={(event) => {
                                this.props.setUserInfo({...this.props.userInfo, firstName: event.target.value})} }/><br/>
                        <label>LastName:</label>
                        <input
                            type="text"
                            value={this.props.userInfo.lastName}
                            onChange={(event) => {
                                this.props.setUserInfo({...this.props.userInfo, lastName: event.target.value})} }/>
                                <br />
                        <label>Sex:</label>
                        <input
                            type="text"
                            value={this.props.userInfo.gender}
                            onChange={(event) => {
                                this.props.setUserInfo({...this.props.userInfo, gender: event.target.value})} }/><br />
                        <label>Age:</label>
                        <input
                            type="text"
                            value={this.props.userInfo.age}
                            onChange={(event) => {
                                this.props.setUserInfo({...this.props.userInfo, age: event.target.value})} }/>
                        <br />
                        <label>Password:</label>
                        <input
                            type="password"
                            value={this.props.userInfo.password}
                            onChange={(event) => {
                                this.props.setUserInfo({...this.props.userInfo, password: event.target.value})} }/>
                        <br />
                        <label>Repeat:</label>
                        <input
                            type="password"
                            value={this.props.userInfo.repeat}
                            onChange={(event) => {
                                this.props.setUserInfo({...this.props.userInfo, repeat: event.target.value})} }/>
                            <br />
                        <button type="submit">Save</button>
                    </form>
                </div>
            )
        }else{
            this.props.changeDirect(false);
            return(
                
                <Redirect to='/' />

            )
        }   
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo,
    userList: state.userList,
    redirect: state.redirect
});

const mapDispatchToProps = dispatch => {
    return({ 
        changeDirect:(flag)=>{
            dispatch(changeDirect(flag))
        },
        setUserInfo: (userInfo) =>{
            dispatch(setUserInfo(userInfo))
        },
        editUserFromApi: (url, userInfo)=>{
            dispatch(editUserFromApi(url, userInfo));
        },
        fetchDataFromApi: (url) => {
            dispatch(fetchDataFromApi(url));
        },
    });
}



export default connect(mapStateToProps, mapDispatchToProps) (EditUser);



