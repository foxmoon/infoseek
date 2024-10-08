"use client"

import { useState, useEffect } from 'react';
import MainLayout from '@/components/main-layout';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Subscription {
  id: number;
  keyword: string;
  sources: string[];
  frequency: string;
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [newSubscription, setNewSubscription] = useState({
    keyword: '',
    sources: [] as string[],
    frequency: '',
  });

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  async function fetchSubscriptions() {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*');
    if (error) {
      console.error('Error fetching subscriptions:', error);
    } else {
      setSubscriptions(data || []);
    }
  }

  const handleAddSubscription = async () => {
    if (newSubscription.keyword && newSubscription.sources.length && newSubscription.frequency) {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([newSubscription])
        .select();
      if (error) {
        console.error('Error adding subscription:', error);
      } else {
        setSubscriptions([...subscriptions, data[0] as Subscription]);
        setNewSubscription({ keyword: '', sources: [], frequency: '' });
      }
    }
  };

  const handleDeleteSubscription = async (id: number) => {
    const { error } = await supabase
      .from('subscriptions')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting subscription:', error);
    } else {
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    }
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id}>
            <CardHeader>
              <CardTitle>{subscription.keyword}</CardTitle>
              <CardDescription>
                Sources: {subscription.sources.join(', ')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Frequency: {subscription.frequency}</p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={() => handleDeleteSubscription(subscription.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Subscription
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subscription</DialogTitle>
            <DialogDescription>
              Enter the details for your new subscription.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="keyword" className="text-right">
                Keyword
              </Label>
              <Input
                id="keyword"
                value={newSubscription.keyword}
                onChange={(e) => setNewSubscription({ ...newSubscription, keyword: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Sources</Label>
              <div className="col-span-3 space-y-2">
                {['Twitter', 'YouTube', 'Blogs', 'News'].map((source) => (
                  <div key={source} className="flex items-center space-x-2">
                    <Checkbox
                      id={source}
                      checked={newSubscription.sources.includes(source)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewSubscription({ ...newSubscription, sources: [...newSubscription.sources, source] });
                        } else {
                          setNewSubscription({ ...newSubscription, sources: newSubscription.sources.filter(s => s !== source) });
                        }
                      }}
                    />
                    <label htmlFor={source}>{source}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Frequency
              </Label>
              <Select
                onValueChange={(value) => setNewSubscription({ ...newSubscription, frequency: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddSubscription}>Add Subscription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}