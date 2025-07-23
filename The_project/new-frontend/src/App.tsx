// src/App.tsx
import { useEffect, useState } from 'react'; // Import useEffect and useState
import axios from 'axios'; // Import axios
// import './App.css'; // You can keep or remove this line depending on your styling preference.
                     // If you're using Tailwind for everything, you might remove it.

function App() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Access the environment variable (Vite automatically exposes VITE_ prefixed vars)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    if (!API_BASE_URL) {
      setError("VITE_API_BASE_URL is not defined in your .env file!");
      return;
    }

    // MAKE SURE THE PATH IS /api/test HERE!
    axios.get(`${API_BASE_URL}/api/test`) // Corrected to /api/test
      .then(response => {
        setMessage(response.data.message || 'Data fetched successfully!');
        setError('');
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(`Failed to connect to backend: ${err.message}. Check browser console for details.`);
        setMessage('');
      });
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold text-blue-600 p-4 rounded-lg bg-gray-100 mb-6">
        AgroBridge Frontend
      </h1>

      {/* Conditional rendering for backend message or error */}
      {message && (
        <p className="text-green-600 text-lg mb-4">
          Backend Message: <span className="font-semibold">{message}</span>
        </p>
      )}

      {error && (
        <p className="text-red-600 text-lg mb-4">
          Error: <span className="font-semibold">{error}</span>
        </p>
      )}

      {/* Your original template content (kept for now, you can modify as you build) */}
      <div className="card mt-4 p-6 bg-white shadow-lg rounded-xl">
        <p className="text-gray-700">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs mt-6 text-sm text-center text-purple-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;