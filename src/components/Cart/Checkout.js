import classes from "./Checkout.module.css";
import { useRef,useState } from "react";
import React from 'react';

const isEmpty = (value) => value.trim() === '';
const isfiveChar  =(parameter)=> parameter.trim().length === 6;

const Checkout = (props) => {
    const [formInputsValidity, setFromInputvalidity] = useState({
        name:true ,
        street: true, 
        city: true,
        postalcode: true,
    })

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalcodeInputRef = useRef();
    const cityInputRef = useRef();


    const confirmHandler =(event)=>{
        event.preventDefault()                         
        const enteredname = nameInputRef.current.value;
        const enteredstreet = streetInputRef.current.value;
        const enteredpostalcode = postalcodeInputRef.current.value;
        const enteredcity = cityInputRef.current.value;
        console.log(nameInputRef.current)
        const checkname = !isEmpty(enteredname);
        const checkstreet = !isEmpty(enteredstreet);
        const checkcity = !isEmpty(enteredcity);
        const checkpostalcode = isfiveChar(enteredpostalcode);

        setFromInputvalidity({
            name: checkname,
            street: checkstreet,
            city: checkcity,
            postalcode: checkpostalcode,

        })


        const Formvalid = checkname && checkstreet && checkcity && checkpostalcode


        if(!Formvalid){
            return
        }
        // submit
        const userdata = {
            name: enteredname,
            street: enteredstreet,
            postalcode: enteredpostalcode, 
            city: enteredcity,
        }
        props.onSubmit(userdata);
      
        

    }
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
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalcodeInputRef} />
        {!formInputsValidity.postalcode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout