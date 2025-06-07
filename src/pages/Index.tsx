import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Heart, Users, Calendar as CalendarIcon, MapPin, Phone, Mail, Droplets, Facebook, Instagram, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import PublicBloodRequestForm from "@/components/PublicBloodRequestForm";
import ProfilePictureUpload from "@/components/ProfilePictureUpload";

const Index = () => {
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBloodRequestOpen, setIsBloodRequestOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('club_activities')
        .select('*')
        .order('date', { ascending: true });

      if (error) throw error;

      // Filter activities to show only future ones and limit to 3
      const futureActivities = data
        .filter(activity => new Date(activity.date) >= new Date())
        .slice(0, 3);

      setActivities(futureActivities);
    } catch (error) {
      console.error('Error loading activities:', error);
    }
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration form submitted');
    console.log('Form data:', { name, bloodGroup, phone, email, dateOfBirth, profilePictureUrl });
    
    if (!name || !bloodGroup || !phone || !email || !dateOfBirth) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('Attempting to insert member data...');
      const { data, error } = await supabase
        .from('club_members')
        .insert([
          {
            name,
            blood_group: bloodGroup,
            phone,
            email,
            date_of_birth: dateOfBirth,
            profile_picture_url: profilePictureUrl || null,
          }
        ])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Member registered successfully:', data);

      toast({
        title: "Registration Successful!",
        description: "Welcome to our blood donation club. We'll contact you soon.",
      });

      // Clear form
      setName("");
      setBloodGroup("");
      setPhone("");
      setEmail("");
      setDateOfBirth("");
      setProfilePictureUrl("");
    } catch (error) {
      console.error('Error registering member:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error registering. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultActivities = [
    {
      title: "Sports Development",
      description: "We actively organize and participate in local and regional sports events, promoting fitness and team spirit.",
      icon: Heart,
    },
    {
      title: "Arts & Cultural Programs",
      description: "We believe in nurturing artistic expression. Our club hosts a variety of programs such as:",
      icon: Users,
    },
    {
      title: "Community Service",
      description: "We are proud to contribute to society through impactful initiatives like:",
      icon: Phone,
    },
  ];

  // Use database activities for upcoming events, or fallback to static events if none
  const upcomingEvents = activities.length > 0 ? activities : [
    {
      date: "March 15, 2025",
      title: "Community Blood Drive",
      location: "City Community Center",
      time: "9:00 AM - 5:00 PM",
    },
    {
      date: "March 28, 2025",
      title: "Blood Donation Awareness Workshop",
      location: "Local High School",
      time: "2:00 PM - 4:00 PM",
    },
    {
      date: "April 5, 2025",
      title: "Health Checkup Camp",
      location: "Medical College Hospital",
      time: "8:00 AM - 12:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-800">YOUTH ARTS & SPORTS CLUB</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Dialog open={isBloodRequestOpen} onOpenChange={setIsBloodRequestOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Droplets className="w-4 h-4 mr-2" />
                  Request Blood
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Blood Request Form</DialogTitle>
                </DialogHeader>
                <PublicBloodRequestForm onClose={() => setIsBloodRequestOpen(false)} />
              </DialogContent>
            </Dialog>
            <Link to="/admin">
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Youth Arts & Sports Club <span className="text-red-600">Poovathipoyil</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Welcome to Youth Arts Sports Club, Poovathipoyil
Located in Poovathipoyil, Kerala, Youth Arts Sports Club is a community-driven organization committed to developing and empowering youth through sports, arts, and social responsibility. We aim to build a vibrant, active, and socially conscious generation.


            </p>
            <div className="flex justify-center space-x-6 text-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-600" />
                <span className="font-semibold">500+ Active Members</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-red-600" />
                <span className="font-semibold">2000+ Lives Saved</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Activities</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {defaultActivities.map((activity, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <activity.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{activity.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Upcoming Events</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-2 text-red-600 mb-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span className="font-semibold">
                      {event.date ? new Date(event.date).toLocaleDateString() : event.date}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-gray-600">
                    {event.location && (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.time && (
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.description && (
                      <p className="text-sm mt-2">{event.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {activities.length === 0 && (
            <div className="text-center mt-8 text-gray-500">
              <p>Check back soon for upcoming events!</p>
            </div>
          )}
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl border-red-100">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-gray-800">Join Our Club</CardTitle>
                <CardDescription className="text-lg">
                  Become a part of our vibrant community! Whether you're passionate about sports, art, or social service, there’s a place for you in our club.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegistration} className="space-y-6">
                  <ProfilePictureUpload
                    onUpload={setProfilePictureUrl}
                    currentUrl={profilePictureUrl}
                    disabled={isSubmitting}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-red-200 focus:border-red-400"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select value={bloodGroup} onValueChange={setBloodGroup} disabled={isSubmitting}>
                        <SelectTrigger className="border-red-200 focus:border-red-400">
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="border-red-200 focus:border-red-400"
                      disabled={isSubmitting}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border-red-200 focus:border-red-400"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-red-200 focus:border-red-400"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Join the Club"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="h-6 w-6 text-red-600" />
                <h4 className="text-xl font-bold">YOUTH ARTS & SPORTS CLUB</h4>
              </div>
              <p className="text-gray-400 mb-4">
                To promote the holistic development of our members by encouraging participation in sports, arts, and community service, empowering individuals to grow, lead, and contribute positively to society.
              </p>
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  <MessageCircle className="h-6 w-6" />
                </a>
                <a 
                  href="https://instagram.com/lifesaverclub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a 
                  href="https://facebook.com/lifesaverclub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@lifesaverclub.org</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <div className="space-y-2 text-gray-400">
                <div>About Us</div>
                <div>Blood Donation Facts</div>
                <div>Emergency Contact</div>
                <div>Privacy Policy</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 YOUTH ARTS & SPORTS CLUB. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
