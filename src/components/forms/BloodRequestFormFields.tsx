
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  requester_name: string;
  requester_phone: string;
  requester_email: string;
  patient_name: string;
  blood_group: string;
  hospital: string;
  urgency: string;
  additional_notes: string;
}

interface BloodRequestFormFieldsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  isSubmitting: boolean;
}

const BloodRequestFormFields = ({ formData, setFormData, isSubmitting }: BloodRequestFormFieldsProps) => {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="requester_name">Your Name *</Label>
        <Input
          id="requester_name"
          type="text"
          placeholder="Enter your full name"
          value={formData.requester_name}
          onChange={(e) => setFormData({...formData, requester_name: e.target.value})}
          disabled={isSubmitting}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="requester_phone">Your Phone *</Label>
        <Input
          id="requester_phone"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.requester_phone}
          onChange={(e) => setFormData({...formData, requester_phone: e.target.value})}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="requester_email">Your Email</Label>
        <Input
          id="requester_email"
          type="email"
          placeholder="Enter your email (optional)"
          value={formData.requester_email}
          onChange={(e) => setFormData({...formData, requester_email: e.target.value})}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="patient_name">Patient Name *</Label>
        <Input
          id="patient_name"
          type="text"
          placeholder="Enter patient's name"
          value={formData.patient_name}
          onChange={(e) => setFormData({...formData, patient_name: e.target.value})}
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="blood_group">Blood Group *</Label>
          <Select 
            value={formData.blood_group} 
            onValueChange={(value) => setFormData({...formData, blood_group: value})}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="urgency">Urgency *</Label>
          <Select 
            value={formData.urgency} 
            onValueChange={(value) => setFormData({...formData, urgency: value})}
            disabled={isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hospital">Hospital *</Label>
        <Input
          id="hospital"
          type="text"
          placeholder="Enter hospital name"
          value={formData.hospital}
          onChange={(e) => setFormData({...formData, hospital: e.target.value})}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="additional_notes">Additional Notes</Label>
        <Textarea
          id="additional_notes"
          placeholder="Any additional information..."
          value={formData.additional_notes}
          onChange={(e) => setFormData({...formData, additional_notes: e.target.value})}
          disabled={isSubmitting}
          rows={3}
        />
      </div>
    </div>
  );
};

export default BloodRequestFormFields;
