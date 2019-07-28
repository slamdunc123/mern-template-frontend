// import uuid from 'uuid';
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_ITEM,
  ITEMS_LOADING
} from '../actions/types';

const initialState = {
  items: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload] // if action.payload not first new item added to bottom of list until refresh browser
      };
    case UPDATE_ITEM:
      //   console.log(state.items);
      //   console.log(action.payload);

      state.items.map(item => {
        if (item._id === action.payload._id) {
          item.name = action.payload.name;
          return {
            ...state,
            items: [...state.items, action.payload]
          };
        } else return state;
      });

    //     state.items.map(item => {
    //     // console.log(item._id, item.name);
    //     // console.log(action.payload._id, action.payload.name);
    //     if (item._id === action.payload._id) {
    //       item.name = action.payload.name;
    //       console.log(item.name);
    //     }
    //     // return item;
    //     return {
    //       ...state,
    //       items: [...state.items, action.payload] // if ...state.items not first need to refresh browers for view to update
    //     };
    //   });
    //   break;

    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
