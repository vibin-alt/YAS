
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Mail, Phone, Calendar, Edit, Save, Trash2 } from "lucide-react";

interface Member {
  id: string;
  name: string;
  blood_group: string;
  phone: string;
  email: string;
  registered_at: string;
  profile_picture_url?: string;
}

interface MemberCardProps {
  member: Member;
  isEditing: boolean;
  editingMember: Member | null;
  onEdit: (member: Member) => void;
  onSave: (member: Member) => void;
  onDelete: (id: string) => void;
  onEditChange: (member: Member) => void;
}

const MemberCard = ({ 
  member, 
  isEditing, 
  editingMember, 
  onEdit, 
  onSave, 
  onDelete, 
  onEditChange 
}: MemberCardProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={member.profile_picture_url || ""} alt={member.name} />
              <AvatarFallback className="text-lg font-semibold">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              {isEditing ? (
                <Input
                  value={editingMember?.name || ''}
                  onChange={(e) => onEditChange({...editingMember!, name: e.target.value})}
                  className="font-semibold text-lg h-8 mb-2"
                  placeholder="Member name"
                />
              ) : (
                <h3 className="font-semibold text-lg">{member.name}</h3>
              )}
              <Badge variant="outline" className="mt-1">
                {isEditing ? (
                  <Input
                    value={editingMember?.blood_group || ''}
                    onChange={(e) => onEditChange({...editingMember!, blood_group: e.target.value})}
                    className="h-6 w-16 text-xs border-0 p-0"
                    placeholder="Blood"
                  />
                ) : (
                  member.blood_group
                )}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <Button
                size="sm"
                onClick={() => onSave(editingMember!)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(member)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(member.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-500" />
            {isEditing ? (
              <Input
                value={editingMember?.email || ''}
                onChange={(e) => onEditChange({...editingMember!, email: e.target.value})}
                className="h-8 text-sm"
                placeholder="Email address"
              />
            ) : (
              <span className="text-sm text-gray-600">{member.email}</span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-gray-500" />
            {isEditing ? (
              <Input
                value={editingMember?.phone || ''}
                onChange={(e) => onEditChange({...editingMember!, phone: e.target.value})}
                className="h-8 text-sm"
                placeholder="Phone number"
              />
            ) : (
              <span className="text-sm text-gray-600">{member.phone}</span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Registered {new Date(member.registered_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
