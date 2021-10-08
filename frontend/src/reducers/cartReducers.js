export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const item = action.payload

      const existItem = state.cartItems.find(x => x.product === item.product)

      if(existItem){
        return {
          ...state,
          cardItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
        }
      } else {
        return {
          ...state,
          cardItems: [...state.cartItems, item]
        }
      }
    default:
      return state;
  }
}