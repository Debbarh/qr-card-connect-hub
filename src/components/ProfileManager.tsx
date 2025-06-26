import React from 'react';
import { ArrowLeft, Eye, EyeOff, Archive, Trash2, Plus, Building2, User, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

interface ProfileManagerProps {
  profiles: Profile[];
  onUpdateStatus: (id: string, status: 'active' | 'inactive' | 'archived') => void;
  onBack: () => void;
  onAddProfile?: () => void;
}

export const ProfileManager: React.FC<ProfileManagerProps> = ({ 
  profiles, 
  onUpdateStatus, 
  onBack,
  onAddProfile
}) => {
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

  const activeProfiles = profiles.filter(p => p.status === 'active');
  const inactiveProfiles = profiles.filter(p => p.status === 'inactive');
  const archivedProfiles = profiles.filter(p => p.status === 'archived');

  const ProfileCard = ({ profile }: { profile: Profile }) => (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(profile.status)} rounded-full border-2 border-white`}>
              <div className="w-1 h-1 bg-white rounded-full mx-auto mt-0.5"></div>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-800 truncate">{profile.name}</h3>
              {profile.type === 'professional' ? (
                <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
              ) : (
                <User className="w-4 h-4 text-green-600 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-gray-600 truncate">{profile.title}</p>
            {profile.company && (
              <p className="text-xs text-gray-500 truncate">{profile.company}</p>
            )}
          </div>

          {profile.logo && (
            <img
              src={profile.logo}
              alt="Logo"
              className="w-8 h-8 rounded object-cover border border-gray-200 flex-shrink-0"
            />
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {profile.status !== 'active' && (
                <DropdownMenuItem onClick={() => onUpdateStatus(profile.id, 'active')}>
                  <Eye className="w-4 h-4 mr-2" />
                  Activer
                </DropdownMenuItem>
              )}
              {profile.status === 'active' && (
                <DropdownMenuItem onClick={() => onUpdateStatus(profile.id, 'inactive')}>
                  <EyeOff className="w-4 h-4 mr-2" />
                  Désactiver
                </DropdownMenuItem>
              )}
              {profile.status !== 'archived' && (
                <DropdownMenuItem onClick={() => onUpdateStatus(profile.id, 'archived')}>
                  <Archive className="w-4 h-4 mr-2" />
                  Archiver
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 pt-8">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Mes Profils</h1>
        </div>

        {/* Bouton d'ajout */}
        <Button 
          onClick={onAddProfile}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un profil
        </Button>

        {/* Profils actifs */}
        {activeProfiles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-800">Profil Actif</h2>
              <Badge className="bg-green-500 text-white">
                {activeProfiles.length}
              </Badge>
            </div>
            {activeProfiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}

        {/* Profils inactifs */}
        {inactiveProfiles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-800">Profils Inactifs</h2>
              <Badge variant="outline" className="bg-yellow-500 text-white border-yellow-500">
                {inactiveProfiles.length}
              </Badge>
            </div>
            {inactiveProfiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}

        {/* Profils archivés */}
        {archivedProfiles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-gray-800">Profils Archivés</h2>
              <Badge variant="outline" className="bg-gray-500 text-white border-gray-500">
                {archivedProfiles.length}
              </Badge>
            </div>
            {archivedProfiles.map(profile => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        )}

        {/* Message si aucun profil */}
        {profiles.length === 0 && (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun profil</h3>
              <p className="text-gray-500">Créez votre premier profil pour commencer</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
