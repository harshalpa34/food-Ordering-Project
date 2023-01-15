import React from 'react'
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import { useRef ,useState} from 'react';




const MealItemForm = (props) => {
  let amountInputRef = useRef(null);

  const [checkInputNumber, setcheckInputNumber] = useState(true)
  const SubmitFromHandler = (event) =>{
    event.preventDefault();
    const enteredamount = amountInputRef.current.value;
    console.log(enteredamount)
    const numberEnteredAmount = +enteredamount

    if(enteredamount.trim().length === 0 || numberEnteredAmount < 1 || numberEnteredAmount >5){
      
      setcheckInputNumber(false)
      return ;
    }
    props.OnAddToCart(numberEnteredAmount);
  }


  return (
    <React.Fragment>
        <form action="" className={classes.form} onSubmit={SubmitFromHandler}>
        <Input lable="Quantity" 
        ref  = {amountInputRef} 
        input={{
            id: "amount_" +props.id,
            type: 'number',
            min : '1',
            max: '10',
            step: '1',
            defaultValue: '1',


           }}  />
        <button className={classes.button} >
                Add
        </button>
        {!checkInputNumber && <p>Entered Amount not Acceptable </p>}
        </form>
    </React.Fragment>
  )
}

export default MealItemForm