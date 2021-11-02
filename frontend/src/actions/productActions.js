import axios from "axios";

export const listProducts = () => (dispatch) => {
  dispatch({ type: "PRODUCT_LIST_REQUEST" });

  axios
    .get("/api/products")
    .then(({ data }) => {
      dispatch({
        type: "PRODUCT_LIST_SUCCESS",
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "PRODUCT_LIST_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const listProductDetails = (id) => (dispatch) => {
  dispatch({ type: "PRODUCT_DETAILS_REQUEST" });

  axios
    .get(`/api/products/${id}`)
    .then(({ data }) => {
      dispatch({
        type: "PRODUCT_DETAILS_SUCCESS",
        payload: data,
      });
    })
    .catch((error) => {
      dispatch({
        type: "PRODUCT_DETAILS_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const deleteProductAction = (id) => (dispatch, getState) => {
  dispatch({
    type: "PRODUCT_DELETE_REQUEST",
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
    .delete(`/api/products/${id}`, config)
    .then(() => {
      dispatch({ type: "PRODUCT_DELETE_SUCCESS" });
    })
    .catch((error) => {
      dispatch({
        type: "PRODUCT_DELETE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const createProductAction = () => (dispatch, getState) => {
  dispatch({
    type: "PRODUCT_CREATE_REQUEST",
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
    .post(`/api/products`, {}, config)
    .then(({ data }) => {
      dispatch({ type: "PRODUCT_CREATE_SUCCESS", payload: data });
    })
    .catch((error) => {
      dispatch({
        type: "PRODUCT_CREATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const updateProductAction = (product) => (dispatch, getState) => {
  dispatch({
    type: "PRODUCT_UPDATE_REQUEST",
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
    .put(`/api/products/${product._id}`, product, config)
    .then(({ data }) => {
      dispatch({ type: "PRODUCT_UPDATE_SUCCESS", payload: data });
    })
    .catch((error) => {
      dispatch({
        type: "PRODUCT_UPDATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    });
};

export const createProductReview =
  (productId, review) => (dispatch, getState) => {
    dispatch({
      type: "PRODUCT_CREATE_REVIEW_REQUEST",
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
      .post(`/api/products/${productId}/reviews`, review, config)
      .then(() => {
        dispatch({ type: "PRODUCT_CREATE_REVIEW_SUCCESS" });
      })
      .catch((error) => {
        dispatch({
          type: "PRODUCT_CREATE_REVIEW_FAIL",
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      });
  };
