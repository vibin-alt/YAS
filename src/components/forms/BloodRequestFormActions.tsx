
import { Button } from "@/components/ui/button";

interface BloodRequestFormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

const BloodRequestFormActions = ({ onCancel, isSubmitting }: BloodRequestFormActionsProps) => {
  return (
    <div className="flex gap-3 pt-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        className="flex-1"
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button 
        type="submit" 
        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </Button>
    </div>
  );
};

export default BloodRequestFormActions;
