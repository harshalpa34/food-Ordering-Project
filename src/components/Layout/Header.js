import classes from "./Header.module.css";
import React from "react";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";



const Header = (props) => {
  return (
    <React.Fragment>
        <header className={classes.header} >
            <h1>MealsEat</h1>
            <HeaderCartButton onclick ={props.onclick}></HeaderCartButton>


        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="Unable to load " />
        </div>


    </React.Fragment>
  )
}

export default Header