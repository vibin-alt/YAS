
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import StatsOverview from "@/components/admin/StatsOverview";
import MembersTab from "@/components/admin/MembersTab";
import ActivitiesTab from "@/components/admin/ActivitiesTab";
import BloodRequestsTab from "@/components/admin/BloodRequestsTab";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import BirthdayNotifications from "@/components/admin/BirthdayNotifications";

interface Member {
  id: string;
  name: string;
  blood_group: string;
  phone: string;
  email: string;
  registered_at: string;
  date_of_birth?: string;
  profile_picture_url?: string;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  created_at: string;
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

const AdminDashboard = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([]);
  const [publicBloodRequests, setPublicBloodRequests] = useState<PublicBloodRequest[]>([]);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    time: "",
  });
  const [newBloodRequest, setNewBloodRequest] = useState({
    patient_name: "",
    blood_group: "",
    hospital: "",
    contact_name: "",
    contact_phone: "",
    urgency: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin");
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      const [membersResponse, activitiesResponse, requestsResponse, publicRequestsResponse] = await Promise.all([
        supabase.from('club_members').select('*').order('registered_at', { ascending: false }),
        supabase.from('club_activities').select('*').order('created_at', { ascending: false }),
        supabase.from('blood_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('public_blood_requests').select('*').order('created_at', { ascending: false })
      ]);

      if (membersResponse.error) throw membersResponse.error;
      if (activitiesResponse.error) throw activitiesResponse.error;
      if (requestsResponse.error) throw requestsResponse.error;
      if (publicRequestsResponse.error) throw publicRequestsResponse.error;

      setMembers(membersResponse.data || []);
      setActivities(activitiesResponse.data || []);
      setBloodRequests(requestsResponse.data || []);
      setPublicBloodRequests(publicRequestsResponse.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load data from database",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/admin");
  };

  const exportMembers = () => {
    const csvContent = [
      ["Name", "Blood Group", "Phone", "Email", "Registration Date"],
      ...members.map(member => [
        member.name,
        member.blood_group,
        member.phone,
        member.email,
        new Date(member.registered_at).toLocaleDateString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `club-members-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Successful",
      description: "Member data has been exported to CSV",
    });
  };

  const deleteMember = async (id: string) => {
    try {
      const { error } = await supabase
        .from('club_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setMembers(members.filter(member => member.id !== id));
      toast({
        title: "Member Deleted",
        description: "Member has been removed from the system",
      });
    } catch (error) {
      console.error('Error deleting member:', error);
      toast({
        title: "Error",
        description: "Failed to delete member",
        variant: "destructive",
      });
    }
  };

  const saveMember = async (updatedMember: Member) => {
    try {
      const { error } = await supabase
        .from('club_members')
        .update({
          name: updatedMember.name,
          blood_group: updatedMember.blood_group,
          phone: updatedMember.phone,
          email: updatedMember.email,
        })
        .eq('id', updatedMember.id);

      if (error) throw error;

      setMembers(members.map(member => 
        member.id === updatedMember.id ? updatedMember : member
      ));
      setEditingMember(null);
      toast({
        title: "Member Updated",
        description: "Member information has been saved",
      });
    } catch (error) {
      console.error('Error updating member:', error);
      toast({
        title: "Error",
        description: "Failed to update member",
        variant: "destructive",
      });
    }
  };

  const addActivity = async () => {
    if (!newActivity.title || !newActivity.date) {
      toast({
        title: "Error",
        description: "Please fill in required fields (title and date)",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('club_activities')
        .insert([newActivity])
        .select()
        .single();

      if (error) throw error;

      setActivities([data, ...activities]);
      setNewActivity({
        title: "",
        description: "",
        date: "",
        location: "",
        time: "",
      });

      toast({
        title: "Activity Added",
        description: "New activity has been created and will appear on the website",
      });
    } catch (error) {
      console.error('Error adding activity:', error);
      toast({
        title: "Error",
        description: "Failed to add activity",
        variant: "destructive",
      });
    }
  };

  const deleteActivity = async (id: string) => {
    try {
      const { error } = await supabase
        .from('club_activities')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setActivities(activities.filter(activity => activity.id !== id));
      toast({
        title: "Activity Deleted",
        description: "Activity has been removed",
      });
    } catch (error) {
      console.error('Error deleting activity:', error);
      toast({
        title: "Error",
        description: "Failed to delete activity",
        variant: "destructive",
      });
    }
  };

  const addBloodRequest = async () => {
    if (!newBloodRequest.patient_name || !newBloodRequest.blood_group || !newBloodRequest.hospital || !newBloodRequest.contact_name || !newBloodRequest.contact_phone || !newBloodRequest.urgency) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('blood_requests')
        .insert([newBloodRequest])
        .select()
        .single();

      if (error) throw error;

      setBloodRequests([data, ...bloodRequests]);
      setNewBloodRequest({
        patient_name: "",
        blood_group: "",
        hospital: "",
        contact_name: "",
        contact_phone: "",
        urgency: "",
      });

      toast({
        title: "Blood Request Added",
        description: "New blood request has been created",
      });
    } catch (error) {
      console.error('Error adding blood request:', error);
      toast({
        title: "Error",
        description: "Failed to add blood request",
        variant: "destructive",
      });
    }
  };

  const deleteBloodRequest = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blood_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setBloodRequests(bloodRequests.filter(request => request.id !== id));
      toast({
        title: "Blood Request Deleted",
        description: "Blood request has been removed",
      });
    } catch (error) {
      console.error('Error deleting blood request:', error);
      toast({
        title: "Error",
        description: "Failed to delete blood request",
        variant: "destructive",
      });
    }
  };

  const getMatchingMembers = (bloodGroup: string) => {
    return members.filter(member => member.blood_group === bloodGroup);
  };

  const bloodGroupCounts = members.reduce((acc, member) => {
    acc[member.blood_group] = (acc[member.blood_group] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calculate total blood requests including public ones
  const totalBloodRequests = bloodRequests.length + publicBloodRequests.length;

  const deletePublicBloodRequest = async (id: string) => {
    try {
      const { error } = await supabase
        .from('public_blood_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPublicBloodRequests(publicBloodRequests.filter(request => request.id !== id));
      toast({
        title: "Public Blood Request Deleted",
        description: "Public blood request has been removed",
      });
    } catch (error) {
      console.error('Error deleting public blood request:', error);
      toast({
        title: "Error",
        description: "Failed to delete public blood request",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Get the most recent blood request - improved sorting logic
  const allRequests = [
    ...bloodRequests.map(req => ({ ...req, type: 'admin' as const })),
    ...publicBloodRequests.map(req => ({ ...req, type: 'public' as const }))
  ].sort((a, b) => {
    // Sort by created_at timestamp in descending order (newest first)
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA;
  });
  
  const recentBloodRequest = allRequests.length > 0 ? allRequests[0] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Heart className="h-6 w-6 text-red-600" />
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-800">
              View Site
            </Link>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <StatsOverview 
              totalMembers={members.length}
              totalActivities={activities.length}
              totalBloodRequests={totalBloodRequests}
              totalBloodGroups={Object.keys(bloodGroupCounts).length}
              recentBloodRequest={recentBloodRequest}
            />
          </div>
          <div>
            <BirthdayNotifications members={members} />
          </div>
        </div>

        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="blood-requests">Blood Requests</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <MembersTab
              members={members}
              editingMember={editingMember}
              onEdit={setEditingMember}
              onSave={saveMember}
              onDelete={deleteMember}
              onEditChange={setEditingMember}
              onExport={exportMembers}
            />
          </TabsContent>

          <TabsContent value="activities">
            <ActivitiesTab
              activities={activities}
              newActivity={newActivity}
              onNewActivityChange={setNewActivity}
              onAddActivity={addActivity}
              onDeleteActivity={deleteActivity}
            />
          </TabsContent>

          <TabsContent value="blood-requests">
            <BloodRequestsTab
              bloodRequests={bloodRequests}
              publicBloodRequests={publicBloodRequests}
              members={members}
              newBloodRequest={newBloodRequest}
              onNewBloodRequestChange={setNewBloodRequest}
              onAddBloodRequest={addBloodRequest}
              onDeleteBloodRequest={deleteBloodRequest}
              onDeletePublicBloodRequest={deletePublicBloodRequest}
              getMatchingMembers={getMatchingMembers}
            />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab bloodGroupCounts={bloodGroupCounts} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
