import { useEffect, useState} from 'react';
import React from 'react'
import Card from '../UI/Card';
import classes from "./AvailableMeals.module.css"
import MealItem from './MealItem/MealItem';
// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];


const AvailableMeals = () => {

  const [Meals, setMeals] = useState([]);
  const [Loading, setLoading] = useState(true)
  const [httpError, sethttpError] = useState()

  useEffect(() => {
    // fetch('https://food-delivery-backend-51917-default-rtdb.firebaseio.com/meals.json')
    async function fetchmeals(){ 
      const response = await fetch('https://food-delivery-backend-51917-default-rtdb.firebaseio.com/meals.json');
      
   
      const responsedata  =  await response.json()
      const loadedMeals = [];

      for (const keys in responsedata){
        loadedMeals.push({
          id: keys,
          name: responsedata[keys].name,
          description : responsedata[keys].description,
          price: responsedata[keys].price
        })
      }
      setMeals(loadedMeals)
      setLoading(false)
  
    }
 
      fetchmeals().catch((error) => {
        setLoading(false);
        sethttpError(error.message);
      });
  
   

  }, []);





  if(Loading){
    return <div className={classes.container}> <span className={classes.loader}></span></div>
  }
  if(httpError){
    return<h3 className={classes.container} >"Something went wrong "  {httpError} .....</h3>
  }
  const MealsList = Meals.map(meal => <MealItem item={meal} key = {meal.id} />)
  
  return (
    <React.Fragment>
      <section className={classes.meals}>
       <Card>
       <ul> 
       {
        MealsList
       }       
        </ul>
       </Card>
       </section>
    </React.Fragment>
  )
}

export default AvailableMeals
  