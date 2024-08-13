import './Detail.css'; // Import the CSS file for styling
import { useWorkoutsContext } from "../Hook/WorkoutContext";
import ApiFunc from './Api';
import { UserUseContext } from '../Hook/useUserContext';

function Detail({ workout }) {
  const { dispatch } = useWorkoutsContext();
  const{user} = UserUseContext()
  const handleDelete = () => {
const featch =async ()=>{
  try {
      
    const response = await ApiFunc('Delete',{'Authorization' : `Bearer ${user.token}`},{},"https://backend-eta-fawn-14.vercel.app/api/workouts",workout._id)
    
    if (response) {
      console.log(user);
      dispatch({ type: 'DELETE_WORKOUT', payload: response });
    }
  } catch (error) {
    console.error("Failed to delete workout:", error);
  }
}
featch()
  };

  return (
    <div className="item">
      <h3 className="item-title">{workout.title || "Untitled"}</h3>
      <p className="item-reps">Reps: {workout.Reps || "N/A"}</p>
      <p className="item-weight">Weight: {workout.Weight || "N/A"}</p>
      <p className="item-date">{new Date(workout.createdAt).toLocaleDateString()}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default Detail;
