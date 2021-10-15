import axios from "axios";

export const login = (email, password) => (dispatch) => {
  dispatch({
    type: "USER_LOGIN_REQUEST",
  });

  const config = {
    heaers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("/api/users/login", { email, password }, config)
    .then(({ data }) => {
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((error) => {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
};

export const register = (name ,email, password) => (dispatch) => {
  dispatch({
    type: "USER_REGISTER_REQUEST",
  });

  const config = {
    heaers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("/api/users", {name ,email, password }, config)
    .then(({ data }) => {
      dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: data,
      });

      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    })
    .catch((error) => {
      
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload: 
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};
