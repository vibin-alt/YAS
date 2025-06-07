
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  created_at: string;
}

interface ActivitiesTabProps {
  activities: Activity[];
  newActivity: {
    title: string;
    description: string;
    date: string;
    location: string;
    time: string;
  };
  onNewActivityChange: (activity: any) => void;
  onAddActivity: () => void;
  onDeleteActivity: (id: string) => void;
}

const ActivitiesTab = ({
  activities,
  newActivity,
  onNewActivityChange,
  onAddActivity,
  onDeleteActivity
}: ActivitiesTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Activity</CardTitle>
          <CardDescription>Create new club activities and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input
                value={newActivity.title}
                onChange={(e) => onNewActivityChange({...newActivity, title: e.target.value})}
                placeholder="Activity title"
              />
            </div>
            <div className="space-y-2">
              <Label>Date *</Label>
              <Input
                type="date"
                value={newActivity.date}
                onChange={(e) => onNewActivityChange({...newActivity, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={newActivity.location}
                onChange={(e) => onNewActivityChange({...newActivity, location: e.target.value})}
                placeholder="Event location"
              />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                value={newActivity.time}
                onChange={(e) => onNewActivityChange({...newActivity, time: e.target.value})}
                placeholder="Event time"
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newActivity.description}
                onChange={(e) => onNewActivityChange({...newActivity, description: e.target.value})}
                placeholder="Activity description"
              />
            </div>
          </div>
          <Button onClick={onAddActivity} className="mt-4 bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Activity
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Activities</CardTitle>
          <CardDescription>Manage existing activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{activity.title}</h3>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>📅 {activity.date}</span>
                    {activity.time && <span>🕒 {activity.time}</span>}
                    {activity.location && <span>📍 {activity.location}</span>}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onDeleteActivity(activity.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {activities.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No activities created yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivitiesTab;
