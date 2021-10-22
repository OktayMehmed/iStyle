import axios from "axios";

export const createOrder = (order) => (dispatch, getState) => {
  dispatch({
    type: "ORDER_CREATE_REQUEST",
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
    .post(`/api/orders`, order, config)
    .then(({ data }) => {
      dispatch({
        type: "ORDER_CREATE_SUCCESS",
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "ORDER_CREATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const getOrderDetails = (id) => (dispatch, getState) => {
  dispatch({
    type: "ORDER_DETAILS_REQUEST",
  });

  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  axios
    .get(`/api/orders/${id}`, config)
    .then(({ data }) => {
      dispatch({
        type: "ORDER_DETAILS_SUCCESS",
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "ORDER_DETAILS_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const orderPayAction = (orderId, paymentResult) => (dispatch, getState) => {
  dispatch({
    type: "ORDER_PAY_REQUEST",
  });

  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  axios
    .put(`/api/orders/${orderId}/pay`, paymentResult, config)
    .then(({ data }) => {
      dispatch({
        type: "ORDER_PAY_SUCCESS",
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "ORDER_PAY_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const orderMyListAction = () => (dispatch, getState) => {
  dispatch({
    type: "ORDER_MY_LIST_REQUEST",
  });

  const {
    userLogin: { userInfo },
  } = getState();

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  axios
    .get(`/api/orders/myorders`, config)
    .then(({ data }) => {
      dispatch({
        type: "ORDER_MY_LIST_SUCCESS",
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "ORDER_MY_LIST_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};
