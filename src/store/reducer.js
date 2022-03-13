import ACTIONS from '../actions/action'

const newsDataReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.CALL_API: {
            return {
                ...state,
                loading: true,
            };
        }
        case ACTIONS.SUCCESS: {
            return {
                ...state,
                loading: false,
                newsData: action.data,
            };
        }
        case ACTIONS.SETNEWSTYPE: {
            return {
                ...state,
                newsDataType: action.data,
            };
        }
        case ACTIONS.ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }
    }
  };

  export default newsDataReducer