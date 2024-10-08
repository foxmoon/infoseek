"use client"

import React from 'react';
import MainLayout from '@/components/main-layout';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch id="push-notifications" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="notification-frequency">Notification Frequency</Label>
              <Select>
                <SelectTrigger id="notification-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Update your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="johndoe" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Manage your data and exports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Export Data</Label>
              <p className="text-sm text-muted-foreground">Download all your data in a CSV format</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Export Data</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}