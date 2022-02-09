import { useState, useContext, useEffect } from 'react';
import CartContext from '../../store/cart-context';
import classes from './Checkout.module.css';
import AuthContext from '../../store/auth-context';
const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);

  const [userData, setUserData] = useState({
    name: '',
    street: '',
    city: '',
    postalCode: '',
  });

  useEffect(() => {
    setUserData({
      id: authCtx.user.id,
      name: authCtx.user.name,
      street: authCtx.user.street,
      city: authCtx.user.city,
      postalCode: authCtx.user.postalCode,
    });
  }, [
    authCtx.user.city,
    authCtx.user.name,
    authCtx.user.postalCode,
    authCtx.user.street,
    authCtx.user.id,
  ]);

  const onChangeHandler = (evt) => {
    setUserData({
      ...userData,
      [evt.target.name]: evt.target.value,
    });
  };
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const id = userData.id;
    const enteredName = userData.name;
    const enteredStreet = userData.street;
    const enteredPostalCode = userData.postalCode;
    const enteredCity = userData.city;

    console.log(enteredName);
    console.log(enteredStreet);
    console.log(enteredPostalCode);
    console.log(enteredCity);
    console.log(id);

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    let orders = cartCtx.items;
    props.onConfirm({
      id: id,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
      orders: orders,
    });
    props.onCancel();
    cartCtx.emptyCart();
    props.onConfirmOrder();
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          name='name'
          value={userData.name}
          onChange={onChangeHandler}
        />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input
          type='text'
          id='street'
          name='street'
          value={userData.street}
          onChange={onChangeHandler}
        />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          type='text'
          id='postal'
          name='postalCode'
          value={userData.postalCode}
          onChange={onChangeHandler}
        />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          name='city'
          value={userData.city}
          onChange={onChangeHandler}
        />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
