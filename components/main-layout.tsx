"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Home, Users, BarChart2, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Dashboard' },
    { href: '/subscriptions', icon: Users, label: 'Subscriptions' },
    { href: '/analytics', icon: BarChart2, label: 'Analytics' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex flex-col h-full p-3 bg-gray-50 dark:bg-gray-900 w-64">
      <div className="space-y-3">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">InfoTracker</h2>
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            {navItems.map((item) => (
              <li key={item.href} className="rounded-sm">
                <Link href={item.href} passHref>
                  <Button
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center p-2 mt-auto bg-gray-100 dark:bg-gray-800 rounded-md">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-medium">User Name</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const TopBar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b">
      <div className="flex-1 px-4">
        <Input type="text" placeholder="Search..." className="max-w-sm" />
      </div>
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}