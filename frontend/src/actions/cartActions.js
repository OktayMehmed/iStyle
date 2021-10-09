import axios from 'axios'

export const addToCart = (id, quantity) => (dispatch, getState) => {
  axios.get(`/api/products/${id}`).then(({data}) => {

    dispatch({
      type: 'CART_ADD_ITEM',
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity
      }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  })
}