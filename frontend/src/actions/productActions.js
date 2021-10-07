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
