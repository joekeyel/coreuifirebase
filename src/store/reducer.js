

const initialState = {
    user:{}

};


const reducer = (state=initialState, action) => {
    const newState = {...state};

    switch(action.type){

            case 'FETCH_DATA_USER': 

            newState.user = action.value;
            
            break;
        
        
    }
    return newState;
};

export default reducer;