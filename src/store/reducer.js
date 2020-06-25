
const initialState = {
    user:{},
    badge:{},
    items1:[],
    rack:{},
    rackID:[],
    site:{},
    location:{},
    bandwidth:{},
    port:{},

};


const reducer = (state=initialState, action) => {
    const newState = {...state};

    switch(action.type){

            case 'FETCH_DATA_USER': 

            newState.user = action.value;
            
            break;

            // case 'FETCH_BADGE_USER': 

            // newState.badge = action.value;
            // newState.items1 = action.value.Items1
            
            // break;

            case 'FETCH_DATA_RACK': 

            newState.rack = action.value;
            newState.rackID = action.value.RACK_ID

            break;

            case 'FETCH_DATA_DCSITE': 

            newState.site = action.value;
           
            break;

            case 'FETCH_DATA_DCLOCATION': 

            newState.location = action.value;
           
            break;
            
            case 'FETCH_DATA_BANDWIDTH': 

            newState.bandwidth = action.value;
           
            break;

            case 'FETCH_DATA_PORT': 

            newState.port = action.value;
            
            break;

         
        
    }
    return newState;
};

export default reducer;