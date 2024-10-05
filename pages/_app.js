import Layout from "../components/Layout";
import "@/styles/globals.css";
import "@/styles/bootstrap.min.css";
//import dotenv from "dotenv";
import { AppContext } from "@/components/context";
import { useState } from "react";
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps: {session, ...pageProps} }) {
  //dotenv.config();

const [user, setUser] = useState({});
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [cart, setCart] = useState([]);
const[total, setTotal] = useState(0.00);
let [addItem] = useState(()=>{});
let [removeItem] = useState(()=>{});
const [state, setState] = useState({cart:{
  items: [],
  total: 0.00
}});


/* setUser = (user) => {
  setState({ user });
}; */
addItem = (item) => {
  let { items } = state.cart;
  //check for item already in cart
  //if not in cart, add item if item is found increase quanity ++
  let foundItem = true;
  if( items && items.length > 0){
    foundItem = items.find((i) => i.id === item.id);
   
    if(!foundItem) foundItem = false;
  }
  else{
    foundItem = false;
  }
  console.log(`Found Item value: ${JSON.stringify(foundItem)}`)
  // if item is not new, add to cart, set quantity to 1
  if (!foundItem) {
    //set quantity property to 1
  
    let temp = JSON.parse(JSON.stringify(item));
    temp.quantity = 1;

    // if(!state.cart.items) {
    //   state.cart.items = [];
    //   state.cart.total = 0.00;
    // }

    var newCart = {
        items: [...state.cart.items,temp],
        total: state.cart.total + item.price,
    }
    setState({cart:newCart});
    setCart(newCart);
    console.log(`Total items: ${JSON.stringify(newCart)}`)
  } else {
    // we already have it so just increase quantity ++
    console.log(`Total so far:  ${state.cart.total}`)
    newCart= {
        items: items.map((item) =>{
          if(item.id === foundItem.id){
            return Object.assign({}, item, { quantity: item.quantity + 1 })
           }else{
          return item;
        }}),
        total: state.cart.total + item.price,
      }
      setCart(newCart);
  }
  setState({cart: newCart});  // problem is this is not updated yet
  console.log(`state reset to cart:${JSON.stringify(state)}`)
   
};

removeItem = (item) => {
  let { items } = state.cart;
  //check for item already in cart
  const foundItem = items.find((i) => i.id === item.id);
  if (foundItem.quantity > 1) {
    var newCart = {
      items: items.map((item) =>{
      if(item.id === foundItem.id){
        return Object.assign({}, item, { quantity: item.quantity - 1 })
       }else{
      return item;
    }}),
    total: state.cart.total - item.price,
    }
    //console.log(`NewCart after remove: ${JSON.stringify(newCart)}`)
  } else { // only 1 in the cart so remove the whole item
    console.log(`Try remove item ${JSON.stringify(foundItem)}`)
    const index = items.findIndex((i) => i.id === foundItem.id);
    items.splice(index, 1);
    var newCart= { items: items, total: state.cart.total - item.price } 
  }
  setState({cart:newCart});
}


  return (
    <SessionProvider session={session}>
    <AppContext.Provider value={{
      user, 
      setUser, 
      isAuthenticated, 
      setIsAuthenticated,
      cart,
      setCart,
      total,
      setTotal,
      addItem,
      removeItem,
      state,
      setState,
    }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
    </SessionProvider>
  );
}
