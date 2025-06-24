
import React from 'react';
import { QrCode } from 'lucide-react';

interface QRCodeDisplayProps {
  data: string;
  size?: number;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ data, size = 200 }) => {
  // Simuler un QR code avec un motif SVG
  const generateQRPattern = (data: string) => {
    const hash = data.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const gridSize = 21; // Taille standard d'un QR code
    const cellSize = size / gridSize;
    const pattern = [];
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const index = i * gridSize + j;
        const isBlack = (hash + index) % 3 === 0;
        if (isBlack) {
          pattern.push(
            <rect
              key={`${i}-${j}`}
              x={j * cellSize}
              y={i * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#1f2937"
            />
          );
        }
      }
    }
    
    return pattern;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="p-4 bg-white rounded-xl shadow-lg border-2 border-gray-100">
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className="border border-gray-200 rounded-lg"
        >
          {/* Fond blanc */}
          <rect width={size} height={size} fill="white" />
          
          {/* Motif QR simulé */}
          {generateQRPattern(data)}
          
          {/* Coins de position (caractéristiques d'un QR code) */}
          {/* Coin supérieur gauche */}
          <rect x="0" y="0" width={size * 0.2} height={size * 0.2} fill="#1f2937" />
          <rect x={size * 0.03} y={size * 0.03} width={size * 0.14} height={size * 0.14} fill="white" />
          <rect x={size * 0.06} y={size * 0.06} width={size * 0.08} height={size * 0.08} fill="#1f2937" />
          
          {/* Coin supérieur droit */}
          <rect x={size * 0.8} y="0" width={size * 0.2} height={size * 0.2} fill="#1f2937" />
          <rect x={size * 0.83} y={size * 0.03} width={size * 0.14} height={size * 0.14} fill="white" />
          <rect x={size * 0.86} y={size * 0.06} width={size * 0.08} height={size * 0.08} fill="#1f2937" />
          
          {/* Coin inférieur gauche */}
          <rect x="0" y={size * 0.8} width={size * 0.2} height={size * 0.2} fill="#1f2937" />
          <rect x={size * 0.03} y={size * 0.83} width={size * 0.14} height={size * 0.14} fill="white" />
          <rect x={size * 0.06} y={size * 0.86} width={size * 0.08} height={size * 0.08} fill="#1f2937" />
        </svg>
      </div>
      
      <div className="text-center">
        <QrCode className="w-6 h-6 text-blue-600 mx-auto mb-1" />
        <p className="text-xs text-gray-500 font-mono">{data}</p>
      </div>
    </div>
  );
};
