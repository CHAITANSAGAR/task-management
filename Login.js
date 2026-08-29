import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <main className="auth">
      <form onSubmit={submit} className="card">
        <h1>Task Manager</h1>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input type="email" placeholder="Email" required value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" required value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} />
        <button disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        <p>New user? <Link to="/register">Create account</Link></p>
      </form>
    </main>
  );
}
