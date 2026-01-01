
const initialStateReducers = {
    user:{user: null},
    questions: {questions : []}
}


const combineReducers = (reducers) =>{

    return ( state = {}, action)=>{
        const newState = {};
        Object.keys(reducers).forEach(key=>{
            newState[key] = reducers[key](state[key], action);
        });
        return newState;
    }

}

const rootReducers = combineReducers({
    user:null,// userReducer,
    questons: [],//userQuestion   
})
