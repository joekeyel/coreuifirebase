
const initialState = {
    
    bandwidth:{},
    port:{},

};


const ntw_reducer = (state=initialState, action) => {
    const newState = {...state};

    switch(action.type){

            case 'FETCH_DATA_BANDWIDTH': 

            newState.bandwidth = action.value;
           
            break;

            case 'FETCH_DATA_PORT': 

            newState.port = action.value;
            
            break;

            
        
        
    }
    return newState;
};

export default ntw_reducer;