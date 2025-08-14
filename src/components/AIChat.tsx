import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle,
  Send,
  X,
  Minimize2,
  Maximize2,
  Bot,
  User
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AIChatProps {
  currentPage?: string;
}

export default function AIChat({ currentPage = "dashboard" }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello! I'm your AI assistant. I can help you with ${currentPage} related questions and tasks. What would you like to know?`,
      role: "assistant",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response based on current page context
    setTimeout(() => {
      const aiResponse = generateContextualResponse(input, currentPage);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: "assistant",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const generateContextualResponse = (query: string, page: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Content Management responses
    if (page.includes("content")) {
      if (lowerQuery.includes("create") || lowerQuery.includes("new")) {
        return "To create new content, click the 'New Content' button. You can set the title, description, platform, priority, and assign it to team members. The content will start in the 'To Do' column.";
      }
      if (lowerQuery.includes("status") || lowerQuery.includes("move")) {
        return "You can drag and drop content cards between different status columns: To Do → In Progress → In Review → Publish. When you move content to 'Publish', you'll see a celebration confetti effect!";
      }
      if (lowerQuery.includes("priority")) {
        return "Content priority is shown with colored dots: Red for High priority, Yellow for Medium, and Green for Low priority. Set priority when creating new content.";
      }
    }

    // Brainstorming responses
    if (page.includes("brainstorm")) {
      if (lowerQuery.includes("idea") || lowerQuery.includes("create")) {
        return "Great! To add a new brainstorming idea, click 'New Idea' and fill in the title, description, category, and priority. Your team can vote on ideas and move promising ones to the content pipeline.";
      }
      if (lowerQuery.includes("vote") || lowerQuery.includes("rating")) {
        return "Team members can vote on ideas by clicking the star button. Higher voted ideas indicate more team support and can help prioritize which concepts to develop into content.";
      }
    }

    // Dashboard responses
    if (page.includes("dashboard")) {
      if (lowerQuery.includes("metric") || lowerQuery.includes("analytics")) {
        return "Your dashboard shows key metrics including total followers, engagement rate, content published, and revenue generated. These update in real-time based on your connected social media accounts.";
      }
      if (lowerQuery.includes("campaign") || lowerQuery.includes("performance")) {
        return "Track your campaign performance through the metrics cards and charts. You can see which content performs best and optimize your strategy accordingly.";
      }
    }

    // AI Playground responses
    if (page.includes("playground") || page.includes("ai")) {
      if (lowerQuery.includes("agent") || lowerQuery.includes("tool")) {
        return "The AI Playground offers specialized agents: Content Creator for generating posts, Strategy Advisor for campaign planning, Analytics Expert for data insights, and Trend Analyst for staying current.";
      }
    }

    // Generic helpful responses
    if (lowerQuery.includes("help") || lowerQuery.includes("how")) {
      return `I'm here to help with ${page} features! You can ask me about creating content, managing workflows, analyzing performance, or any other questions about this platform.`;
    }

    if (lowerQuery.includes("feature") || lowerQuery.includes("what")) {
      return `This ${page} section includes powerful features for influencer CRM management. Would you like me to explain any specific functionality?`;
    }

    return "I understand you're asking about " + query + ". Could you be more specific about what you'd like to know? I'm here to help with any questions about this platform!";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-primary hover:shadow-glow transition-smooth shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-50 shadow-2xl transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-80 h-96'
    }`}>
      <CardHeader className="pb-2 px-4 py-3 bg-gradient-primary text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-sm font-medium">AI Assistant</CardTitle>
            <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
              {currentPage}
            </Badge>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-white/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-80">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.role === 'assistant' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      {message.role === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">{formatTime(message.timestamp)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-gradient-primary hover:shadow-glow"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}