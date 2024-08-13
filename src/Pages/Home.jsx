import { useState, useEffect } from "react";
import Detail from "../Components/Details";
import { useWorkoutsContext } from "../Hook/WorkoutContext";
import ApiFunc from "../Components/Api";
import { UserUseContext } from "../Hook/useUserContext";

 
const Home = () => {
const {workouts,dispatch} = useWorkoutsContext()
const {status, user} =UserUseContext()
const [Error , SetError] = useState("")

if(status == true){
  useEffect(() => {

    const fetchData = async () => {
     try {
      const data =  await ApiFunc("GET" ,{'Authorization' : `Bearer ${user.token}` } ,"https://backend-eta-fawn-14.vercel.app/api/workouts" )
      
      if(data){
       await dispatch({type:"SET_WORKOUTS" , payload:data})
      }
     } catch (error) {
      SetError(error)
     }
    };
  
    fetchData();
  }, [dispatch]);
}
  
  
  return !Error||workouts ?(
    <>
      <div className="workout">
        {workouts && workouts.map((workout) => (
          <Detail key={workout._id}  workout={workout}/>
        ))}
      </div>
    </>
  ):
  <>
  <h1>{Error}</h1>
  </>
};

export default Home;