import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import axios from 'axios';
// If you need Lucide icons, you'd import them here, e.g., import { Home } from 'lucide-react';

import Home from "@/pages/Home"

function App() {
  return <Home />
}

export default App



// function App() {
//   const [backendMessage, setBackendMessage] = useState('');
//   const [backendError, setBackendError] = useState('');

//   // Keep the backend connection test for now
//   useEffect(() => {
//     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//     if (!API_BASE_URL) {
//       setBackendError("VITE_API_BASE_URL is not defined in your .env file!");
//       return;
//     }

//     axios.get(`${API_BASE_URL}/api/test`)
//       .then(response => {
//         setBackendMessage(response.data.message || 'Data fetched successfully!');
//         setBackendError('');
//       })
//       .catch(err => {
//         console.error('Error fetching data:', err);
//         setBackendError(`Failed to connect to backend: ${err.message}. Check console for details.`);
//         setBackendMessage('');
//       });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Header/Navbar */}
//       <header className="bg-white shadow-sm py-4 px-6 md:px-12">
//         <nav className="container mx-auto flex justify-between items-center">
//           {/* Logo/Site Title */}
//           <a href="/" className="text-2xl font-bold text-green-700">AgroBridge</a>

//           {/* Navigation Links (for larger screens) */}
//           <div className="hidden md:flex space-x-8">
//             <a href="#features" className="text-gray-600 hover:text-green-700 font-medium">Features</a>
//             <a href="#pricing" className="text-gray-600 hover:text-green-700 font-medium">Pricing</a>
//             <a href="#contact" className="text-gray-600 hover:text-green-700 font-medium">Contact</a>
//           </div>

//          {/* CTA/Login Buttons (for larger screens) */}
// <div className="hidden md:flex space-x-4">
//   <Button variant="ghost" className="px-4 py-2 text-gray-600 hover:text-green-700 font-medium rounded-lg">
//     Login
//   </Button>
//   <Button className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300">
//     Sign Up
//   </Button>
// </div>
//           {/* Mobile Menu Icon (You'll add logic for this later) */}
//           <div className="md:hidden">
//             <button className="text-gray-600 focus:outline-none">
//               {/* You'd use a Lucide icon here, e.g., <Menu className="h-6 w-6" /> */}
//               ☰ {/* Placeholder for a menu icon */}
//             </button>
//           </div>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <main className="flex-grow flex items-center justify-center text-center py-20 px-6">
//         <div className="max-w-4xl">
//           <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
//             Connect Farmers to Markets, Seamlessly.
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-600 mb-8">
//             AgroBridge is your digital platform for efficient agricultural trade, fostering growth and sustainability.
//           </p>
//           <button className="px-8 py-4 bg-yellow-500 text-gray-900 text-lg font-bold rounded-full hover:bg-yellow-600 transition duration-300 shadow-lg">
//             Get Started Now!
//           </button>

//           {/* Backend message display - kept below hero for now */}
//           <div className="mt-8 p-4 bg-blue-100 rounded-lg text-blue-800">
//             {backendMessage && (
//               <p className="text-lg">
//                 Backend Status: <span className="font-semibold">{backendMessage}</span>
//               </p>
//             )}
//             {backendError && (
//               <p className="text-red-600 text-lg">
//                 Backend Error: <span className="font-semibold">{backendError}</span>
//               </p>
//             )}
//           </div>
//         </div>
//       </main>

//       {/* You can add a Footer here later */}
//     </div>
//   );
// }

// export default App;