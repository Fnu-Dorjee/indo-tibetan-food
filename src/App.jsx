

import Header from "./components/Header.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/CheckOut.jsx";
import CartContextProvider from "./store/CartContext.jsx";
import UserProgConxtProvider from "./store/UserProgressContext.jsx";

function App() {
  
  return (
    <UserProgConxtProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart/>
        <Checkout/>
      </CartContextProvider>
    </UserProgConxtProvider>
    
  );
}

export default App;
