import React, { useState } from 'react';
import ApiFunc from '../Components/Api';
import { UserUseContext } from '../Hook/useUserContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [Isloading, setloading] = useState(false);
  const {  user, status,dispatch } = UserUseContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = { email, password };
    const data = JSON.stringify(details);

    const fetchData = async () => {
      try {
        const response = await ApiFunc(
          'POST',
          {
            'Content-Type': 'application/json',
          },
          data,
          "https://backend-eta-fawn-14.vercel.app/api/user/login"
        );

        setloading(true);

        if (response) { // Assuming your API returns a 'success' field
          setloading(false);
          setEmail('');
          setPassword('');
          setError('');
          dispatch({ type: "Login", payload: response });
          console.log(user);
          navigate("/");
        }
      } catch (error) {
        setloading(false);
        setError(error);
      }
    };

    fetchData();
  };

  return  (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" style={styles.button} disabled={Isloading}>
          {Isloading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #eaeaea',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: '#ffffff',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    marginBottom: '5px',
    fontWeight: '600',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    transition: 'border-color 0.3s',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: 'rgb(4 255 0)',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
    textAlign: 'center',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center',
  },
};

export default LoginPage;
