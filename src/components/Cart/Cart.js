import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from '../Cart/CartItem';
import Checkout from './Checkout';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  let navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  console.log(hasItems);
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (data) => {
    let responseUserData = await fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authCtx.user.accessToken,
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        props.setError('Your sesion has expired you need to login');
        authCtx.logOutUser();

        setTimeout(() => {
          navigate('/login');
        }, 4000);
      }
    });

    console.log(responseUserData);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={submitOrderHandler}
          onCancel={props.onClose}
          onConfirmOrder={props.onClick}
        />
      )}

      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
