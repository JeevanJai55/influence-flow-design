import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bot, 
  Zap, 
  Brain, 
  MessageSquare, 
  Send, 
  Clock, 
  TrendingUp,
  Users,
  Calendar,
  Target,
  Sparkles,
  Code,
  Workflow,
  Settings
} from "lucide-react";

interface Message {
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function AIPlayground() {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [responses, setResponses] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState('content-optimizer');

  const agents: Agent[] = [
    {
      id: 'content-optimizer',
      name: 'Content Optimizer',
      description: 'Analyzes and optimizes content for maximum engagement',
      icon: TrendingUp,
      color: 'text-blue-500'
    },
    {
      id: 'workflow-automator',
      name: 'Workflow Automator',
      description: 'Creates automated workflows for campaign management',
      icon: Workflow,
      color: 'text-purple-500'
    },
    {
      id: 'audience-analyzer',
      name: 'Audience Analyzer',
      description: 'Provides insights on audience behavior and preferences',
      icon: Users,
      color: 'text-success'
    },
    {
      id: 'campaign-strategist',
      name: 'Campaign Strategist',
      description: 'Develops strategic campaign plans and recommendations',
      icon: Target,
      color: 'text-orange-500'
    },
    {
      id: 'trend-predictor',
      name: 'Trend Predictor',
      description: 'Predicts upcoming trends and viral content opportunities',
      icon: Sparkles,
      color: 'text-pink-500'
    },
    {
      id: 'code-generator',
      name: 'Code Generator',
      description: 'Generates custom automation scripts and integrations',
      icon: Code,
      color: 'text-cyan-500'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPrompt.trim()) return;

    const userMessage: Message = {
      content: currentPrompt,
      role: 'user',
      timestamp: new Date()
    };

    setResponses(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const selectedAgentData = agents.find(a => a.id === selectedAgent);
      const assistantMessage: Message = {
        content: `As ${selectedAgentData?.name}, I've analyzed your request: "${currentPrompt}". Here's my recommendation:\n\n• Optimize posting schedule for peak engagement\n• Use trending hashtags: #contentcreator #viral\n• Consider video format for 3x better performance\n• Target audience: 18-34 age group shows highest engagement\n\nWould you like me to create an automated workflow for this strategy?`,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setResponses(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);

    setCurrentPrompt('');
  };

  const presetPrompts = [
    "Create a content strategy for Q1 2024",
    "Analyze my top performing posts",
    "Generate hashtag recommendations",
    "Automate campaign approval workflow",
    "Predict viral content trends"
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Playground
          </h1>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-1">
          Harness the power of AI for automation, workflow optimization, and strategic insights
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
        {/* Main Chat Interface */}
        <div className="lg:col-span-3 space-y-6">
          {/* Agent Selection */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Select AI Agent
              </CardTitle>
              <CardDescription>
                Choose the specialized AI agent for your task
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      <div className="flex items-center gap-2">
                        <agent.icon className={`h-4 w-4 ${agent.color}`} />
                        <span>{agent.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                AI Conversation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Chat History */}
              <div className="h-96 overflow-y-auto space-y-4 border rounded-lg p-4 bg-muted/20">
                {responses.length === 0 ? (
                  <div className="text-center text-muted-foreground py-12">
                    <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Start a conversation with your AI agent</p>
                  </div>
                ) : (
                  responses.map((message, index) => (
                    <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground ml-auto' 
                          : 'bg-card border'
                      }`}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <div className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-card border rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        <span className="text-muted-foreground ml-2">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Textarea
                  value={currentPrompt}
                  onChange={(e) => setCurrentPrompt(e.target.value)}
                  placeholder="Ask your AI agent anything about content optimization, workflow automation, or strategic insights..."
                  className="min-h-[100px]"
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Press Ctrl+Enter to send
                  </div>
                  <Button type="submit" disabled={isLoading || !currentPrompt.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Available Agents */}
          <Card className="animate-fade-in" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Agents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all hover:border-primary/50 ${
                    selectedAgent === agent.id ? 'border-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedAgent(agent.id)}
                >
                  <div className="flex items-start gap-3">
                    <agent.icon className={`h-5 w-5 ${agent.color} flex-shrink-0 mt-0.5`} />
                    <div>
                      <div className="font-medium text-sm">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">{agent.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Prompts */}
          <Card className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Quick Prompts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {presetPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setCurrentPrompt(prompt)}
                >
                  <div className="text-xs">{prompt}</div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card className="animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Usage Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Calls Today</span>
                  <Badge variant="secondary">47/1000</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Response Time</span>
                  <Badge variant="secondary">1.2s avg</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Success Rate</span>
                  <Badge variant="secondary">98.5%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}