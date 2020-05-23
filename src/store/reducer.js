

const initialState = {
    user:{},
    badge:{},
    items1:[]

};


const reducer = (state=initialState, action) => {
    const newState = {...state};

    switch(action.type){

            case 'FETCH_DATA_USER': 

            newState.user = action.value;
            
            break;

            case 'FETCH_BADGE_USER': 

            newState.badge = action.value;
            newState.items1 = action.value.Items1
            
            break;
        
        
    }
    return newState;
};

export default reducer;