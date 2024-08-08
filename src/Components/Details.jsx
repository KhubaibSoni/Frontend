import './Detail.css'; // Import the CSS file for styling
import { useWorkoutsContext } from "../Hooks/WorkoutContext";

function Detail({ workout }) {
  const { dispatch } = useWorkoutsContext();

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://backend-eta-fawn-14.vercel.app/api/workouts/${workout._id}`, {
        method: "DELETE"
      });

      const json = await response.json();

      if (response.ok) {
        console.log(json);
        dispatch({ type: 'DELETE_WORKOUT', payload: json });
      }
    } catch (error) {
      console.error("Failed to delete workout:", error);
    }
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
