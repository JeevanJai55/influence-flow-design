import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Bell, User, LogOut, Sparkles, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import AIChat from "@/components/AIChat";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Don't show layout on landing page and auth page
  const isPublicPage = location.pathname === '/' || location.pathname === '/auth';
  
  // Extract current page from pathname for AI context
  const getCurrentPage = () => {
    const path = location.pathname.slice(1); // Remove leading slash
    return path || "dashboard";
  };
  
  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border/50 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
            <div className="flex items-center justify-between h-full px-4 lg:px-8">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
                <Link to="/dashboard" className="flex items-center gap-3 text-xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-lg">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="hidden sm:block bg-gradient-primary bg-clip-text text-transparent">
                    OneInfluence
                  </span>
                </Link>
              </div>
              
              <div className="flex items-center gap-2">
                <ThemeToggle />
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all duration-200 h-10 w-10"
                >
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full flex items-center justify-center">
                    <div className="h-1.5 w-1.5 bg-primary-foreground rounded-full"></div>
                  </div>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-all duration-200 h-10 w-10"
                    >
                      <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 p-2">
                     <div className="flex items-center gap-3 p-2 mb-2 rounded-lg bg-accent/50">
                       <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                         <User className="h-5 w-5 text-primary-foreground" />
                       </div>
                       <div className="flex-1 min-w-0">
                         <p className="text-sm font-medium truncate">
                           {user?.user_metadata?.full_name || "User"}
                         </p>
                         <p className="text-xs text-muted-foreground truncate">
                           {user?.email}
                         </p>
                       </div>
                     </div>
                    <DropdownMenuItem 
                      onClick={logout} 
                      className="text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8 space-y-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
        
        {/* AI Chat - Fixed position across all pages */}
        <AIChat currentPage={getCurrentPage()} />
      </div>
    </SidebarProvider>
  );
}