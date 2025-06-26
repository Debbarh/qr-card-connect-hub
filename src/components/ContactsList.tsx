
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Phone, Mail, Plus, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface Contact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

interface ContactsListProps {
  onBack: () => void;
  onAddContact: (contact: Contact) => void;
}

export const ContactsList: React.FC<ContactsListProps> = ({ onBack, onAddContact }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Simuler des contacts (en réalité, on accéderait aux contacts du téléphone)
    const mockContacts: Contact[] = [
      { id: '1', name: 'Marie Dubois', phone: '+33 6 12 34 56 78', email: 'marie@example.com' },
      { id: '2', name: 'Pierre Martin', phone: '+33 6 87 65 43 21', email: 'pierre@example.com' },
      { id: '3', name: 'Sophie Laurent', phone: '+33 6 11 22 33 44', email: 'sophie@example.com' },
      { id: '4', name: 'Thomas Moreau', phone: '+33 6 55 66 77 88', email: 'thomas@example.com' },
      { id: '5', name: 'Julie Bernard', phone: '+33 6 99 88 77 66', email: 'julie@example.com' },
    ];

    setContacts(mockContacts);
    setFilteredContacts(mockContacts);
  }, []);

  useEffect(() => {
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone?.includes(searchTerm) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);

  const handleAddContact = (contact: Contact) => {
    onAddContact(contact);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      <div className="max-w-md mx-auto p-4 space-y-4">
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
          <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Rechercher un contact..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-sm"
          />
        </div>

        {error && (
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Liste des contacts */}
        <div className="space-y-3">
          {filteredContacts.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  {searchTerm ? 'Aucun contact trouvé' : 'Aucun contact'}
                </h3>
                <p className="text-gray-500">
                  {searchTerm ? 'Essayez avec d\'autres termes de recherche' : 'Vos contacts apparaîtront ici'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredContacts.map((contact) => (
              <Card key={contact.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {contact.name.charAt(0).toUpperCase()}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{contact.name}</h3>
                        {contact.phone && (
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Phone className="w-3 h-3" />
                            <span className="truncate">{contact.phone}</span>
                          </div>
                        )}
                        {contact.email && (
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <Mail className="w-3 h-3" />
                            <span className="truncate">{contact.email}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleAddContact(contact)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
