import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Create.css'; // Importing a CSS file for styling
import { useWorkoutsContext } from "../Hook/WorkoutContext";
import ApiFunc from "../Components/Api";
import { UserUseContext } from "../Hook/useUserContext";

 

function Create() {
    const {workouts,dispatch} = useWorkoutsContext()
    const {status , user} = UserUseContext()
    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [Reps, setReps] = useState('');
    const [Weight, setWeight] = useState('');
    const [Error, setError] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = { title, Reps, Weight , user };
        const data = JSON.stringify(workout);
    
        try {
          const response = await ApiFunc(
            'post',
            { 'Content-Type': 'application/json',
              'Authorization' : `Bearer ${user.token}` 
             },
            data,
            "https://backend-eta-fawn-14.vercel.app/api/workouts/"
          );
    
          if (response.error) {
            setError(response.message || 'An error occurred');
          } else {
            setError('');
            setTitle('');
            setReps('');
            setWeight('');
            dispatch({ type: 'Create_Workouts', payload: response

             });
            navigate('/');
          }
        } catch (error) {
          setError('An error occurred during submission');
        }
      };

    return status ? (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form" >
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input 
                        id="title"
                        type="text" 
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reps">Reps:</label>
                    <input 
                        id="reps"
                        type="number"
                        required 
                        value={Reps}
                        onChange={(e) => setReps(e.target.value)}
                        placeholder="Enter reps"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Weight:</label>
                    <input 
                        id="weight"
                        type="number" 
                        value={Weight}
                        required
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Enter weight"
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">Submit</button>
            </form>
            <p>{Error}</p>
        </div>
    ) : null
}

export default Create;
