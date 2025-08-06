import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Plus,
  Filter,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Camera,
  Video,
  Image
} from "lucide-react";

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");

  // Sample content data
  const contentItems = [
    {
      id: 1,
      title: "Summer Collection Post",
      type: "image",
      date: "2025-08-08",
      time: "14:30",
      platform: "Instagram",
      creator: "Sarah Johnson",
      status: "scheduled",
      description: "Showcase new summer dresses collection"
    },
    {
      id: 2,
      title: "TikTok Dance Challenge",
      type: "video",
      date: "2025-08-08",
      time: "18:00",
      platform: "TikTok",
      creator: "Mike Chen",
      status: "in-progress",
      description: "Fitness brand dance challenge"
    },
    {
      id: 3,
      title: "Product Review Video",
      type: "video",
      date: "2025-08-09",
      time: "12:00",
      platform: "YouTube",
      creator: "Emma Davis",
      status: "draft",
      description: "Tech gadget unboxing and review"
    },
    {
      id: 4,
      title: "Brand Story Reel",
      type: "video",
      date: "2025-08-10",
      time: "16:00",
      platform: "Instagram",
      creator: "Alex Kim",
      status: "scheduled",
      description: "Behind-the-scenes brand storytelling"
    },
    {
      id: 5,
      title: "Fashion Haul",
      type: "image",
      date: "2025-08-11",
      time: "13:00",
      platform: "Instagram",
      creator: "Luna Martinez",
      status: "approved",
      description: "Sustainable fashion haul post"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-gray-500/10 text-gray-600 border-gray-200";
      case "in-progress": return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "approved": return "bg-green-500/10 text-green-600 border-green-200";
      case "scheduled": return "bg-purple-500/10 text-purple-600 border-purple-200";
      default: return "bg-muted";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image": return Image;
      case "video": return Video;
      case "carousel": return Camera;
      default: return Image;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "Instagram": return "bg-pink-500/10 text-pink-600";
      case "TikTok": return "bg-black/10 text-black";
      case "YouTube": return "bg-red-500/10 text-red-600";
      case "Twitter": return "bg-blue-500/10 text-blue-600";
      default: return "bg-gray-500/10 text-gray-600";
    }
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayContent = contentItems.filter(item => item.date === dateStr);
      days.push({ day, content: dayContent });
    }
    
    return days;
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Calendar</h1>
          <p className="text-muted-foreground">
            Plan, schedule, and track your content pipeline
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Content
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card className="transition-smooth hover:shadow-elegant border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setView("month")} className={view === "month" ? "bg-primary text-primary-foreground" : ""}>
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => setView("list")} className={view === "list" ? "bg-primary text-primary-foreground" : ""}>
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {view === "month" ? (
            <div className="space-y-4">
              {/* Week day headers */}
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-2">
                {generateCalendarDays().map((day, index) => (
                  <div key={index} className="min-h-[120px] p-2 border border-border/30 rounded-lg">
                    {day && (
                      <>
                        <div className="font-medium text-foreground mb-2">{day.day}</div>
                        <div className="space-y-1">
                          {day.content.slice(0, 2).map(item => {
                            const TypeIcon = getTypeIcon(item.type);
                            return (
                              <div key={item.id} className="p-1 text-xs rounded bg-muted/50 border border-border/30">
                                <div className="flex items-center space-x-1">
                                  <TypeIcon className="h-3 w-3" />
                                  <span className="truncate">{item.title}</span>
                                </div>
                                <div className="text-xs text-muted-foreground">{item.time}</div>
                              </div>
                            );
                          })}
                          {day.content.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{day.content.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {contentItems.map(item => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <div key={item.id} className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <TypeIcon className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-semibold text-foreground">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getPlatformColor(item.platform)}>{item.platform}</Badge>
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{item.date} at {item.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{item.creator}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-sm text-green-500">+3 from last week</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-blue-500">Ready to publish</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="transition-smooth hover:shadow-elegant border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Review</p>
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-sm text-orange-500">Awaiting approval</p>
              </div>
              <User className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}