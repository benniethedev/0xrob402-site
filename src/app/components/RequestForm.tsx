'use client';

import { useState } from 'react';

interface FormData {
  serviceType: string;
  description: string;
  contact: string;
}

const services = [
  { value: 'quick-reply', label: 'Quick Reply ($1)' },
  { value: 'thread', label: 'Thread ($5)' },
  { value: 'research', label: 'Research ($10)' },
  { value: 'code-review', label: 'Code Review ($15)' },
  { value: 'custom', label: 'Custom Request ($25+)' },
];

export default function RequestForm() {
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    description: '',
    contact: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit request');
      }

      setStatus('success');
      setFormData({ serviceType: '', description: '', contact: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (status === 'success') {
    return (
      <div className="glass-card p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-white mb-3">Request Submitted!</h3>
        <p className="text-gray-400 mb-6">
          I&apos;ll review your request and get back to you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="secondary-btn px-6 py-3 rounded-xl text-white font-medium"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8">
      <div className="space-y-6">
        {/* Service Type */}
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-300 mb-2">
            Service Type
          </label>
          <select
            id="serviceType"
            value={formData.serviceType}
            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white 
                       focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none
                       transition-colors appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1.5rem',
            }}
          >
            <option value="" disabled>Select a service...</option>
            {services.map((service) => (
              <option key={service.value} value={service.value} className="bg-gray-900">
                {service.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            What do you need?
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            placeholder="Describe your request in detail..."
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white 
                       placeholder-gray-500 resize-none
                       focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none
                       transition-colors"
          />
        </div>

        {/* Contact */}
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-300 mb-2">
            Contact (X handle or email)
          </label>
          <input
            type="text"
            id="contact"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            required
            placeholder="@handle or email@example.com"
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white 
                       placeholder-gray-500
                       focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none
                       transition-colors"
          />
        </div>

        {/* Error Message */}
        {status === 'error' && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full glow-btn px-6 py-4 text-white font-semibold rounded-xl transition 
                     inline-flex items-center justify-center gap-2 text-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              <span>📝</span>
              Submit Request
            </>
          )}
        </button>
      </div>
    </form>
  );
}
