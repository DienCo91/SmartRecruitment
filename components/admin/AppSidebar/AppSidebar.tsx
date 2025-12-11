'use client';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Router } from '@/constants';
import { useLogout } from '@/hooks/useLogout';
import {
  BriefcaseBusiness,
  Building2,
  FileUser,
  HomeIcon,
  Library,
  LogOutIcon,
  User2,
  Users,
} from 'lucide-react';
import Link from 'next/link';

export function AppSidebar() {
  const logout = useLogout();
  const items = [
    {
      title: 'Home',
      url: Router.ADMIN,
      icon: HomeIcon,
    },
    {
      title: 'Companies',
      url: Router.COMPANIES_MANAGER,
      icon: Building2,
    },
    {
      title: 'Candidates',
      url: Router.CANDIDATE_MANAGER,
      icon: Users,
    },
    {
      title: 'Jobs',
      url: Router.JOB_MANAGER,
      icon: BriefcaseBusiness,
    },
    {
      title: 'Resumes',
      url: Router.RESUME_MANAGER,
      icon: FileUser,
    },
    {
      title: 'Blogs',
      url: Router.BLOG_MANAGER,
      icon: Library,
    },
  ];

  const onLogout = () => {
    logout();
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="">ADMIN</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <SidebarMenuButton onClick={onLogout} className="text-red-500">
                <LogOutIcon />
                <div>Logout</div>
              </SidebarMenuButton>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
