import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import Confetti from "react-confetti";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Grid3X3,
  List,
  Plus,
  Filter,
  Search,
  MoreHorizontal,
  Clock,
  User,
  MessageSquare
} from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  comments: number;
  platform: string;
}

export default function ContentManagement() {
  const [view, setView] = useState("board");
  const [showConfetti, setShowConfetti] = useState(false);

  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Summer Collection Post",
      description: "Instagram carousel for new summer collection launch",
      status: "In Review",
      priority: "High",
      assignee: "Sarah Johnson",
      dueDate: "Aug 8",
      comments: 3,
      platform: "Instagram"
    },
    {
      id: "2",
      title: "TikTok Dance Challenge",
      description: "Viral dance content for fitness brand collaboration",
      status: "In Progress",
      priority: "Medium",
      assignee: "Mike Chen",
      dueDate: "Aug 10",
      comments: 1,
      platform: "TikTok"
    },
    {
      id: "3",
      title: "Product Review Video",
      description: "Unboxing and review video for tech gadget",
      status: "Won",
      priority: "Low",
      assignee: "Emma Davis",
      dueDate: "Aug 5",
      comments: 5,
      platform: "YouTube"
    },
    {
      id: "4",
      title: "Brand Story Reel",
      description: "Behind-the-scenes content for brand storytelling",
      status: "To Do",
      priority: "High",
      assignee: "Alex Kim",
      dueDate: "Aug 12",
      comments: 0,
      platform: "Instagram"
    }
  ]);

  const statusOrder = ["To Do", "In Progress", "In Review", "Won", "Loss"];

  const statusColumns = statusOrder.reduce((acc, status) => {
    acc[status] = contentItems.filter(item => item.status === status);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId;
    
    setContentItems(prev => 
      prev.map(item => 
        item.id === draggableId 
          ? { ...item, status: newStatus }
          : item
      )
    );

    // Show confetti if moved to "Won"
    if (newStatus === "Won") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do": return "bg-muted";
      case "In Progress": return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "In Review": return "bg-orange-500/10 text-orange-600 border-orange-200";
      case "Won": return "bg-green-500/10 text-green-600 border-green-200";
      case "Loss": return "bg-red-500/10 text-red-600 border-red-200";
      default: return "bg-muted";
    }
  };

  const ContentCard = ({ item, index }: { item: ContentItem; index: number }) => (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Card 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-3 hover:shadow-md transition-shadow cursor-pointer ${
            snapshot.isDragging ? 'rotate-3 shadow-lg' : ''
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-sm text-foreground">{item.title}</h4>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
            
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`} />
              <span className="text-xs text-muted-foreground">{item.priority}</span>
              <Badge variant="secondary" className="text-xs">{item.platform}</Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{item.assignee}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.comments > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{item.comments}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{item.dueDate}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );

  return (
    <div className="space-y-6">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground">
            Plan, create, and track your content pipeline
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="transition-smooth">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
            <Plus className="h-4 w-4 mr-2" />
            New Content
          </Button>
        </div>
      </div>

      {/* View Tabs */}
      <Tabs value={view} onValueChange={setView} className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="board" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Board
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              List
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search content..."
                className="pl-10 pr-4 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Board View with Drag & Drop */}
        <TabsContent value="board" className="mt-6">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {statusOrder.map((status) => (
                <div key={status} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{status}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {statusColumns[status].length}
                    </Badge>
                  </div>
                  <Droppable droppableId={status}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[200px] space-y-3 p-2 rounded-lg border-2 border-dashed transition-colors ${
                          snapshot.isDraggingOver 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border/30'
                        }`}
                      >
                        {statusColumns[status].map((item, index) => (
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
        <TabsContent value="list" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contentItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-border/30 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(item.priority)}`} />
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                      <Badge variant="secondary">{item.platform}</Badge>
                      <span className="text-sm text-muted-foreground">{item.assignee}</span>
                      <span className="text-sm text-muted-foreground">{item.dueDate}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar View */}
        <TabsContent value="calendar" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Calendar View</h3>
                <p className="text-muted-foreground">
                  Calendar view with content scheduling coming soon!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}