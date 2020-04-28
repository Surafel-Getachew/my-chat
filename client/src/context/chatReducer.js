import {
  SET_CURRENT_MESSAGE,
  SET_CURRENT_GROUP,
  SET_RECIVED_MESSAGE,
  CREATE_ROOM,
  LOAD_ROOMS,
  LOAD_ROOMS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_CURRENT_MESSAGE:
      return {
        ...state,
        currentMessage: action.payload,
      };
    case CREATE_ROOM:
      return {
        ...state,
        room:[...state.room,action.payload]
      }
    case LOAD_ROOMS:{
      return {
        ...state,
        room:action.payload
      }
    }    
    case SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.payload,
      };
    case SET_RECIVED_MESSAGE:
      return {
        ...state,
        recivedMessage: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
