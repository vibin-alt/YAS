
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cake, Gift } from "lucide-react";

interface Member {
  id: string;
  name: string;
  blood_group: string;
  phone: string;
  email: string;
  date_of_birth?: string;
  registered_at: string;
}

interface BirthdayNotificationsProps {
  members: Member[];
}

const BirthdayNotifications = ({ members }: BirthdayNotificationsProps) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  
  // Get upcoming birthdays (next 30 days)
  const upcomingBirthdays = members.filter(member => {
    if (!member.date_of_birth) return false;
    
    const birthDate = new Date(member.date_of_birth);
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    
    // Check if birthday is today
    if (birthMonth === currentMonth && birthDay === currentDate) return true;
    
    // Check if birthday is in the next 30 days
    const thisYearBirthday = new Date(today.getFullYear(), birthMonth, birthDay);
    const nextYearBirthday = new Date(today.getFullYear() + 1, birthMonth, birthDay);
    
    const daysDiff = Math.ceil((thisYearBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const daysDiffNextYear = Math.ceil((nextYearBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return (daysDiff >= 0 && daysDiff <= 30) || (daysDiffNextYear >= 0 && daysDiffNextYear <= 30);
  }).sort((a, b) => {
    if (!a.date_of_birth || !b.date_of_birth) return 0;
    
    const aDate = new Date(a.date_of_birth);
    const bDate = new Date(b.date_of_birth);
    
    const aThisYear = new Date(today.getFullYear(), aDate.getMonth(), aDate.getDate());
    const bThisYear = new Date(today.getFullYear(), bDate.getMonth(), bDate.getDate());
    
    // If birthday has passed this year, consider next year
    if (aThisYear < today) aThisYear.setFullYear(today.getFullYear() + 1);
    if (bThisYear < today) bThisYear.setFullYear(today.getFullYear() + 1);
    
    return aThisYear.getTime() - bThisYear.getTime();
  });

  const getBirthdayBadge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    
    if (birthMonth === currentMonth && birthDay === currentDate) {
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Today!</Badge>;
    }
    
    const thisYearBirthday = new Date(today.getFullYear(), birthMonth, birthDay);
    let daysDiff = Math.ceil((thisYearBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) {
      // Birthday has passed this year, calculate for next year
      const nextYearBirthday = new Date(today.getFullYear() + 1, birthMonth, birthDay);
      daysDiff = Math.ceil((nextYearBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    }
    
    if (daysDiff <= 7) {
      return <Badge className="bg-red-500 hover:bg-red-600">{daysDiff} days</Badge>;
    } else {
      return <Badge variant="outline">{daysDiff} days</Badge>;
    }
  };

  const formatBirthday = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    return birthDate.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (upcomingBirthdays.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Cake className="h-5 w-5 text-pink-600" />
            <CardTitle className="text-lg">Upcoming Birthdays</CardTitle>
          </div>
          <CardDescription>Member birthdays in the next 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-gray-500">
            <Gift className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>No birthdays in the next 30 days</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Cake className="h-5 w-5 text-pink-600" />
          <CardTitle className="text-lg">Upcoming Birthdays</CardTitle>
        </div>
        <CardDescription>
          {upcomingBirthdays.length} member{upcomingBirthdays.length !== 1 ? 's' : ''} with birthdays in the next 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingBirthdays.slice(0, 5).map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{member.name}</div>
                <div className="text-sm text-gray-500">
                  {formatBirthday(member.date_of_birth!)} • {member.blood_group}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getBirthdayBadge(member.date_of_birth!)}
              </div>
            </div>
          ))}
          {upcomingBirthdays.length > 5 && (
            <div className="text-center py-2 text-sm text-gray-500">
              + {upcomingBirthdays.length - 5} more upcoming birthdays
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BirthdayNotifications;
