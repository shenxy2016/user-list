import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
    userInfo: {
        firstName: "",
        lastName: "",
        gender: "",
        age: "",
        password: "",
        repeat: ""
    },
    currentId:"",
    userList: [],                    
    page: 0,
    redirect: false,
}

export const store = createStore(
    updateReducer,
    initialState,
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension()
);

//reducer
function updateReducer(state, action) {
    switch (action.type) {
        case 'FETCH_DATA':
            return { ...state, userList: action.payload };
        case 'ADD_PAGE':
            if (state.page * 5 + 5 >= state.userList.length) {
                return state;
            } else {
                return { ...state, page: state.page + 1 }

            }
        case 'MINUS_PAGE':
            if (state.page === 0) {
                return state;
            } else {
                return { ...state, page: state.page - 1 }
            }
        case 'SET_USER_INFO':
            return {...state, userInfo: action.payload}
        case 'DIRECT':
            return {...state, redirect:action.payload}

        default:
            return state;
    }
}


//action
export function fetchData(data) {
    return {
        type: 'FETCH_DATA',
        payload: data,
    }
}

export function setUserInfo(userInfo){
    return {
        type: 'SET_USER_INFO',
        payload: userInfo,
    }
}

export function addPage(){
    return{
        type: 'ADD_PAGE'
    }
}
export function minusPage(){
    return{
        type: 'MINUS_PAGE'
    }
}
export function changeDirect(flag){
    return{
        type:'DIRECT',
        payload:flag
    }
}

//thunk 
export function fetchDataFromApi(url) {
    return (dispatch) => {
        axios.get(url)
            .then((response) => {
                console.log("Data Fatched");
                dispatch(fetchData(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export function deleteUserFromApi(id){
    return(dispatch) => {
        axios.delete(`/api/user/${id}`)
            .then((response) => {
                console.log("User Data Deleted");
            })
            .catch(function (error) {
                console.log(error);
        })
    }
}

export function addUserFromApi(url, userInfo){
    const {firstName, lastName, age, gender, password, repeat} = userInfo;
    if(!firstName || !lastName || !age || !gender || !password) {
        alert("Please fill all the fields.");
        return;
    }

    if(password !== repeat) {
        alert("Password not match");
        return;
    }
    return(dispatch) => {
        axios.post(url, userInfo)
            .then((response) => {          
                console.log("User has been added");
                console.log(userInfo);
                console.log(url)
            })
            .catch(function (error) {
                console.log(error);
        })
    }
}

export function editUserFromApi(url, userInfo){
    return(dispatch) => {
        axios.put(url, userInfo)
            .then((response) => {          
                console.log("User has been edited");
                console.log(url)
                console.log(userInfo);
            })
            .catch(function (error) {
                console.log(error);
        })
    }
}



export default updateReducer;