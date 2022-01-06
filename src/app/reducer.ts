import { Action } from "./actions";

interface ClassesInterface {
  name: string;
  students: string[];
}

export interface AppState {
  classes: any;
  studentName: string;
  loading: boolean;
  error: boolean;
}

const initialState = {
  studentName: "",
  loading: false,
  classes: [],
  error: false,
};


export const reducer = (
  state: AppState = initialState,
  action: Action
): AppState => {
  switch (action.type) {
    case "ADD_STUDENT": {
      return { ...state, studentName: action.payload };
    }
    case "TOGGLE_LOADER": {
      return { ...state, loading: !state.loading };
    }
    case "ADD_CLASSES": {
      return {
        ...state,
        classes: [...state.classes, action.payload],
      };
    }
    case "LOGOUT": {
      return initialState;
    }

    case "ADD_ERROR":
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
