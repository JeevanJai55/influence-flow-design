import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from 'uuid';
import { 
  Plus,
  Lightbulb,
  ArrowRight,
  Star,
  Clock,
  User,
  Zap
} from "lucide-react";

interface BrainstormIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  creator: string;
  createdDate: string;
  votes: number;
  status: string;
}

export default function Brainstorming() {
  const [showNewIdeaDialog, setShowNewIdeaDialog] = useState(false);
  const [newIdeaForm, setNewIdeaForm] = useState({
    title: "",
    description: "",
    category: "Content Ideas",
    priority: "Medium",
    creator: ""
  });

  const [ideas, setIdeas] = useState<BrainstormIdea[]>([
    {
      id: "1",
      title: "Summer Beach Lifestyle Campaign",
      description: "Create a series of beach lifestyle content featuring summer fashion, activities, and relaxation. Target audience: 18-35 millennials and Gen Z.",
      category: "Content Ideas",
      priority: "High",
      creator: "Sarah Johnson",
      createdDate: "Aug 12",
      votes: 12,
      status: "Active"
    },
    {
      id: "2",
      title: "Tech Product Unboxing Series",
      description: "Weekly unboxing videos for latest tech gadgets with detailed reviews and first impressions.",
      category: "Video Content",
      priority: "Medium",
      creator: "Mike Chen",
      createdDate: "Aug 10",
      votes: 8,
      status: "Active"
    },
    {
      id: "3",
      title: "30-Day Fitness Challenge",
      description: "Interactive fitness challenge with daily workouts, nutrition tips, and progress tracking.",
      category: "Interactive Content",
      priority: "High",
      creator: "Emma Davis",
      createdDate: "Aug 8",
      votes: 15,
      status: "In Progress"
    },
    {
      id: "4",
      title: "Behind-the-Scenes Content",
      description: "Show the process of content creation, from ideation to final product.",
      category: "Content Ideas",
      priority: "Low",
      creator: "Alex Kim",
      createdDate: "Aug 6",
      votes: 5,
      status: "Active"
    }
  ]);

  const handleCreateIdea = () => {
    if (!newIdeaForm.title || !newIdeaForm.description) return;
    
    const newIdea: BrainstormIdea = {
      id: uuidv4(),
      title: newIdeaForm.title,
      description: newIdeaForm.description,
      category: newIdeaForm.category,
      priority: newIdeaForm.priority,
      creator: newIdeaForm.creator || "Anonymous",
      createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      votes: 0,
      status: "Active"
    };

    setIdeas(prev => [...prev, newIdea]);
    setNewIdeaForm({
      title: "",
      description: "",
      category: "Content Ideas",
      priority: "Medium",
      creator: ""
    });
    setShowNewIdeaDialog(false);
  };

  const handleVote = (ideaId: string) => {
    setIdeas(prev => 
      prev.map(idea => 
        idea.id === ideaId 
          ? { ...idea, votes: idea.votes + 1 }
          : idea
      )
    );
  };

  const handleMoveToContent = (idea: BrainstormIdea) => {
    // This would integrate with the content management system
    console.log("Moving to content management:", idea);
    // You could use React Router to navigate and pass the idea data
    // navigate('/content', { state: { newContent: idea } });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Content Ideas": return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "Video Content": return "bg-purple-500/10 text-purple-600 border-purple-200";
      case "Interactive Content": return "bg-green-500/10 text-green-600 border-green-200";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Brainstorming</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Generate, collect, and develop creative ideas for your content
          </p>
        </div>
        <Button 
          onClick={() => setShowNewIdeaDialog(true)}
          className="bg-gradient-primary hover:shadow-glow transition-smooth text-sm md:text-base"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Idea
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Lightbulb className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Ideas</p>
                <p className="text-xl font-bold text-foreground">{ideas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Zap className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Ideas</p>
                <p className="text-xl font-bold text-foreground">{ideas.filter(i => i.status === "Active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-xl font-bold text-foreground">{ideas.filter(i => i.status === "In Progress").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Votes</p>
                <p className="text-xl font-bold text-foreground">{ideas.reduce((sum, idea) => sum + idea.votes, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map((idea) => (
          <Card key={idea.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg text-foreground line-clamp-2">{idea.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(idea.priority)}`} />
                  <Badge variant="secondary" className="text-xs">{idea.priority}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{idea.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <Badge className={`${getCategoryColor(idea.category)} text-xs`}>
                  {idea.category}
                </Badge>
                <Badge variant={idea.status === "Active" ? "default" : "secondary"} className="text-xs">
                  {idea.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{idea.creator}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{idea.createdDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVote(idea.id)}
                  className="flex items-center gap-1"
                >
                  <Star className="h-3 w-3" />
                  {idea.votes}
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleMoveToContent(idea)}
                  className="flex items-center gap-1"
                >
                  <ArrowRight className="h-3 w-3" />
                  Move to Content
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Idea Dialog */}
      <Dialog open={showNewIdeaDialog} onOpenChange={setShowNewIdeaDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Create New Idea</DialogTitle>
            <DialogDescription>
              Add a new brainstorming idea to your collection.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newIdeaForm.title}
                onChange={(e) => setNewIdeaForm(prev => ({ ...prev, title: e.target.value }))}
                className="col-span-3"
                placeholder="Idea title..."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newIdeaForm.description}
                onChange={(e) => setNewIdeaForm(prev => ({ ...prev, description: e.target.value }))}
                className="col-span-3"
                placeholder="Describe your idea..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select 
                value={newIdeaForm.category} 
                onValueChange={(value) => setNewIdeaForm(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Content Ideas">Content Ideas</SelectItem>
                  <SelectItem value="Video Content">Video Content</SelectItem>
                  <SelectItem value="Interactive Content">Interactive Content</SelectItem>
                  <SelectItem value="Campaigns">Campaigns</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select 
                value={newIdeaForm.priority} 
                onValueChange={(value) => setNewIdeaForm(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="creator" className="text-right">
                Creator
              </Label>
              <Input
                id="creator"
                value={newIdeaForm.creator}
                onChange={(e) => setNewIdeaForm(prev => ({ ...prev, creator: e.target.value }))}
                className="col-span-3"
                placeholder="Your name..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleCreateIdea}>
              Create Idea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}