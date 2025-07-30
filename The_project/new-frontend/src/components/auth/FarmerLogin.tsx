// new-frontend/src/components/auth/FarmerLogin.tsx

import React, { useState } from 'react';
// import { auth } from '../../firebaseConfig'; // No longer directly used here, managed by AuthContext
// import { signInWithEmailAndPassword } from 'firebase/auth'; // No longer directly used here
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import our custom auth hook

// Import ShadCN UI components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


const FarmerLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Changed to boolean for loading state

  const { login, user } = useAuth(); // Get login function and custom user object from context
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password); // Use the login function from AuthContext

      // Redirection logic AFTER successful login and user context is updated
      // Use setTimeout to ensure the `user` object in context has been updated
      setTimeout(() => {
        if (user) { // Check if custom user object is available
          switch (user.role) {
            case 'farmer':
              navigate('/farmer-dashboard');
              break;
            case 'investor':
              navigate('/investor-dashboard');
              break;
            case 'admin':
              navigate('/admin-dashboard');
              break;
            default:
              navigate('/dashboard'); // Fallback for unknown roles or generic dashboard
          }
        } else {
          // Fallback if user object is not immediately available (should not happen if auth context is correct)
          console.warn("User object not available immediately after login, redirecting to general dashboard.");
          navigate('/dashboard');
        }
      }, 0); // Defer execution to next event loop tick

    } catch (err: any) {
      console.error("Login failed:", err);
      // Firebase errors typically have a 'code' and 'message'
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Your styling and ShadCN components
    <div className="flex justify-center items-center min-h-[calc(100vh-120px)] p-4">
      <Card className="w-full max-w-md bg-gray-100 bg-opacity-70 backdrop-blur-sm shadow-lg rounded-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Farmer Login</CardTitle>
          <CardDescription className="text-center">
            Login to your AgroBridge account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <p className="text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-600 hover:underline">
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FarmerLogin;