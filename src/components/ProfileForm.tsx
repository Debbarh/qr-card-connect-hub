
import React, { useState } from 'react';
import { ArrowLeft, User, Building2, Camera, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

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

interface ProfileFormProps {
  onSave: (profile: Omit<Profile, 'id'>) => void;
  onBack: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSave, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    logo: '',
    type: 'personal' as 'personal' | 'professional'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre/poste est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    if (formData.type === 'professional' && !formData.company.trim()) {
      newErrors.company = 'La société est requise pour un profil professionnel';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const qrData = `${formData.name.toLowerCase().replace(/\s+/g, '-')}-${formData.type === 'professional' && formData.company ? formData.company.toLowerCase().replace(/\s+/g, '-') : 'personal'}`;

    const newProfile: Omit<Profile, 'id'> = {
      ...formData,
      company: formData.type === 'professional' ? formData.company : undefined,
      logo: formData.type === 'professional' && formData.logo ? formData.logo : undefined,
      status: 'inactive',
      qrData
    };

    onSave(newProfile);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePhotoUpload = () => {
    // Simuler un upload de photo avec une URL aléatoire d'Unsplash
    const randomId = Math.floor(Math.random() * 1000);
    const newPhoto = `https://images.unsplash.com/photo-${1500000000 + randomId}?w=150&h=150&fit=crop&crop=face`;
    setFormData(prev => ({ ...prev, photo: newPhoto }));
  };

  const handleLogoUpload = () => {
    // Simuler un upload de logo avec une URL aléatoire d'Unsplash
    const randomId = Math.floor(Math.random() * 1000);
    const newLogo = `https://images.unsplash.com/photo-${1540000000 + randomId}?w=100&h=100&fit=crop`;
    setFormData(prev => ({ ...prev, logo: newLogo }));
  };

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
          <h1 className="text-2xl font-bold text-gray-800">Nouveau Profil</h1>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg text-gray-800">Informations du profil</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type de profil */}
              <div className="space-y-2">
                <Label>Type de profil</Label>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant={formData.type === 'personal' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('type', 'personal')}
                    className="flex-1"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Personnel
                  </Button>
                  <Button
                    type="button"
                    variant={formData.type === 'professional' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('type', 'professional')}
                    className="flex-1"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Professionnel
                  </Button>
                </div>
              </div>

              {/* Photo de profil */}
              <div className="space-y-2">
                <Label>Photo de profil</Label>
                <div className="flex items-center space-x-4">
                  <img
                    src={formData.photo}
                    alt="Photo de profil"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handlePhotoUpload}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Changer
                  </Button>
                </div>
              </div>

              {/* Nom */}
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Jean Dupont"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Titre/Poste */}
              <div className="space-y-2">
                <Label htmlFor="title">Titre/Poste *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Développeur Full Stack"
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>

              {/* Société (si professionnel) */}
              {formData.type === 'professional' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="company">Société *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="TechCorp"
                      className={errors.company ? 'border-red-500' : ''}
                    />
                    {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
                  </div>

                  {/* Logo de la société */}
                  <div className="space-y-2">
                    <Label>Logo de la société</Label>
                    <div className="flex items-center space-x-4">
                      {formData.logo ? (
                        <img
                          src={formData.logo}
                          alt="Logo"
                          className="w-12 h-12 rounded object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleLogoUpload}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {formData.logo ? 'Changer' : 'Ajouter'}
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="jean.dupont@example.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Téléphone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              {/* Boutons */}
              <div className="flex space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Créer le profil
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="bg-white/60 backdrop-blur-sm border-0">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                Info
              </Badge>
              <p className="text-sm text-gray-600">
                Le profil sera créé en statut "inactif". Vous pourrez l'activer depuis la gestion des profils.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
