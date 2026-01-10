
export const initialStateQuestion ={
    categorySelect:[],
    lesson:[]
}


export const questionReducer = (state = initialStateQuestion, action) => {
    switch (action.type) {
        case 'ADD_QUESTION_SELECT':
            return {...state, categorySelect: [...state.categorySelect, action.payload]}
    
        case 'REMOVE_QUESTION_SELECT':
            const newState =  state.categorySelect.filter(item => item  !== action.payload )
            return {...state, categorySelect: [...newState]}


        case 'ADD_LESSON':
            return {...state, lesson:  [...action.payload]}
    
    
        default:
            return state;
    }

}
