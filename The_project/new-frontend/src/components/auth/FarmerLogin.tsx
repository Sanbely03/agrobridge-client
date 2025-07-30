// new-frontend/src/components/auth/Login.tsx

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

// Import ShadCN UI components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth(); // Destructure 'user' from useAuth
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    setLoading(true);
    try {
      await login(email, password);
      // Redirection logic AFTER successful login and user context is updated
      // We'll use a setTimeout to ensure the user context has updated
      setTimeout(() => {
        if (user) { // Check if user object is available (should be after successful login)
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
          // This else block should ideally not be hit if login was successful
          console.warn("User object not available immediately after login, redirecting to general dashboard.");
          navigate('/dashboard');
        }
      }, 0); // Use setTimeout(..., 0) to defer execution until next tick (allows state update)

    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-120px)] p-4">
      <Card className="w-full max-w-md bg-gray-100 bg-opacity-70 backdrop-blur-sm shadow-lg rounded-xl border border-gray-200">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Farmer Login</CardTitle> {/* Changed to Farmer Login as per your context */}
          <CardDescription className="text-center">
            Login to your AgroBridge account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
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

export default Login;