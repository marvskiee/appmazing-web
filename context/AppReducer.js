export const initialState = {
  user: {},
  isAuth: false,
  isLoading: false,
  status: 1,
  error: [],
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_DASHBOARD_STATUS": {
      return {
        ...state,
        status: action.value,
      };
    }
    case "REGISTER_SUCCESS": {
      return {
        ...state,
        error: [],
        isRegistered: true,
        isLoading: false,
      };
    }
    case "REGISTER_REQUEST":
    case "LOGIN_REQUEST":
    case "LOGOUT_REQUEST": {
      return {
        ...state,
        isLoading: true,
        error: [],
      };
    }
    case "LOGIN_SUCCESS": {
      localStorage.setItem("access_id", action.value._id);
      localStorage.setItem(
        "role",
        action.value.is_superadmin ? "superadmin" : "admin"
      );

      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: action.value,
        error: [],
      };
    }
    case "REGISTER_ERROR":
    case "LOGIN_ERROR": {
      return {
        ...state,
        error: action.value,
        isLoading: false,
      };
    }
    case "LOGOUT": {
      localStorage.removeItem("access_id");
      localStorage.removeItem("role");
      return {
        ...state,
        isAuth: false,
        user: {},
      };
    }
    case "SET_USER": {
      return {
        ...state,
        isAuth: true,
        user: action.value,
      };
    }
  }
};
