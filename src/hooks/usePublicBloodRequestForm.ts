
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

export const usePublicBloodRequestForm = (onClose: () => void) => {
  const [formData, setFormData] = useState<FormData>({
    requester_name: "",
    requester_phone: "",
    requester_email: "",
    patient_name: "",
    blood_group: "",
    hospital: "",
    urgency: "",
    additional_notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateForm = (): boolean => {
    if (!formData.requester_name || !formData.requester_phone || !formData.patient_name || 
        !formData.blood_group || !formData.hospital || !formData.urgency) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('public_blood_requests')
        .insert([formData]);

      if (error) {
        throw error;
      }

      toast({
        title: "Blood Request Submitted!",
        description: "Your request has been submitted successfully. Our team will contact you soon.",
      });

      onClose();
    } catch (error) {
      console.error('Error submitting blood request:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    handleSubmit,
  };
};
