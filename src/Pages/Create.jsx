import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Create.css'; // Importing a CSS file for styling
import { useWorkoutsContext } from "../Hooks/WorkoutContext";

 

function Create() {
    const {workouts,dispatch} = useWorkoutsContext()

    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [Reps, setReps] = useState('');
    const [Weight, setWeight] = useState('');
    const [Error, setError] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const workout = {title,Reps,Weight}
       const Fetch= async()=>{
         const response = await fetch('https://backend-eta-fawn-14.vercel.app/api/workouts/',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Set content type to JSON
            },
            body: JSON.stringify(workout)
         })
         const json = await response.json()
         if(!response.ok){
         setError(response.message)
         }
         if(response.ok){
            setError('')
            setTitle('')
            setReps('')
            setWeight('')
            dispatch({type:'Create_Workouts' , payload:json})
            navigate('/')
         }
       }
       
       Fetch()
      
 };

    return (
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
    );
}

export default Create;
