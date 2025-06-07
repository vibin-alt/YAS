
import { Card, CardContent } from "@/components/ui/card";
import { usePublicBloodRequestForm } from "@/hooks/usePublicBloodRequestForm";
import BloodRequestFormHeader from "@/components/forms/BloodRequestFormHeader";
import BloodRequestFormFields from "@/components/forms/BloodRequestFormFields";
import BloodRequestFormActions from "@/components/forms/BloodRequestFormActions";

interface PublicBloodRequestFormProps {
  onClose: () => void;
}

const PublicBloodRequestForm = ({ onClose }: PublicBloodRequestFormProps) => {
  const { formData, setFormData, isSubmitting, handleSubmit } = usePublicBloodRequestForm(onClose);

  return (
    <Card className="w-full max-w-lg mx-auto">
      <BloodRequestFormHeader />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <BloodRequestFormFields
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
          />
          <BloodRequestFormActions
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default PublicBloodRequestForm;
