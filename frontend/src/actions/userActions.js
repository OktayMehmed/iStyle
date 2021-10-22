import axios from "axios";

export const login = (email, password) => (dispatch) => {
  dispatch({
    type: "USER_LOGIN_REQUEST",
  });

  const config = {
    headers: {
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
  dispatch({ type: "USER_DETAILS_RESET" });
  dispatch({ type: "ORDER_MY_LIST_RESET" });
  dispatch({ type: "CART_RESET" });
};

export const register = (name, email, password) => (dispatch) => {
  dispatch({
    type: "USER_REGISTER_REQUEST",
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("/api/users", { name, email, password }, config)
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

export const getUserDetails = (id) => (dispatch, getState) => {
  dispatch({
    type: "USER_DETAILS_REQUEST",
  });

  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  axios
    .get(`/api/users/${id}`, config)
    .then(({ data }) => {
      dispatch({
        type: "USER_DETAILS_SUCCESS",
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "USER_DETAILS_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const updateProfile = (user) => (dispatch, getState) => {
  dispatch({
    type: "USER_UPDATE_PROFILE_REQUEST",
  });

  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  axios
    .put("/api/users/profile", user, config)
    .then(({ data }) => {
      dispatch({
        type: "USER_UPDATE_PROFILE_SUCCESS",
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "USER_UPDATE_PROFILE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};
