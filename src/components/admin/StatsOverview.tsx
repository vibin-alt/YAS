
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Droplets, Activity, Clock } from "lucide-react";

interface BloodRequest {
  id: string;
  patient_name: string;
  blood_group: string;
  hospital: string;
  urgency: string;
  created_at: string;
}

interface PublicBloodRequest {
  id: string;
  requester_name: string;
  patient_name: string;
  blood_group: string;
  hospital: string;
  urgency: string;
  created_at: string;
}

interface StatsOverviewProps {
  totalMembers: number;
  totalActivities: number;
  totalBloodRequests: number;
  totalBloodGroups: number;
  recentBloodRequest?: BloodRequest | PublicBloodRequest | null;
}

const StatsOverview = ({ 
  totalMembers, 
  totalActivities, 
  totalBloodRequests, 
  totalBloodGroups,
  recentBloodRequest 
}: StatsOverviewProps) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMembers}</div>
          <p className="text-xs text-muted-foreground">Registered users</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalActivities}</div>
          <p className="text-xs text-muted-foreground">Scheduled events</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Blood Requests</CardTitle>
          <Droplets className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBloodRequests}</div>
          <p className="text-xs text-muted-foreground">Active requests</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Blood Groups</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBloodGroups}</div>
          <p className="text-xs text-muted-foreground">Available types</p>
        </CardContent>
      </Card>

      {/* Recent Blood Request Card */}
      {recentBloodRequest && (
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Recent Blood Request</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{recentBloodRequest.patient_name}</p>
                  <p className="text-sm text-muted-foreground">
                    Blood Group: <span className="font-medium text-red-600">{recentBloodRequest.blood_group}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">Hospital: {recentBloodRequest.hospital}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    recentBloodRequest.urgency === 'Critical' 
                      ? 'bg-red-100 text-red-800' 
                      : recentBloodRequest.urgency === 'High'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {recentBloodRequest.urgency}
                  </span>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTimeAgo(recentBloodRequest.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StatsOverview;
