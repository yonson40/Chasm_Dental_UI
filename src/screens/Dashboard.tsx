import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Search
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blueBlack dark:text-beige">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search claims..." 
              className="pl-10 pr-4 py-2 rounded-md border border-input bg-background"
            />
          </div>
          <Button>New Claim</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">248</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">36</div>
            <p className="text-xs text-muted-foreground mt-1">-8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clean Claim Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">95.2%</div>
            <p className="text-xs text-muted-foreground mt-1">+2.4% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Reimbursement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$842</div>
            <p className="text-xs text-muted-foreground mt-1">+$56 from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Claims */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Claims</CardTitle>
            <Button variant="outline" size="sm">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Overview of your most recent claim submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Patient</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Procedure</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">Sarah Johnson</td>
                  <td className="py-3 px-4">D2740 - Crown</td>
                  <td className="py-3 px-4">Apr 15, 2025</td>
                  <td className="py-3 px-4">$1,200.00</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Approved
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">Michael Chen</td>
                  <td className="py-3 px-4">D7140 - Extraction</td>
                  <td className="py-3 px-4">Apr 14, 2025</td>
                  <td className="py-3 px-4">$185.00</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">Emily Rodriguez</td>
                  <td className="py-3 px-4">D0120 - Exam</td>
                  <td className="py-3 px-4">Apr 12, 2025</td>
                  <td className="py-3 px-4">$95.00</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      <XCircle className="mr-1 h-3 w-3" />
                      Denied
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 px-4">David Wilson</td>
                  <td className="py-3 px-4">D2150 - Filling</td>
                  <td className="py-3 px-4">Apr 10, 2025</td>
                  <td className="py-3 px-4">$210.00</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Approved
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Jessica Brown</td>
                  <td className="py-3 px-4">D1110 - Cleaning</td>
                  <td className="py-3 px-4">Apr 8, 2025</td>
                  <td className="py-3 px-4">$120.00</td>
                  <td className="py-3 px-4">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Approved
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">View</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tasks and Claim Success Rate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks that require your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-4 mt-0.5">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Verify insurance for new patients</p>
                    <Badge variant="outline">High</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">5 patients need verification</p>
                  <Progress value={30} className="h-2" />
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-0.5">
                  <FileText className="h-5 w-5 text-mossGreen" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Submit pending claims</p>
                    <Badge variant="outline">Medium</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">8 claims ready for submission</p>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-0.5">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Review denied claims</p>
                    <Badge variant="outline">High</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">3 claims need review</p>
                  <Progress value={10} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Claim Success Rate</CardTitle>
            <CardDescription>Performance over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[220px]">
              <div className="text-center">
                <div className="text-5xl font-bold text-mossGreen">95.2%</div>
                <p className="text-sm text-muted-foreground mt-2">Clean Claim Rate</p>
                <div className="flex items-center justify-center mt-4 space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">248</div>
                    <p className="text-xs text-muted-foreground">Total Claims</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">236</div>
                    <p className="text-xs text-muted-foreground">Approved</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Denied</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
