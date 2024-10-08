import MainLayout from '@/components/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: subscriptionsCount } = await supabase
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })

  const { data: latestUpdates } = await supabase
    .from('updates')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <MainLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Subscriptions
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionsCount?.count || 0}</div>
          </CardContent>
        </Card>
        {/* Add more cards for other statistics */}
      </div>
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
            <CardDescription>
              Latest information from your subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {latestUpdates && latestUpdates.length > 0 ? (
              <ul>
                {latestUpdates.map((update) => (
                  <li key={update.id}>{update.content}</li>
                ))}
              </ul>
            ) : (
              <p>No recent updates available.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 flex justify-end">
        <Link href="/subscriptions">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Subscription
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
}