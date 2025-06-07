
import { Heart } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const BloodRequestFormHeader = () => {
  return (
    <CardHeader className="text-center">
      <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <Heart className="h-6 w-6 text-red-600" />
      </div>
      <CardTitle className="text-xl text-gray-800">Request Blood</CardTitle>
      <CardDescription>
        Submit your blood request and we'll help you find donors
      </CardDescription>
    </CardHeader>
  );
};

export default BloodRequestFormHeader;
