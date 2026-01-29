'use client';

import { useState, useEffect } from 'react';

interface SolPayButtonProps {
  amount: number; // in micro USDC (6 decimals)
  description: string;
  label?: string;
  className?: string;
}

declare global {
  interface Window {
    SolPay: new (wallet: string, options?: { apiBaseUrl?: string }) => {
      paymentIntents: {
        create: (options: {
          amount: number;
          currency: string;
          description: string;
          metadata?: Record<string, string>;
        }) => Promise<{ id: string; client_secret: string; pay_url: string }>;
      };
      checkout: {
        open: (options: {
          clientSecret: string;
          onSuccess: (result: { session: unknown; signature: string }) => void;
          onCancel: () => void;
          onError: (error: Error) => void;
        }) => { close: () => void };
      };
    };
  }
}

const MERCHANT_WALLET = '2BcjnU1sSv2f4Uk793ZY59U41LapKMggYmwhiPDrhHfs';

export default function SolPayButton({ 
  amount, 
  description, 
  label = 'Pay with SolPay',
  className = ''
}: SolPayButtonProps) {
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    // Check if SDK is already loaded
    if (window.SolPay) {
      setSdkReady(true);
      return;
    }

    // Load SolPay SDK
    const script = document.createElement('script');
    script.src = 'https://solpay.cash/solpay.js';
    script.async = true;
    script.onload = () => setSdkReady(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup not needed as script persists
    };
  }, []);

  const handleClick = async () => {
    if (!sdkReady || loading) return;

    setLoading(true);

    try {
      const solpay = new window.SolPay(MERCHANT_WALLET);

      // Create payment intent
      const intent = await solpay.paymentIntents.create({
        amount,
        currency: 'USDC',
        description,
        metadata: {
          source: '0xrob402-site',
        },
      });

      // Open checkout in new tab (payment intents use pay_url)
      if (intent.pay_url) {
        window.open(intent.pay_url, '_blank');
      } else {
        // Fallback: construct pay URL
        window.open(`https://solpay.cash/pay/${intent.id}`, '_blank');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading || !sdkReady}
      className={`solpay-btn ${className}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Processing...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {label}
        </>
      )}
    </button>
  );
}
