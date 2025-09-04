import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  ArrowRight, 
  Rocket, 
  Target, 
  TrendingUp, 
  Users, 
  Calendar, 
  BarChart3, 
  Zap, 
  Star, 
  CheckCircle,
  Shield,
  Clock,
  Globe,
  MessageSquare,
  Filter,
  Camera,
  Smartphone,
  Monitor,
  Palette,
  Brain,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Rocket className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                OneInfluence
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-6">
                <a href="#features" className="story-link text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <a href="#pricing" className="story-link text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </a>
                <a href="#testimonials" className="story-link text-muted-foreground hover:text-foreground transition-colors">
                  Testimonials
                </a>
              </nav>
              
              <ThemeToggle />
              
              <div className="flex items-center space-x-3">
                <Button variant="ghost" asChild className="hover-scale">
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button asChild className="bg-gradient-primary hover:opacity-90 hover-scale">
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="flex justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium hover-scale">
                🚀 Next-Gen Influencer Project Management
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent leading-tight">
              Manage Influence<br />Like Never Before
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The complete content management platform for social media creators and brands. 
              Plan campaigns, create content, schedule posts, and track performance - all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-elegant hover-scale">
                <Link to="/auth">
                  Start Creating Content <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary/20 hover:border-primary/40 hover-scale">
                View Live Demo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="pt-12 flex flex-col items-center space-y-6">
              <p className="text-sm text-muted-foreground">Trusted by creators and brands worldwide</p>
              <div className="flex items-center justify-center flex-wrap gap-8 opacity-60">
                <div className="text-lg font-semibold">@InfluencerX</div>
                <div className="text-lg font-semibold">CreativeStudio</div>
                <div className="text-lg font-semibold">BrandFlow</div>
                <div className="text-lg font-semibold">ContentHouse</div>
              </div>
              
              {/* Real metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Content Pieces</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Management Dashboard Preview */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Content Management Made Simple
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your content creation workflow with visual boards, AI-powered brainstorming, and automated scheduling.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Project Stats */}
            <div className="space-y-6 animate-fade-in">
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 hover-scale">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-3">
                      <Activity className="h-6 w-6 text-primary" />
                      Active Projects
                    </CardTitle>
                    <Badge variant="secondary">23</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Beauty Campaign Q1</span>
                      <Badge className="bg-green-500/10 text-green-500">On Track</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tech Launch Event</span>
                      <Badge className="bg-yellow-500/10 text-yellow-500">Review</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fashion Week Prep</span>
                      <Badge className="bg-blue-500/10 text-blue-500">Planning</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-primary" />
                    Project Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span className="text-sm">Influencer Selection - Completed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      <span className="text-sm">Content Creation - In Progress</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-muted rounded-full"></div>
                      <span className="text-sm">Campaign Launch - Pending</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative animate-scale-in">
              <Card className="overflow-hidden shadow-elegant">
                <CardHeader className="bg-gradient-primary text-primary-foreground">
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Campaign Dashboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-card p-4 rounded-lg border hover-scale">
                      <div className="text-2xl font-bold text-primary">127</div>
                      <div className="text-sm text-muted-foreground">Active Influencers</div>
                    </div>
                    <div className="bg-card p-4 rounded-lg border hover-scale">
                      <div className="text-2xl font-bold text-primary">89%</div>
                      <div className="text-sm text-muted-foreground">Completion Rate</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover-scale">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Camera className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">Content Review</div>
                          <div className="text-sm text-muted-foreground">12 items pending</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover-scale">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-accent-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">Team Messages</div>
                          <div className="text-sm text-muted-foreground">3 unread</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-gradient-to-r from-muted/20 via-background to-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Content Management Suite
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create, manage, and optimize your content strategy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Content Planning",
                description: "Visual content boards with drag-and-drop organization, content calendar integration, and workflow management.",
                color: "text-blue-500"
              },
              {
                icon: Brain,
                title: "AI Brainstorming",
                description: "Miro-style flowcharts and mind maps powered by AI to generate content ideas and strategies.",
                color: "text-green-500"
              },
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "Auto-schedule posts across platforms with optimal timing and content distribution.",
                color: "text-purple-500"
              },
              {
                icon: BarChart3,
                title: "Performance Analytics",
                description: "Track engagement, reach, and conversions with detailed analytics and trending insights.",
                color: "text-orange-500"
              },
              {
                icon: Palette,
                title: "Brand Assets",
                description: "Centralized brand kit with logos, fonts, colors, and templates for consistent content creation.",
                color: "text-pink-500"
              },
              {
                icon: Zap,
                title: "Bio Link Builder",
                description: "Create stunning Instagram and social media bio pages with analytics and customization.",
                color: "text-red-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="space-y-4">
                  <div className={`w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Multi-Platform Content Creation
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create and distribute content across all major social platforms seamlessly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: "Mobile-First Design",
                description: "Manage campaigns on-the-go with our responsive mobile interface",
                platforms: ["iOS App", "Android App", "Mobile Web"]
              },
              {
                icon: Globe,
                title: "Cross-Platform Integration",
                description: "Connect Instagram, TikTok, YouTube, Twitter, and LinkedIn campaigns",
                platforms: ["Instagram", "TikTok", "YouTube", "Twitter", "LinkedIn"]
              },
              {
                icon: Palette,
                title: "Brand Consistency",
                description: "Maintain brand guidelines across all influencer content and platforms",
                platforms: ["Brand Kit", "Asset Library", "Style Guide"]
              }
            ].map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {item.platforms.map((platform, idx) => (
                      <Badge key={idx} variant="secondary" className="hover-scale">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "25K+", label: "Content Pieces Created", icon: Target },
              { number: "500K+", label: "Posts Scheduled", icon: Rocket },
              { number: "99%", label: "Creator Satisfaction", icon: Star },
              { number: "$50M+", label: "Creator Revenue Enabled", icon: TrendingUp }
            ].map((stat, index) => (
              <div key={index} className="space-y-4 hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by Project Managers Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See how teams transformed their influencer project management
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "OneInfluence completely transformed how we manage influencer projects. Our delivery time improved by 60% and our team collaboration is seamless.",
                author: "Sarah Chen",
                role: "Project Manager, TechCorp",
                rating: 5,
                metric: "60% faster delivery"
              },
              {
                quote: "The visual project boards and automated workflows saved us countless hours. We can now manage 3x more campaigns with the same team size.",
                author: "Mike Rodriguez",
                role: "Campaign Director, FashionForward",
                rating: 5,
                metric: "3x more campaigns"
              },
              {
                quote: "The real-time collaboration features are game-changing. Our remote team feels more connected than ever before.",
                author: "Emily Thompson",
                role: "Head of Marketing, StartupSuccess",
                rating: 5,
                metric: "100% remote team"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden border-border/50 hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <Badge variant="secondary" className="hover-scale">{testimonial.metric}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-lg mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Project Management?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Join thousands of teams who have revolutionized their influencer campaign management with OneInfluence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 bg-background text-foreground hover:bg-background/90 hover-scale">
              <Link to="/auth">
                Start Managing Projects <Rocket className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <CheckCircle className="h-5 w-5" />
              <span>14-day free trial • No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Rocket className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">OneInfluence</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering teams to manage influencer campaigns with precision and efficiency.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="story-link hover:text-foreground">Features</a></li>
                <li><a href="#" className="story-link hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="story-link hover:text-foreground">Integrations</a></li>
                <li><a href="#" className="story-link hover:text-foreground">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="story-link hover:text-foreground">About</a></li>
                <li><a href="#" className="story-link hover:text-foreground">Blog</a></li>
                <li><a href="#" className="story-link hover:text-foreground">Careers</a></li>
                <li><a href="#" className="story-link hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="story-link hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="story-link hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="story-link hover:text-foreground">Community</a></li>
                <li><a href="#" className="story-link hover:text-foreground">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            © 2024 OneInfluence. All rights reserved. Built for the future of project management.
          </div>
        </div>
      </footer>
    </div>
  );
}