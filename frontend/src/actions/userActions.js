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
