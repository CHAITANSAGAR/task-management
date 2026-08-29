import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <main className="auth">
      <form onSubmit={submit} className="card">
        <h1>Task Manager</h1>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <input placeholder="Name" required value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" required value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password (min 6 characters)" minLength="6"
          required value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} />
        <button disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </main>
  );
}
