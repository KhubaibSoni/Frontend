import { useState, useEffect } from "react";
import Detail from "../Components/Details";
import { useWorkoutsContext } from "../Hooks/WorkoutContext";


 
const Home = () => {
const {workouts,dispatch} = useWorkoutsContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://backend-eta-fawn-14.vercel.app/api/workouts/');
        const data = await response.json();
        if (response.ok ) {
           dispatch({type:"SET_WORKOUTS" , payload:data})
        } 
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };
  
    fetchData();
  }, [dispatch]);
  
  return (
    <>
      <div className="workout">
        {workouts && workouts.map((workout) => (
          <Detail key={workout._id}  workout={workout}/>
        ))}
      </div>
    </>
  );
};

export default Home;