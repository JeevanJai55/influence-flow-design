import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  Calendar, 
  BarChart3, 
  Settings,
  Search,
  Plus,
  Star,
  TrendingUp,
  Lightbulb,
  FileText
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Brainstorming", url: "/brainstorming", icon: Lightbulb },
  { title: "Content Management", url: "/content", icon: FileText },
  { title: "Influencers", url: "/influencers", icon: Users, comingSoon: true },
  { title: "Campaigns", url: "/campaigns", icon: Target, comingSoon: true },
  { title: "Analytics", url: "/analytics", icon: BarChart3, comingSoon: true },
];

const quickActions = [
  { title: "Find Influencers", url: "/discover", icon: Search },
  { title: "New Campaign", url: "/campaigns/new", icon: Plus },
  { title: "Top Performers", url: "/top-performers", icon: Star },
  { title: "Trending", url: "/trending", icon: TrendingUp },
  { title: "Content Calendar", url: "/calendar", icon: Calendar },
  { title: "Brand Assets", url: "/assets", icon: Target },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Templates", url: "/templates", icon: Users },
  { title: "AI Playground", url: "/playground", icon: Plus },
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
    `w-full justify-start transition-smooth ${
      isActive 
        ? "bg-gradient-primary text-primary-foreground shadow-elegant font-medium" 
        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
    }`;

  return (
    <Sidebar
      className={`border-r border-border/50 ${collapsed ? "w-14" : "w-64 md:w-64"}`}
      collapsible="icon"
    >
      <SidebarContent className="px-3 py-4">
        {/* Logo/Brand */}
        <div className="mb-6 px-3">
          {!collapsed ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">🚀</span>
              </div>
              <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                OneInfluence
              </span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
              <span className="text-primary-foreground font-bold text-sm">🚀</span>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.comingSoon ? (
                      <div className="w-full justify-start text-muted-foreground/50 cursor-not-allowed flex items-center">
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="mr-auto">{item.title}</span>
                            <span className="text-xs bg-muted/50 px-2 py-1 rounded">Soon</span>
                          </>
                        )}
                      </div>
                    ) : (
                      <NavLink 
                        to={item.url} 
                        end={item.url === "/"}
                        className={getNavCls}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
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
                <NavLink 
                  to="/settings" 
                  className={getNavCls}
                >
                  <Settings className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && <span>Settings</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}