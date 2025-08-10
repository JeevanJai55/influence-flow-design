import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Rocket, Target, TrendingUp, Users, Calendar, BarChart3, Zap, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                🚀 The Future of Influencer Marketing
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent leading-tight">
              OneInfluence
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform your influencer marketing strategy with AI-powered insights, 
              seamless campaign management, and data-driven performance optimization.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-elegant">
                <Link to="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-primary/20 hover:border-primary/40">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed to streamline your influencer marketing workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Smart Campaign Management",
                description: "Create, track, and optimize campaigns with AI-powered recommendations and real-time analytics."
              },
              {
                icon: Users,
                title: "Influencer Discovery",
                description: "Find the perfect influencers for your brand using advanced filtering and audience matching algorithms."
              },
              {
                icon: BarChart3,
                title: "Performance Analytics",
                description: "Deep insights into campaign performance, ROI tracking, and engagement metrics that matter."
              },
              {
                icon: Calendar,
                title: "Content Calendar",
                description: "Plan, schedule, and coordinate content across multiple influencers and platforms seamlessly."
              },
              {
                icon: TrendingUp,
                title: "Trending Topics",
                description: "Stay ahead of trends with real-time monitoring of viral content and emerging hashtags."
              },
              {
                icon: Zap,
                title: "Automated Workflows",
                description: "Streamline repetitive tasks with intelligent automation and customizable approval processes."
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
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

      {/* Stats Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Active Influencers" },
              { number: "1M+", label: "Campaigns Launched" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "$2.5B", label: "Revenue Generated" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
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
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our clients say about their success with OneInfluence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "OneInfluence transformed our influencer strategy. We saw a 300% increase in engagement within the first month.",
                author: "Sarah Chen",
                role: "Marketing Director, TechCorp",
                rating: 5
              },
              {
                quote: "The analytics and insights are game-changing. We can now make data-driven decisions with confidence.",
                author: "Mike Rodriguez",
                role: "Brand Manager, FashionForward",
                rating: 5
              },
              {
                quote: "The automation features saved us countless hours. Our team can now focus on strategy instead of manual tasks.",
                author: "Emily Thompson",
                role: "CMO, StartupSuccess",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden border-border/50">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Scale Your Influence?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Join thousands of brands who have transformed their influencer marketing with OneInfluence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 bg-background text-foreground hover:bg-background/90">
              <Link to="/dashboard">
                Start Free Trial <Rocket className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <div className="flex items-center gap-2 text-primary-foreground/90">
              <CheckCircle className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl font-bold mb-4">🚀 OneInfluence</div>
          <p className="text-muted-foreground mb-8">
            Empowering brands to create authentic connections through strategic influencer partnerships.
          </p>
          <div className="text-sm text-muted-foreground">
            © 2024 OneInfluence. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}