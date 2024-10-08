"use client"

import React from 'react';
import MainLayout from '@/components/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const barChartData = [
  { name: 'AI', updates: 120 },
  { name: 'Climate', updates: 80 },
  { name: 'Crypto', updates: 40 },
  { name: 'Space', updates: 30 },
  { name: 'Health', updates: 50 },
];

const pieChartData = [
  { name: 'Twitter', value: 400 },
  { name: 'YouTube', value: 300 },
  { name: 'Blogs', value: 200 },
  { name: 'News', value: 100 },
];

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)'];

export default function AnalyticsPage() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Updates by Keyword</CardTitle>
            <CardDescription>Number of updates for top keywords</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="updates" fill="var(--chart-1)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Updates by Source</CardTitle>
            <CardDescription>Distribution of updates across different sources</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}