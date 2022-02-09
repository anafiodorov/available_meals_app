import { useState } from 'react';
import Cart from '../Cart/Cart';
import Header from '../Layout/Header';
import Meals from '../Meals/Meals';
import CartProvider from '../../store/CartProvider';
import Modal from '../UI/Modal';
function Home(props) {
  const [cartIsShown, setCartIsShown] = useState(false);

  const [showConfirmationOrderModal, setShowConfirmationOrderModal] =
    useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  const showConfirmationHandler = () => {
    setShowConfirmationOrderModal(true);
  };

  const hideConfirmationHandler = () => {
    setShowConfirmationOrderModal(false);
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onClose={hideCartHandler} onClick={showConfirmationHandler} />
      )}
      {showConfirmationOrderModal && (
        <Modal onClose={hideConfirmationHandler}>You order is processed</Modal>
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default Home;
