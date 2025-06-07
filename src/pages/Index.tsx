import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Heart, Users, Calendar as CalendarIcon, MapPin, Phone, Mail, Droplets, Facebook, Instagram, MessageCircle, Trophy, Palette, Handshake } from "lucide-react";
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

      if (error) throw error;

      toast({
        title: "Registration Successful!",
        description: "Welcome to our club. We'll contact you soon.",
      });

      setName("");
      setBloodGroup("");
      setPhone("");
      setEmail("");
      setDateOfBirth("");
      setProfilePictureUrl("");
    } catch (error) {
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
      description: "We believe sports shape discipline, teamwork, and leadership. We encourage participation in football, cricket, volleyball, and athletics to promote fitness and community.",
      icon: Trophy,
    },
    {
      title: "Arts & Cultural Programs",
      description: "We nurture artistic talents through painting, music, dance, and drama. We organize cultural events to showcase skills and celebrate our cultural heritage.",
      icon: Palette,
    },
    {
      title: "Community Service",
      description: "We give back through blood donation drives, charity work, and community clean-ups. These efforts instill empathy and civic duty in our members.",
      icon: Handshake,
    },
  ];

  const upcomingEvents = activities.length > 0 ? activities : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-blue-50">
      {/* Header - Mobile Optimized */}
      <header className="bg-white shadow-sm border-b border-red-100">
        <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center space-x-2">
            <img 
              src="/YAS.jpeg" 
              alt="Club Logo" 
              className="h-10 w-10 object-contain"
            />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 whitespace-nowrap">
              Youth Arts & Sports Club
            </h1>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-between">
            <Dialog open={isBloodRequestOpen} onOpenChange={setIsBloodRequestOpen}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 px-3 text-sm sm:text-base sm:px-4">
                  <Droplets className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span>Request Blood</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Blood Request Form</DialogTitle>
                </DialogHeader>
                <PublicBloodRequestForm onClose={() => setIsBloodRequestOpen(false)} />
              </DialogContent>
            </Dialog>
            <Link to="/admin" className="w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="border-red-200 text-red-600 hover:bg-red-50 w-full sm:w-auto px-3 text-sm sm:text-base sm:px-4"
              >
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="py-12 sm:py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
              Youth Arts & Sports Club <span className="text-red-600 block sm:inline">Poovathipoyil</span>
            </h2>
            <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed text-center">
              Located in Poovathipoyil, Kerala, we're a community-driven organization committed to developing and empowering youth through sports, arts, and social responsibility.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-base sm:text-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                <span className="font-semibold">500+ Members</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section - Mobile Optimized */}
      <section className="py-12 sm:py-16 bg-white px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
            Our Activities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultActivities.map((activity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader className="text-center">
                  <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <activity.icon className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-sm sm:text-base text-justify">
                    {activity.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events - Mobile Optimized */}
      <section className="py-12 sm:py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
            Upcoming Events
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-2 text-red-600 mb-2">
                      <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="font-semibold text-sm sm:text-base">
                        {event.date ? new Date(event.date).toLocaleDateString() : event.date}
                      </span>
                    </div>
                    <CardTitle className="text-base sm:text-lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-gray-600 text-sm sm:text-base">
                      {event.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.time && (
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      {event.description && (
                        <p className="text-xs sm:text-sm mt-2">{event.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center mt-4 text-gray-500">
                <p>Check back soon for upcoming events!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Registration Form - Mobile Optimized */}
      <section className="py-12 sm:py-16 bg-white px-4">
        <div className="container mx-auto">
          <div className="max-w-md sm:max-w-2xl mx-auto">
            <Card className="shadow-xl border-red-100">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl sm:text-3xl text-gray-800">
                  Join Our Club
                </CardTitle>
                <CardDescription className="text-sm sm:text-lg">
                  Become part of our vibrant community!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegistration} className="space-y-4 sm:space-y-6">
                  <ProfilePictureUpload
                    onUpload={setProfilePictureUrl}
                    currentUrl={profilePictureUrl}
                    disabled={isSubmitting}
                  />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-red-200 focus:border-red-400 text-sm sm:text-base"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Select value={bloodGroup} onValueChange={setBloodGroup} disabled={isSubmitting}>
                        <SelectTrigger className="border-red-200 focus:border-red-400 text-sm sm:text-base">
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(group => (
                            <SelectItem key={group} value={group} className="text-sm sm:text-base">
                              {group}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="border-red-200 focus:border-red-400 text-sm sm:text-base"
                      disabled={isSubmitting}
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border-red-200 focus:border-red-400 text-sm sm:text-base"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-red-200 focus:border-red-400 text-sm sm:text-base"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 sm:py-3 text-sm sm:text-lg"
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

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-800 text-white py-8 sm:py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                <img 
                  src="/YAS.jpeg" 
                  alt="Club Logo" 
                  className="h-10 w-10 object-contain"
                />
                <h4 className="text-lg sm:text-xl font-bold">Youth Arts & Sports Club</h4>
              </div>
              <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                Promoting holistic development through sports, arts, and community service.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: MessageCircle, href: "https://wa.me/1234567890", color: "text-green-500" },
                  { icon: Instagram, href: "https://instagram.com/YouthArtsSportsClub", color: "text-pink-500" },
                  { icon: Facebook, href: "https://facebook.com/YouthArtsSportsClub", color: "text-blue-500" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 hover:${social.color} transition-colors`}
                  >
                    <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Us</h5>
              <div className="space-y-2 text-gray-400 text-sm sm:text-base">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+917034242925</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@youthartsandsportsclub.org</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h5>
              <div className="space-y-2 text-gray-400 text-sm sm:text-base">
                {["About Us", "Photo Gallery", "Membership", "Privacy Policy"].map((link, index) => (
                  <div key={index} className="hover:text-white cursor-pointer transition-colors">
                    {link}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>
              &copy; 2025{" "}
              <a 
                href="http://logicorbtech.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-400 hover:underline"
              >
                LogicOrbTech
              </a>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;