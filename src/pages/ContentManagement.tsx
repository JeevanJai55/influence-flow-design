import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  User, 
  FileText, 
  Filter,
  Search,
  MoreHorizontal,
  Target,
  Clock,
  CheckCircle,
  Grid3X3,
  List,
  Eye,
  Edit3,
  Trash2,
  Share2,
  Star,
  ArrowUpRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Confetti from 'react-confetti';
import { ContentSkeleton } from "@/components/ContentSkeleton";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'in-progress' | 'review' | 'scheduled' | 'published';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'linkedin' | 'facebook';
  content_type: 'post' | 'story' | 'reel' | 'video' | 'article';
  due_date?: string;
  created_at: string;
  updated_at: string;
}

export default function ContentManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<'board' | 'list' | 'calendar'>('board');
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewContentDialog, setShowNewContentDialog] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [newContentForm, setNewContentForm] = useState({
    title: '',
    description: '',
    platform: 'instagram' as const,
    priority: 'medium' as const,
    content_type: 'post' as const,
    due_date: ''
  });

  const statusOrder = ['draft', 'in-progress', 'review', 'scheduled', 'published'];

  // Fetch content items
  const fetchContentItems = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContentItems((data || []) as ContentItem[]);
    } catch (error) {
      console.error('Error fetching content items:', error);
      toast({
        title: "Error",
        description: "Failed to load content items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchContentItems();
  }, [fetchContentItems]);

  // Handle drag and drop
  const onDragEnd = useCallback(async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || !user) return;
    if (destination.droppableId === source.droppableId) return;

    const newStatus = destination.droppableId as ContentItem['status'];
    
    try {
      const { error } = await supabase
        .from('content_items')
        .update({ 
          status: newStatus,
          published_at: newStatus === 'published' ? new Date().toISOString() : null
        })
        .eq('id', draggableId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setContentItems(prev => prev.map(item => 
        item.id === draggableId 
          ? { ...item, status: newStatus }
          : item
      ));

      // Show confetti for published items
      if (newStatus === 'published') {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
        toast({
          title: "🎉 Content Published!",
          description: "Your content has been successfully published.",
        });
      }
    } catch (error) {
      console.error('Error updating content status:', error);
      toast({
        title: "Error",
        description: "Failed to update content status",
        variant: "destructive"
      });
    }
  }, [user, toast]);

  // Create new content item
  const handleCreateContent = async () => {
    if (!user || !newContentForm.title.trim()) return;

    try {
      const { data, error } = await supabase
        .from('content_items')
        .insert({
          user_id: user.id,
          title: newContentForm.title,
          description: newContentForm.description,
          platform: newContentForm.platform,
          priority: newContentForm.priority,
          content_type: newContentForm.content_type,
          due_date: newContentForm.due_date || null,
          status: 'draft'
        })
        .select()
        .single();

      if (error) throw error;

      setContentItems(prev => [data as ContentItem, ...prev]);
      setNewContentForm({
        title: '',
        description: '',
        platform: 'instagram',
        priority: 'medium',
        content_type: 'post',
        due_date: ''
      });
      setShowNewContentDialog(false);
      
      toast({
        title: "Content Created",
        description: "New content item has been added to your board.",
      });
    } catch (error) {
      console.error('Error creating content:', error);
      toast({
        title: "Error",
        description: "Failed to create content item",
        variant: "destructive"
      });
    }
  };

  // Filter content items
  const filteredItems = useMemo(() => {
    return contentItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [contentItems, searchTerm, filterStatus]);

  // Group items by status for board view
  const groupedItems = useMemo(() => {
    return statusOrder.reduce((acc, status) => {
      acc[status] = filteredItems.filter(item => item.status === status);
      return acc;
    }, {} as Record<string, ContentItem[]>);
  }, [filteredItems]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-500 border-green-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-500/10 text-gray-500';
      case 'in-progress': return 'bg-blue-500/10 text-blue-500';
      case 'review': return 'bg-yellow-500/10 text-yellow-500';
      case 'scheduled': return 'bg-purple-500/10 text-purple-500';
      case 'published': return 'bg-green-500/10 text-green-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const ContentCard = React.memo(({ item, index }: { item: ContentItem; index: number }) => (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-4 cursor-move transition-all duration-300 border-border/50 hover:border-primary/20 ${
            snapshot.isDragging ? 'rotate-1 shadow-xl scale-105 bg-accent/50' : 'hover:shadow-lg'
          }`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-sm font-semibold line-clamp-2 text-foreground">{item.title}</CardTitle>
              <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-accent/50">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            {item.description && (
              <CardDescription className="text-xs line-clamp-2 text-muted-foreground">
                {item.description}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={`text-xs rounded-full px-2 py-1 ${getPriorityColor(item.priority)}`}>
                {item.priority}
              </Badge>
              <Badge variant="secondary" className="text-xs rounded-full px-2 py-1 bg-accent/50">
                {item.platform}
              </Badge>
              <Badge variant="outline" className="text-xs rounded-full px-2 py-1">
                {item.content_type}
              </Badge>
            </div>
            {item.due_date && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{new Date(item.due_date).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex items-center gap-1 pt-2">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Eye className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Edit3 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Share2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                <Star className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  ));

  if (loading) {
    return <ContentSkeleton />;
  }

  return (
    <div className="space-y-8">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Content Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Organize and track your content creation workflow</p>
        </div>
        
        <Dialog open={showNewContentDialog} onOpenChange={setShowNewContentDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90 transition-smooth">
              <Plus className="h-4 w-4 mr-2" />
              Create Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Content</DialogTitle>
              <DialogDescription>
                Add a new content item to your workflow board.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground dark:text-foreground">Title</label>
                <Input
                  value={newContentForm.title}
                  onChange={(e) => setNewContentForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Content title..."
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground dark:text-foreground">Description</label>
                <Textarea
                  value={newContentForm.description}
                  onChange={(e) => setNewContentForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Content description..."
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground dark:text-foreground">Platform</label>
                  <Select 
                    value={newContentForm.platform} 
                    onValueChange={(value: any) => setNewContentForm(prev => ({ ...prev, platform: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground dark:text-foreground">Priority</label>
                  <Select 
                    value={newContentForm.priority} 
                    onValueChange={(value: any) => setNewContentForm(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground dark:text-foreground">Content Type</label>
                  <Select 
                    value={newContentForm.content_type} 
                    onValueChange={(value: any) => setNewContentForm(prev => ({ ...prev, content_type: value }))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="post">Post</SelectItem>
                      <SelectItem value="story">Story</SelectItem>
                      <SelectItem value="reel">Reel</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="article">Article</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground dark:text-foreground">Due Date</label>
                  <Input
                    type="date"
                    value={newContentForm.due_date}
                    onChange={(e) => setNewContentForm(prev => ({ ...prev, due_date: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateContent} className="flex-1">
                  Create Content
                </Button>
                <Button variant="outline" onClick={() => setShowNewContentDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="review">Review</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* View Tabs */}
      <Tabs value={currentView} onValueChange={(value: any) => setCurrentView(value)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="board">
            <Grid3X3 className="h-4 w-4 mr-2" />
            Board
          </TabsTrigger>
          <TabsTrigger value="list">
            <List className="h-4 w-4 mr-2" />
            List
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Calendar
          </TabsTrigger>
        </TabsList>

        {/* Board View */}
        <TabsContent value="board" className="space-y-6 mt-8">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {statusOrder.map((status) => (
                <div key={status} className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-card border border-border/50 rounded-xl shadow-sm">
                    <h3 className="font-semibold capitalize text-foreground text-sm uppercase tracking-wide">
                      {status.replace('-', ' ')}
                    </h3>
                    <Badge variant="secondary" className={`${getStatusColor(status)} rounded-full px-3 py-1 font-medium`}>
                      {groupedItems[status]?.length || 0}
                    </Badge>
                  </div>
                  
                  <Droppable droppableId={status}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[200px] p-3 rounded-lg border-2 border-dashed transition-colors ${
                          snapshot.isDraggingOver 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border/30 bg-muted/20'
                        }`}
                      >
                        {groupedItems[status]?.map((item, index) => (
                          <ContentCard key={item.id} item={item} index={index} />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list" className="space-y-4">
          <div className="rounded-lg border">
            <div className="grid grid-cols-6 gap-4 p-4 border-b font-medium text-sm text-foreground dark:text-foreground">
              <div>Title</div>
              <div>Status</div>
              <div>Priority</div>
              <div>Platform</div>
              <div>Due Date</div>
              <div>Actions</div>
            </div>
            {filteredItems.map((item) => (
              <div key={item.id} className="grid grid-cols-6 gap-4 p-4 border-b hover:bg-muted/50 transition-colors">
                <div>
                  <div className="font-medium text-sm">{item.title}</div>
                  {item.description && (
                    <div className="text-xs text-muted-foreground line-clamp-1">{item.description}</div>
                  )}
                </div>
                <div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div>
                  <Badge variant="outline" className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                </div>
                <div>
                  <Badge variant="secondary">{item.platform}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.due_date ? new Date(item.due_date).toLocaleDateString() : '-'}
                </div>
                <div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Calendar View */}
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendar View
              </CardTitle>
              <CardDescription>
                Calendar integration coming soon! Track your content schedule and deadlines.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                📅 Calendar view will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}