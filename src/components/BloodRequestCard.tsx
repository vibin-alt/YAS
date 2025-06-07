
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Droplets, Eye, Phone, Mail, MapPin, Clock, User, Trash2 } from "lucide-react";

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

interface BloodRequestCardProps {
  request: BloodRequest;
  matchingMembers: Member[];
  onDelete: (id: string) => void;
}

const BloodRequestCard = ({ request, matchingMembers, onDelete }: BloodRequestCardProps) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'destructive';
      case 'High': return 'default';
      case 'Medium': return 'secondary';
      case 'Low': return 'outline';
      default: return 'secondary';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{request.patient_name}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="font-medium">
                <Droplets className="w-3 h-3 mr-1 text-red-600" />
                {request.blood_group}
              </Badge>
              <Badge variant={getUrgencyColor(request.urgency)}>
                {request.urgency}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[600px] sm:w-[700px]">
                <SheetHeader>
                  <SheetTitle>Blood Request Details</SheetTitle>
                  <SheetDescription>
                    Complete information about the blood request and matching donors
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-6">
                  {/* Request Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Patient Name</p>
                          <p className="font-medium">{request.patient_name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-red-600" />
                        <div>
                          <p className="text-sm text-gray-500">Blood Group</p>
                          <Badge variant="outline">{request.blood_group}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Hospital</p>
                          <p className="font-medium">{request.hospital}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Contact Person</p>
                          <p className="font-medium">{request.contact_name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Contact Phone</p>
                          <p className="font-medium">{request.contact_phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Requested</p>
                          <p className="font-medium">{new Date(request.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Matching Donors */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center">
                      <Droplets className="w-4 h-4 mr-2 text-red-600" />
                      Matching Donors ({matchingMembers.length})
                    </h4>
                    {matchingMembers.length > 0 ? (
                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Donor</TableHead>
                              <TableHead>Blood Group</TableHead>
                              <TableHead>Contact</TableHead>
                              <TableHead>Registered</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {matchingMembers.map((member) => (
                              <TableRow key={member.id}>
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face`} />
                                      <AvatarFallback className="text-xs">{getInitials(member.name)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium text-sm">{member.name}</p>
                                      <p className="text-xs text-gray-500">{member.email}</p>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{member.blood_group}</Badge>
                                </TableCell>
                                <TableCell className="text-sm">{member.phone}</TableCell>
                                <TableCell className="text-sm">
                                  {new Date(member.registered_at).toLocaleDateString()}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm py-4">No matching donors found for {request.blood_group} blood group.</p>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(request.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{request.hospital}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{request.contact_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{request.contact_phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{new Date(request.created_at).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Matching Donors:</span>
            <Badge variant={matchingMembers.length > 0 ? "default" : "secondary"}>
              {matchingMembers.length} found
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BloodRequestCard;
