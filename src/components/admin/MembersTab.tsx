
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Search } from "lucide-react";
import MemberCard from "@/components/MemberCard";
import { useState } from "react";

interface Member {
  id: string;
  name: string;
  blood_group: string;
  phone: string;
  email: string;
  registered_at: string;
  date_of_birth?: string;
}

interface MembersTabProps {
  members: Member[];
  editingMember: Member | null;
  onEdit: (member: Member) => void;
  onSave: (member: Member) => void;
  onDelete: (id: string) => void;
  onEditChange: (member: Member) => void;
  onExport: () => void;
}

const MembersTab = ({
  members,
  editingMember,
  onEdit,
  onSave,
  onDelete,
  onEditChange,
  onExport
}: MembersTabProps) => {
  const [nameFilter, setNameFilter] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState<string>("all");

  const filteredMembers = members.filter(member => {
    const matchesName = member.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchesBloodGroup = bloodGroupFilter === "all" || member.blood_group === bloodGroupFilter;
    return matchesName && matchesBloodGroup;
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Registered Members</CardTitle>
            <CardDescription>Manage club member information</CardDescription>
          </div>
          <Button onClick={onExport} className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
        
        {/* Filter Section */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-48">
            <Select value={bloodGroupFilter} onValueChange={(value) => setBloodGroupFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by blood group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blood Groups</SelectItem>
                {bloodGroups.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              isEditing={editingMember?.id === member.id}
              editingMember={editingMember}
              onEdit={onEdit}
              onSave={onSave}
              onDelete={onDelete}
              onEditChange={onEditChange}
            />
          ))}
          {filteredMembers.length === 0 && members.length > 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No members found matching the current filters
            </div>
          )}
          {members.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              No members registered yet
            </div>
          )}
        </div>
        {filteredMembers.length > 0 && filteredMembers.length !== members.length && (
          <div className="mt-4 text-sm text-gray-600 text-center">
            Showing {filteredMembers.length} of {members.length} members
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MembersTab;
