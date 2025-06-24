
import React, { useState } from 'react';
import { QrCode, User, Building2, Settings, Archive, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProfileManager } from '@/components/ProfileManager';
import { QRCodeDisplay } from '@/components/QRCodeDisplay';

interface Profile {
  id: string;
  name: string;
  title: string;
  company?: string;
  email: string;
  phone: string;
  photo: string;
  logo?: string;
  type: 'personal' | 'professional';
  status: 'active' | 'inactive' | 'archived';
  qrData: string;
}

const Index = () => {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: '1',
      name: 'Jean Dupont',
      title: 'Développeur Full Stack',
      company: 'TechCorp',
      email: 'jean.dupont@techcorp.com',
      phone: '+33 6 12 34 56 78',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      logo: 'https://images.unsplash.com/photo-1549057446-9f5c6ac91a04?w=100&h=100&fit=crop',
      type: 'professional',
      status: 'active',
      qrData: 'jean-dupont-techcorp'
    },
    {
      id: '2',
      name: 'Jean Dupont',
      title: 'Freelance Designer',
      email: 'jean@designer.com',
      phone: '+33 6 12 34 56 78',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      type: 'personal',
      status: 'inactive',
      qrData: 'jean-dupont-personal'
    },
    {
      id: '3',
      name: 'Jean Dupont',
      title: 'Ex-Manager Marketing',
      company: 'OldCorp',
      email: 'jean@oldcorp.com',
      phone: '+33 6 12 34 56 78',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      type: 'professional',
      status: 'archived',
      qrData: 'jean-dupont-oldcorp'
    }
  ]);

  const [showManager, setShowManager] = useState(false);

  const activeProfile = profiles.find(p => p.status === 'active');

  const updateProfileStatus = (id: string, status: 'active' | 'inactive' | 'archived') => {
    setProfiles(prev => prev.map(profile => {
      if (profile.id === id) {
        return { ...profile, status };
      }
      // Si on active un profil, désactiver tous les autres
      if (status === 'active') {
        return { ...profile, status: profile.status === 'active' ? 'inactive' : profile.status };
      }
      return profile;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'archived': return 'Archivé';
      default: return 'Inconnu';
    }
  };

  if (showManager) {
    return (
      <ProfileManager 
        profiles={profiles}
        onUpdateStatus={updateProfileStatus}
        onBack={() => setShowManager(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center pt-8">
          <h1 className="text-2xl font-bold text-gray-800">Ma Carte Digitale</h1>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowManager(true)}
            className="bg-white/80 backdrop-blur-sm"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* Profil actif */}
        {activeProfile ? (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              {/* En-tête du profil */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <img
                    src={activeProfile.photo}
                    alt={activeProfile.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${getStatusColor(activeProfile.status)} rounded-full border-2 border-white flex items-center justify-center`}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{activeProfile.name}</h2>
                  <p className="text-gray-600">{activeProfile.title}</p>
                  {activeProfile.company && (
                    <div className="flex items-center space-x-2 mt-1">
                      <Building2 className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{activeProfile.company}</span>
                    </div>
                  )}
                </div>

                {activeProfile.logo && (
                  <img
                    src={activeProfile.logo}
                    alt="Logo"
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                  />
                )}
              </div>

              {/* Informations de contact */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">{activeProfile.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">{activeProfile.phone}</span>
                </div>
              </div>

              {/* QR Code */}
              <div className="text-center">
                <QRCodeDisplay data={activeProfile.qrData} size={200} />
                <p className="text-sm text-gray-500 mt-3">
                  Scannez pour ajouter mes informations
                </p>
              </div>

              {/* Badge de statut */}
              <div className="flex justify-center mt-4">
                <Badge variant="outline" className={`${getStatusColor(activeProfile.status)} text-white border-0`}>
                  {getStatusText(activeProfile.status)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun profil actif</h3>
              <p className="text-gray-500 mb-4">Activez un profil pour afficher votre QR code</p>
              <Button onClick={() => setShowManager(true)} className="bg-blue-600 hover:bg-blue-700">
                Gérer mes profils
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Statistiques rapides */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white/60 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {profiles.filter(p => p.status === 'active').length}
              </div>
              <div className="text-xs text-gray-600">Actif</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {profiles.filter(p => p.status === 'inactive').length}
              </div>
              <div className="text-xs text-gray-600">Inactifs</div>
            </CardContent>
          </Card>
          <Card className="bg-white/60 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">
                {profiles.filter(p => p.status === 'archived').length}
              </div>
              <div className="text-xs text-gray-600">Archivés</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
