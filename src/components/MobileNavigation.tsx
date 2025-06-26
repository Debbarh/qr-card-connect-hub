
import React from 'react';
import { User, Phone, QrCode, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileNavigationProps {
  currentView: 'home' | 'profiles' | 'contacts' | 'scanner';
  onNavigate: (view: 'home' | 'profiles' | 'contacts' | 'scanner') => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Accueil' },
    { id: 'profiles', icon: User, label: 'Profils' },
    { id: 'contacts', icon: Phone, label: 'Contacts' },
    { id: 'scanner', icon: QrCode, label: 'Scanner' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id as any)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
