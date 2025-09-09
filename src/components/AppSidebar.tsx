import { useState } from "react";
import { 
  Home,
  Sparkles, 
  Users, 
  Megaphone, 
  CalendarDays, 
  BarChart3, 
  Settings,
  Search,
  Plus,
  TrendingUp,
  Lightbulb,
  FileText,
  Link2,
  Folder,
  Bot,
  Palette,
  Target,
  Mail
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Campaigns", url: "/campaigns", icon: Megaphone },
  { title: "Influencers", url: "/influencers", icon: Users },
  { title: "Content", url: "/content", icon: FileText },
  { title: "Calendar", url: "/content-calendar", icon: CalendarDays },
  { title: "Reports", url: "/reports", icon: BarChart3 },
];

const creativeItems = [
  { title: "AI Playground", url: "/ai-playground", icon: Bot },
  { title: "Brainstorming", url: "/brainstorming", icon: Lightbulb },
  { title: "Templates", url: "/templates", icon: Palette },
  { title: "Bio Link Builder", url: "/bio-link", icon: Link2 },
  { title: "Brand Assets", url: "/brand-assets", icon: Folder },
];

const analyticsItems = [
  { title: "Top Performers", url: "/top-performers", icon: TrendingUp },
  { title: "Trending", url: "/trending", icon: Sparkles },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/dashboard") return currentPath === "/dashboard";
    return currentPath.startsWith(path);
  };

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `w-full transition-all duration-200 rounded-xl ${collapsed ? "h-10 justify-center px-2" : "h-12 justify-start"} ${
      isActive 
        ? "bg-gradient-primary text-primary-foreground shadow-lg font-semibold transform scale-[1.02]" 
        : "hover:bg-accent/50 text-muted-foreground hover:text-foreground hover:shadow-sm"
    }`;

  return (
    <TooltipProvider>
      <Sidebar
        className={`border-r border-border/50 shadow-sm ${collapsed ? "w-20" : "w-72"}`}
        collapsible="icon"
      >
        <SidebarContent className={`py-6 ${collapsed ? "px-2" : "px-4"}`}>
        {/* Logo/Brand */}
        <div className="mb-8 px-2">
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                  OneInfluence
                </span>
                <span className="text-xs text-muted-foreground">Creative Hub</span>
              </div>
            </div>
          ) : (
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto shadow-lg">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className={`px-2 text-xs font-semibold uppercase tracking-wider ${collapsed ? "sr-only" : "text-muted-foreground mb-2"}`}>
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <NavLink 
                            to={item.url} 
                            end={item.url === "/dashboard"}
                            className={getNavCls}
                          >
                            <item.icon className="h-5 w-5 flex-shrink-0 mx-auto" />
                          </NavLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <NavLink 
                        to={item.url} 
                        end={item.url === "/dashboard"}
                        className={getNavCls}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium ml-3">{item.title}</span>
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Creative Tools */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className={`px-2 text-xs font-semibold uppercase tracking-wider ${collapsed ? "sr-only" : "text-muted-foreground mb-2"}`}>
            Creative
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {creativeItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <NavLink 
                            to={item.url} 
                            className={getNavCls}
                          >
                            <item.icon className="h-5 w-5 flex-shrink-0 mx-auto" />
                          </NavLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <NavLink 
                        to={item.url} 
                        className={getNavCls}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium ml-3">{item.title}</span>
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics */}
        <SidebarGroup className="mb-6">
          <SidebarGroupLabel className={`px-2 text-xs font-semibold uppercase tracking-wider ${collapsed ? "sr-only" : "text-muted-foreground mb-2"}`}>
            Analytics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {collapsed ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <NavLink 
                            to={item.url} 
                            className={getNavCls}
                          >
                            <item.icon className="h-5 w-5 flex-shrink-0 mx-auto" />
                          </NavLink>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.title}</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <NavLink 
                        to={item.url} 
                        className={getNavCls}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        <span className="font-medium ml-3">{item.title}</span>
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings at bottom */}
        <div className="mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                {collapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <NavLink 
                        to="/settings" 
                        className={getNavCls}
                      >
                        <Settings className="h-5 w-5 flex-shrink-0 mx-auto" />
                      </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <NavLink 
                    to="/settings" 
                    className={getNavCls}
                  >
                    <Settings className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium ml-3">Settings</span>
                  </NavLink>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
    </TooltipProvider>
  );
}