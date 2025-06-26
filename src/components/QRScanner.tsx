
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Camera, Flashlight, FlashlightOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import QrScanner from 'qr-scanner';

interface QRScannerProps {
  onBack: () => void;
  onScanResult: (result: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onBack, onScanResult }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [hasFlash, setHasFlash] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const initScanner = async () => {
      if (!videoRef.current) return;

      try {
        const scanner = new QrScanner(
          videoRef.current,
          (result) => {
            console.log('QR Code détecté:', result.data);
            onScanResult(result.data);
          },
          {
            highlightScanRegion: true,
            highlightCodeOutline: true,
          }
        );

        scannerRef.current = scanner;
        
        // Vérifier si le flash est disponible
        const hasFlashSupport = await scanner.hasFlash();
        setHasFlash(hasFlashSupport);

        await scanner.start();
      } catch (err) {
        console.error('Erreur lors de l\'initialisation du scanner:', err);
        setError('Impossible d\'accéder à la caméra. Vérifiez les permissions.');
      }
    };

    initScanner();

    return () => {
      if (scannerRef.current) {
        scannerRef.current.destroy();
      }
    };
  }, [onScanResult]);

  const toggleFlash = async () => {
    if (scannerRef.current && hasFlash) {
      try {
        await scannerRef.current.toggleFlash();
        setFlashOn(!flashOn);
      } catch (err) {
        console.error('Erreur lors du basculement du flash:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center justify-between text-white">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Scanner QR Code</h1>
          {hasFlash && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFlash}
              className="text-white hover:bg-white/20"
            >
              {flashOn ? <FlashlightOff className="w-5 h-5" /> : <Flashlight className="w-5 h-5" />}
            </Button>
          )}
        </div>
      </div>

      {/* Video Scanner */}
      <div className="relative w-full h-full flex items-center justify-center">
        {error ? (
          <Card className="m-4 max-w-sm">
            <CardHeader>
              <CardTitle className="text-center text-red-600">Erreur</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 mb-4">{error}</p>
              <Button onClick={onBack} className="w-full">
                Retour
              </Button>
            </CardContent>
          </Card>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
          />
        )}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="text-center text-white">
          <Camera className="w-8 h-8 mx-auto mb-2 opacity-80" />
          <p className="text-sm opacity-90">
            Pointez votre caméra vers un QR code pour le scanner
          </p>
        </div>
      </div>
    </div>
  );
};
