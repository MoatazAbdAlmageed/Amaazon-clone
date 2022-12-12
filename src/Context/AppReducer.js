// function sub item total price
export const getBasketTotal = (basket)=>{
  return basket.reduce((amount , item)=>{
    return amount + item.price
  },0)
}
export const initialState = {
    basket:[],
    user:null
}
const AppReducer = (state = initialState , action) => {
  switch(action.type){
    case "SET_USER":
    return{
            ...state,
            user: action.user,
    }
        // add product Basket
    case "ADD_TO_BASKET":
    return {
      ...state,
      basket: [...state.basket, action.item],
    }
        // empty basket
      case "EMPTY_BASKET":
        return{
          ...state,
          basket: []
        }
          // remove product item
    case "REMOVE_FROM_BASKET":
      const Index = state.basket.findIndex((basketItem)=> basketItem.id === action.id)
      let newBasket = [...state.basket]

      if(Index >= 0){
        newBasket.splice(Index, 1)
      }else{
        console.warn(
        `can't remove product {id ${action.id} as it's in basket!`
        )
      }
    return{
        ...state,
        basket: newBasket
    }
    default:
        return state;
  }
}

export default AppReducer