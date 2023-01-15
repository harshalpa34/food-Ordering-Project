import { useContext } from "react";
import CartContext from "../../../store/Cart_context";
import classes from "./MealItem.module.css";
import React from 'react'
import Card from "../../UI/Card";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
    const cartctx = useContext(CartContext);
    const Price = `₹${props.item.price}`
    const addToCartHandler = amount =>{
        console.log(props.item.id)
          cartctx.addItem({
            id: props.item.id, 
            name: props.item.name,
            amount: amount,
            price: props.item.price
          });
    };


    return (
        <React.Fragment>
            <div className={classes.meal}>
                <Card>
                    <li>
                        <div><h3> {props.item.name}  </h3></div>
                        <div className={classes.description}>{props.item.description}</div>
                        <div className={classes.price}>{Price}</div>
                    </li>

                </Card>
                <MealItemForm OnAddToCart ={addToCartHandler}/>
            </div>


        </React.Fragment>
    )
}

export default MealItem