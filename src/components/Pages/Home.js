import { useState } from 'react';
import Cart from '../Cart/Cart';
import Header from '../Layout/Header';
import Meals from '../Meals/Meals';
import CartProvider from '../../store/CartProvider';
import Modal from '../UI/Modal';

const Home = (props) => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [error, setError] = useState('');
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
        <Cart
          onClose={hideCartHandler}
          onClick={showConfirmationHandler}
          setError={setError}
        />
      )}
      {showConfirmationOrderModal && (
        <Modal onClose={hideConfirmationHandler}>
          {error.length !== 0 ? error : 'Your order is processed'}
        </Modal>
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default Home;
