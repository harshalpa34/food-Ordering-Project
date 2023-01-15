import classes from "./Cart.module.css";
import React from "react";
import Modal from "../UI/Modal";

import { useContext, useState } from "react";
import CartContext from "../../store/Cart_context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setisCheckout] = useState(false);
  const [issubmitting, setisSubmitting] = useState(false);
  const [orderSubmitted, setorderSubmitted] = useState();
  const cartctx = useContext(CartContext);
  console.log(cartctx.items);

  const totalAmount = `₹${cartctx.totalAmount.toFixed(2)}`;
  const hasItem = cartctx.items.length > 0;

  const RemoveitemHandler = (id) => {
    cartctx.removeItem(id);
  };
  const additemhandler = (item) => {
    cartctx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setisCheckout(true);
  };
  const orderSubmitHandler = async (userdata) => {
    setisSubmitting(true);
   await fetch(
      "https://food-delivery-backend-51917-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          uses: userdata,
          order: cartctx.items,
        }),
      }
    );
    setisSubmitting(false);

    setorderSubmitted(true);
    cartctx.clearcart();
  };

  const cartitem = (
    <ul className={classes["cart-item"]}>
      {cartctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={RemoveitemHandler.bind(null, item.id)}
          onAdd={additemhandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalContent = (
    <div>
      {cartitem}
      <div className={classes.total}>
        <span>Total Item</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onSubmit={orderSubmitHandler} onCancel={props.onclose} />
      )}
      {!isCheckout && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onclose}>
            Close
          </button>
          {hasItem && (
            <button className={classes.button} on onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </div>
  );

  // MOdal Content to show
  const issubmittingModalContent = (
    <>
      <p>Your order is getting submit</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onclose}>
          Close
        </button>
      </div>
    </>
  );
  const orderSubmittedModalContent = (
    <>
      <p>
        we have recieved your order . your order will be prepared with in 30
        mminutes
      </p>{" "}
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onclose}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onclose={props.onclose}>
      {!issubmitting && !orderSubmitted && modalContent};
      {issubmitting && issubmittingModalContent};
      {orderSubmitted && orderSubmittedModalContent}
    </Modal>
  );
};

export default Cart;
