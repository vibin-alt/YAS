
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProfilePictureUploadProps {
  onUpload: (url: string) => void;
  currentUrl?: string;
  disabled?: boolean;
}

const ProfilePictureUpload = ({ onUpload, currentUrl, disabled }: ProfilePictureUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentUrl || null);
  const { toast } = useToast();

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);

      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;
      setPreviewUrl(publicUrl);
      onUpload(publicUrl);

      toast({
        title: "Success",
        description: "Profile picture uploaded successfully!",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload profile picture. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    uploadFile(file);
  };

  const removeImage = () => {
    setPreviewUrl(null);
    onUpload("");
  };

  return (
    <div className="space-y-4">
      <Label>Profile Picture</Label>
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={previewUrl || ""} alt="Profile" />
          <AvatarFallback className="text-lg">
            <Upload className="h-8 w-8 text-gray-400" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col space-y-2">
          <div>
            <input
              type="file"
              id="profile-picture"
              accept="image/*"
              onChange={handleFileChange}
              disabled={disabled || uploading}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled || uploading}
              onClick={() => document.getElementById('profile-picture')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Uploading..." : "Upload Photo"}
            </Button>
          </div>
          
          {previewUrl && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={removeImage}
              disabled={disabled || uploading}
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Upload a profile picture (max 5MB). Supported formats: JPG, PNG, GIF
      </p>
    </div>
  );
};

export default ProfilePictureUpload;
