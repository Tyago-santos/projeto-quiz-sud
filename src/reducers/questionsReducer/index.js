
export const initialStateQuestio ={
    questions:[]
}


export const questionReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_QUESTION':
            return {...state, questions: [...state.questions, action.payload]}
    
        default:
            return state;
    }

}
