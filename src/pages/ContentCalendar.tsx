import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Filter,
  Clock,
  Users,
  Eye,
  CheckCircle,
  AlertCircle,
  Camera,
  Video,
  FileText,
  Instagram,
  Youtube,
  Twitter,
  Layout
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  type: 'photo' | 'video' | 'story' | 'reel';
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter';
  status: 'scheduled' | 'draft' | 'review' | 'published';
  date: Date;
  time: string;
  description: string;
}

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'list'>('month');

  // Mock content data
  const contentItems: ContentItem[] = [
    {
      id: '1',
      title: 'Morning Routine Tips',
      type: 'video',
      platform: 'instagram',
      status: 'scheduled',
      date: new Date(2024, 2, 15),
      time: '09:00',
      description: 'Share daily morning routine for productivity'
    },
    {
      id: '2',
      title: 'Product Review',
      type: 'photo',
      platform: 'youtube',
      status: 'review',
      date: new Date(2024, 2, 16),
      time: '14:30',
      description: 'Review of new tech gadget'
    },
    {
      id: '3',
      title: 'Behind the Scenes',
      type: 'story',
      platform: 'tiktok',
      status: 'draft',
      date: new Date(2024, 2, 18),
      time: '12:00',
      description: 'BTS of content creation process'
    },
    {
      id: '4',
      title: 'Weekly Recap',
      type: 'reel',
      platform: 'instagram',
      status: 'published',
      date: new Date(2024, 2, 20),
      time: '18:00',
      description: 'Weekly highlights and achievements'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'draft': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'review': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'published': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'photo': return Camera;
      case 'video': return Video;
      case 'story': return Eye;
      case 'reel': return FileText;
      default: return FileText;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'bg-pink-500/10 text-pink-500 border-pink-500/20';
      case 'tiktok': return 'bg-foreground/10 text-foreground border-border';
      case 'youtube': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'twitter': return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const dayContent = contentItems.filter(item => 
        item.date.toDateString() === date.toDateString()
      );

      days.push({
        date,
        content: dayContent,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === new Date().toDateString()
      });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Content Calendar</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Plan, schedule, and track your content across all platforms
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-lg p-1">
            <Button
              variant={view === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('month')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Month
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('list')}
            >
              <Layout className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Content
          </Button>
        </div>
      </div>

      {/* Calendar Controls */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <h2 className="text-2xl font-semibold">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Calendar View */}
      {view === 'month' ? (
        <Card className="animate-fade-in">
          <CardContent className="p-6">
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="p-3 text-center font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border rounded-lg transition-colors hover:bg-muted/20 ${
                    !day.isCurrentMonth ? 'opacity-50' : ''
                  } ${
                    day.isToday ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <div className={`text-sm mb-2 ${day.isToday ? 'font-bold text-primary' : ''}`}>
                    {day.date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {day.content.map((item) => {
                      const TypeIcon = getTypeIcon(item.type);
                      return (
                        <div
                          key={item.id}
                          className={`text-xs p-1 rounded border ${getStatusColor(item.status)} cursor-pointer hover:opacity-80`}
                        >
                          <div className="flex items-center gap-1">
                            <TypeIcon className="h-3 w-3" />
                            <span className="truncate">{item.title}</span>
                          </div>
                          <div className="text-xs opacity-70">{item.time}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        /* List View */
        <div className="space-y-4 animate-fade-in">
          {contentItems.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            return (
              <Card key={item.id} className="hover:shadow-lg transition-all duration-300 hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <TypeIcon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          <Badge variant="outline" className={getPlatformColor(item.platform)}>
                            {item.platform}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{item.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {item.date.toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {item.time}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">Preview</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">
              Content pieces scheduled
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">8</div>
            <p className="text-xs text-muted-foreground">
              Ready to publish
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">3</div>
            <p className="text-xs text-muted-foreground">
              Pending approval
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}