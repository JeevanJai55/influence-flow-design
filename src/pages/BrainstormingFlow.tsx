import { useState, useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Save,
  Share2,
  Zap
} from "lucide-react";

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 250, y: 25 },
    data: { label: 'Summer Campaign Ideas' },
    style: { background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }
  },
  {
    id: '2',
    type: 'default',
    position: { x: 100, y: 125 },
    data: { label: 'Beach Content' },
    style: { background: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }
  },
  {
    id: '3',
    type: 'default',
    position: { x: 400, y: 125 },
    data: { label: 'Fashion Trends' },
    style: { background: 'hsl(var(--coral))', color: 'white' }
  },
  {
    id: '4',
    type: 'default',
    position: { x: 250, y: 225 },
    data: { label: 'Video Content' },
    style: { background: 'hsl(var(--mint))', color: 'white' }
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3', animated: true },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
];

interface NewNodeForm {
  label: string;
  description: string;
  category: string;
  priority: string;
}

export default function BrainstormingFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showNewNodeDialog, setShowNewNodeDialog] = useState(false);
  const [newNodeForm, setNewNodeForm] = useState<NewNodeForm>({
    label: "",
    description: "",
    category: "Idea",
    priority: "Medium"
  });

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addNewNode = () => {
    if (!newNodeForm.label) return;

    const newNode: Node = {
      id: uuidv4(),
      type: 'default',
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { 
        label: newNodeForm.label,
        description: newNodeForm.description,
        category: newNodeForm.category,
        priority: newNodeForm.priority
      },
      style: { 
        background: getPriorityColor(newNodeForm.priority), 
        color: 'white',
        border: '2px solid hsl(var(--border))',
        borderRadius: '8px',
        padding: '10px',
        minWidth: '120px'
      }
    };

    setNodes((nds) => nds.concat(newNode));
    setNewNodeForm({
      label: "",
      description: "",
      category: "Idea", 
      priority: "Medium"
    });
    setShowNewNodeDialog(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "hsl(0, 84%, 60%)";
      case "Medium": return "hsl(45, 97%, 64%)";
      case "Low": return "hsl(169, 84%, 58%)";
      default: return "hsl(var(--muted))";
    }
  };

  const exportToContentManagement = () => {
    // This would integrate with content management
    console.log("Exporting nodes to content management:", nodes);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Brainstorming Flow</h1>
          <p className="text-muted-foreground">
            Visual brainstorming with connected ideas and concepts
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            onClick={() => setShowNewNodeDialog(true)}
            variant="outline" 
            className="transition-smooth"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Idea
          </Button>
          <Button 
            onClick={exportToContentManagement}
            className="bg-gradient-primary hover:shadow-glow transition-smooth"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Export to Content
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Ideas</p>
                <p className="text-xl font-bold text-foreground">{nodes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-mint/10 rounded-lg">
                <Zap className="h-5 w-5 text-mint" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Connections</p>
                <p className="text-xl font-bold text-foreground">{edges.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-coral/10 rounded-lg">
                <Share2 className="h-5 w-5 text-coral" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clusters</p>
                <p className="text-xl font-bold text-foreground">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Flow Canvas */}
      <Card className="h-[600px]">
        <CardContent className="p-0 h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            attributionPosition="top-right"
            style={{ backgroundColor: 'hsl(var(--background))' }}
          >
            <Controls />
            <MiniMap />
            <Background gap={12} size={1} />
          </ReactFlow>
        </CardContent>
      </Card>

      {/* New Idea Dialog */}
      <Dialog open={showNewNodeDialog} onOpenChange={setShowNewNodeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Idea</DialogTitle>
            <DialogDescription>
              Create a new idea node in your brainstorming flow.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="label" className="text-right">
                Title
              </Label>
              <Input
                id="label"
                value={newNodeForm.label}
                onChange={(e) => setNewNodeForm(prev => ({ ...prev, label: e.target.value }))}
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
                value={newNodeForm.description}
                onChange={(e) => setNewNodeForm(prev => ({ ...prev, description: e.target.value }))}
                className="col-span-3"
                placeholder="Describe your idea..."
                rows={2}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select 
                value={newNodeForm.category} 
                onValueChange={(value) => setNewNodeForm(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Idea">Idea</SelectItem>
                  <SelectItem value="Strategy">Strategy</SelectItem>
                  <SelectItem value="Content">Content</SelectItem>
                  <SelectItem value="Campaign">Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <Select 
                value={newNodeForm.priority} 
                onValueChange={(value) => setNewNodeForm(prev => ({ ...prev, priority: value }))}
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
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addNewNode}>
              Add Idea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}