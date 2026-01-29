'use client';

import SolPayButton from './SolPayButton';

interface ServiceCardProps {
  name: string;
  price: string;
  priceUsdc: number;
  description: string;
  icon: string;
}

export default function ServiceCard({ name, price, priceUsdc, description, icon }: ServiceCardProps) {
  return (
    <div className="glass-card service-card p-8 flex flex-col">
      <div className="flex items-start justify-between mb-6">
        <div className="icon-container">
          <span className="text-2xl">{icon}</span>
        </div>
        <span className="price-tag">{price}</span>
      </div>
      <h3 className="font-semibold text-xl mb-3 text-white">{name}</h3>
      <p className="text-gray-400 leading-relaxed mb-6 flex-grow">{description}</p>
      <SolPayButton
        amount={priceUsdc}
        description={`0xRob402 - ${name}`}
        label={`Pay ${price} USDC`}
      />
    </div>
  );
}
