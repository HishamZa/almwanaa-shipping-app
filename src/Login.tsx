import { useState } from 'react';
import { Card, CardContent } from './ui';
import { Input } from './ui';
import { Button } from './ui';
import { Label } from './ui';
import { Lock, User } from 'lucide-react';

export function Login({ onLogin, error }: { onLogin: (u: string, p: string) => void; error?: string }) {
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
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to access your account</p>
        </div>

        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="username" type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} className="pl-10 h-12" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12" required />
                </div>
              </div>
              {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">{error}</div>}
              <Button type="submit" className="w-full h-12">Sign In</Button>
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