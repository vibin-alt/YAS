
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsTabProps {
  bloodGroupCounts: Record<string, number>;
}

const AnalyticsTab = ({ bloodGroupCounts }: AnalyticsTabProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Blood Group Distribution</CardTitle>
          <CardDescription>Overview of member blood types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(bloodGroupCounts).map(([group, count]) => (
              <div key={group} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-600">{count}</div>
                <div className="text-sm text-gray-600">{group}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registration Timeline</CardTitle>
          <CardDescription>Member registrations over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            Registration chart would be displayed here
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
