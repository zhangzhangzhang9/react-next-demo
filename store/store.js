import { createStore,combineReducers,applyMiddleware} from 'redux';
import ReduxThank from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
const initialState = {
  count:0
};
const userInitialState = {
  username:'张'
}

const ADD = 'ADD';
function countReducer(state = initialState,action){
  console.log(state,action)
  switch (action.type) {
    case ADD:
      return {count :(state.count + action.num||1)}
    default:
      return state;
  }
};

const UPDATE_USERNAME = 'UPDATE_USERNAME';
function userReducer(state = userInitialState,action){
  console.log(state,action)
  switch (action.type) {
    case UPDATE_USERNAME:
      return {...state,username :action.name}
    default:
      return state;
  }
};
const AllReducers = combineReducers({
  count:countReducer,
  user:userReducer,
})

// action creatore
function add(num){
  return {
    type:"ADD",
    num
  }
}
function addSync(num){
  return dispatch => {
    setTimeout(()=> {
      dispatch(add(num))
    },2000)
  }
}
const store = createStore(
  AllReducers,
  {
  count:initialState,
  user:userInitialState
  },
  composeWithDevTools(applyMiddleware(ReduxThank))
);
console.log(store)
store.dispatch({type:UPDATE_USERNAME,name:'zhangzhang'})
store.subscribe(()=>{
  console.log('changed',store.getState())
})
store.dispatch(add(3))
store.dispatch(addSync(3))
export default store;