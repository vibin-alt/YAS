
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import BloodRequestCard from "@/components/BloodRequestCard";

interface Member {
  id: string;
  name: string;
  blood_group: string;
  phone: string;
  email: string;
  registered_at: string;
}

interface BloodRequest {
  id: string;
  patient_name: string;
  blood_group: string;
  hospital: string;
  contact_name: string;
  contact_phone: string;
  urgency: string;
  created_at: string;
}

interface PublicBloodRequest {
  id: string;
  requester_name: string;
  requester_phone: string;
  requester_email: string;
  patient_name: string;
  blood_group: string;
  hospital: string;
  urgency: string;
  additional_notes?: string;
  created_at: string;
}

interface BloodRequestsTabProps {
  bloodRequests: BloodRequest[];
  publicBloodRequests: PublicBloodRequest[];
  members: Member[];
  newBloodRequest: {
    patient_name: string;
    blood_group: string;
    hospital: string;
    contact_name: string;
    contact_phone: string;
    urgency: string;
  };
  onNewBloodRequestChange: (request: any) => void;
  onAddBloodRequest: () => void;
  onDeleteBloodRequest: (id: string) => void;
  onDeletePublicBloodRequest: (id: string) => void;
  getMatchingMembers: (bloodGroup: string) => Member[];
}

const BloodRequestsTab = ({
  bloodRequests,
  publicBloodRequests,
  members,
  newBloodRequest,
  onNewBloodRequestChange,
  onAddBloodRequest,
  onDeleteBloodRequest,
  onDeletePublicBloodRequest,
  getMatchingMembers
}: BloodRequestsTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Blood Request</CardTitle>
          <CardDescription>Create new blood requests for patients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Patient Name *</Label>
              <Input
                value={newBloodRequest.patient_name}
                onChange={(e) => onNewBloodRequestChange({...newBloodRequest, patient_name: e.target.value})}
                placeholder="Patient name"
              />
            </div>
            <div className="space-y-2">
              <Label>Blood Group *</Label>
              <select
                value={newBloodRequest.blood_group}
                onChange={(e) => onNewBloodRequestChange({...newBloodRequest, blood_group: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Hospital *</Label>
              <Input
                value={newBloodRequest.hospital}
                onChange={(e) => onNewBloodRequestChange({...newBloodRequest, hospital: e.target.value})}
                placeholder="Hospital name"
              />
            </div>
            <div className="space-y-2">
              <Label>Contact Name *</Label>
              <Input
                value={newBloodRequest.contact_name}
                onChange={(e) => onNewBloodRequestChange({...newBloodRequest, contact_name: e.target.value})}
                placeholder="Contact person name"
              />
            </div>
            <div className="space-y-2">
              <Label>Contact Phone *</Label>
              <Input
                value={newBloodRequest.contact_phone}
                onChange={(e) => onNewBloodRequestChange({...newBloodRequest, contact_phone: e.target.value})}
                placeholder="Contact phone number"
              />
            </div>
            <div className="space-y-2">
              <Label>Urgency *</Label>
              <select
                value={newBloodRequest.urgency}
                onChange={(e) => onNewBloodRequestChange({...newBloodRequest, urgency: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select urgency</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
          <Button onClick={onAddBloodRequest} className="mt-4 bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Blood Request
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Blood Requests</CardTitle>
          <CardDescription>Manage blood requests and view matching donors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Admin Blood Requests */}
            {bloodRequests.map((request) => {
              const matchingMembers = getMatchingMembers(request.blood_group);
              return (
                <BloodRequestCard
                  key={request.id}
                  request={request}
                  matchingMembers={matchingMembers}
                  onDelete={onDeleteBloodRequest}
                />
              );
            })}
            
            {/* Public Blood Requests */}
            {publicBloodRequests.map((request) => {
              const matchingMembers = getMatchingMembers(request.blood_group);
              // Convert public blood request to the format expected by BloodRequestCard
              const formattedRequest = {
                id: request.id,
                patient_name: request.patient_name,
                blood_group: request.blood_group,
                hospital: request.hospital,
                contact_name: request.requester_name,
                contact_phone: request.requester_phone,
                urgency: request.urgency,
                created_at: request.created_at,
                isPublicRequest: true
              };
              return (
                <div key={`public-${request.id}`} className="border-l-4 border-blue-500 pl-4">
                  <div className="text-sm text-blue-600 font-medium mb-2">Public Request</div>
                  <BloodRequestCard
                    request={formattedRequest}
                    matchingMembers={matchingMembers}
                    onDelete={onDeletePublicBloodRequest}
                  />
                  {request.additional_notes && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      <div className="text-sm font-medium text-gray-700">Additional Notes:</div>
                      <div className="text-sm text-gray-600">{request.additional_notes}</div>
                    </div>
                  )}
                </div>
              );
            })}
            
            {bloodRequests.length === 0 && publicBloodRequests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No blood requests yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BloodRequestsTab;
