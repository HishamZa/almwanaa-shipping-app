import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Lock, User } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  error?: string;
}

export function Login({ onLogin, error }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="https://iili.io/qzL5Xx2.md.png"
            alt="Almwanaa Logo"
            className="h-20 mx-auto mb-4 object-contain"
          />
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to access your account</p>
        </div>

        <Card className="border-slate-200 shadow-xl">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-slate-700 font-medium">Username</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-11 h-12 rounded-xl border-slate-200"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 h-12 rounded-xl border-slate-200"
                    required
                  />
                </div>
              </div>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
          <p className="font-semibold text-slate-700 mb-3 text-sm">Demo Accounts:</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Admin:</span>
              <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-xs">Almwanaa / 12872000</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Customer:</span>
              <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-xs">test / 12341234</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}