import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Bot,
  Sparkles,
  Send,
  Settings,
  MessageSquare,
  Lightbulb,
  Target,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AIPlayground() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState<Array<{id: string, prompt: string, response: string, timestamp: Date}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("content-creator");

  const agents = [
    {
      id: "content-creator",
      name: "Content Creator",
      description: "Generates creative content ideas and copy",
      icon: Lightbulb,
      color: "text-yellow-500"
    },
    {
      id: "campaign-strategist",
      name: "Campaign Strategist",
      description: "Plans and optimizes marketing campaigns",
      icon: Target,
      color: "text-blue-500"
    },
    {
      id: "trend-analyzer",
      name: "Trend Analyzer",
      description: "Analyzes market trends and opportunities",
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      id: "audience-insights",
      name: "Audience Expert",
      description: "Provides audience behavior insights",
      icon: Users,
      color: "text-purple-500"
    }
  ];

  const currentAgent = agents.find(agent => agent.id === selectedAgent);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    
    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const mockResponse = `This is a simulated response from the ${currentAgent?.name} agent for: "${prompt}". In a real implementation, this would connect to an AI service like OpenAI, Anthropic, or similar.`;
      
      setResponses(prev => [{
        id: Date.now().toString(),
        prompt,
        response: mockResponse,
        timestamp: new Date()
      }, ...prev]);
      
      setPrompt("");
      setIsLoading(false);
    }, 2000);
  };

  const presetPrompts = [
    "Generate 5 Instagram post ideas for a fitness influencer",
    "Create a campaign strategy for a beauty brand launch",
    "Analyze current fashion trends for summer 2024",
    "Suggest audience targeting for a tech product"
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center">
            <Bot className="h-6 w-6 md:h-8 md:w-8 text-primary mr-2 md:mr-3" />
            AI Playground
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Collaborate with AI agents to enhance your influencer marketing workflow
          </p>
        </div>
        <Button variant="outline" className="text-sm md:text-base">
          <Settings className="h-4 w-4 mr-2" />
          Configure Agents
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Chat Interface */}
        <div className="lg:col-span-2 space-y-4">
          {/* Agent Selection */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                Select AI Agent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      <div className="flex items-center space-x-2">
                        <agent.icon className={`h-4 w-4 ${agent.color}`} />
                        <span>{agent.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {currentAgent && (
                <p className="text-sm text-muted-foreground mt-2">
                  {currentAgent.description}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Chat with {currentAgent?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chat Messages */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {responses.map((response) => (
                  <div key={response.id} className="space-y-3">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <p className="text-sm text-foreground">{response.prompt}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {response.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-sm text-foreground">{response.response}</p>
                    </div>
                  </div>
                ))}
                {responses.length === 0 && (
                  <div className="text-center py-8">
                    <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Start a conversation with your AI agent</p>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask your AI agent anything about influencer marketing..."
                  className="min-h-[100px] resize-none"
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    {prompt.length}/500 characters
                  </p>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !prompt.trim()}
                    className="bg-gradient-primary hover:shadow-glow"
                  >
                    {isLoading ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                        Thinking...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Available Agents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Agents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {agents.map((agent) => (
                <div 
                  key={agent.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedAgent === agent.id 
                      ? 'bg-primary/10 border-primary/50' 
                      : 'bg-muted/30 border-border/30 hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <agent.icon className={`h-4 w-4 ${agent.color}`} />
                    <h4 className="font-medium text-sm text-foreground">{agent.name}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">{agent.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preset Prompts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {presetPrompts.map((presetPrompt, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full text-left justify-start text-wrap h-auto p-3"
                  onClick={() => setPrompt(presetPrompt)}
                >
                  <span className="text-xs">{presetPrompt}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usage Today</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Queries</span>
                <Badge variant="secondary">{responses.length}/50</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tokens Used</span>
                <Badge variant="secondary">1.2K/10K</Badge>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Upgrade Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}