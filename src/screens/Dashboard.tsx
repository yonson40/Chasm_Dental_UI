import React from 'react';
import { Link } from 'react-router-dom';
import { IntelligentDashboard } from '@/components/intelligent-dashboard';
import { useA2A } from '@/components/a2a-provider';
import { Card } from '@/components/ui/card';
import { Clock, CheckCircle, AlertCircle, Activity, BarChart2, DollarSign } from 'lucide-react';

export default function Dashboard() {
  // Calculate statistics for the traditional dashboard metrics
  const pendingClaims = 36;
  const cleanClaimRate = 95.2;
  const averageReimbursement = 842;
  const avgDaysInAR = 28; // Mock data for Avg Days in A/R
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-forestDark mb-6">Dashboard</h2>
      
      {/* Traditional Dashboard Metrics - Remove Total Claims, adjust grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1 (Total Claims) - REMOVED */}
        {/* <Card className="p-4 bg-white shadow-sm"> ... </Card> */}

        {/* Card 2 - Pending Claims - Made interactive */}
        <Link to="/claim-submission" className="block">
          <Card className="p-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-forestDark-light">Pending Claims</p>
                <h3 className="text-2xl font-bold text-forestDark mt-1">
                  {pendingClaims}
                </h3>
              </div>
              <div className="p-2 bg-amber-100 rounded-full">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600">
              -8% from last month
            </div>
          </Card>
        </Link>

        {/* Card 3 - Clean Claim Rate */}
        <Card className="p-4 bg-white shadow-sm h-full">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-forestDark-light">Clean Claim Rate</p>
              <h3 className="text-2xl font-bold text-forestDark mt-1">
                {cleanClaimRate}%
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-green-600">
            +2.3% from last month
          </div>
        </Card>

        {/* Card 4 - Avg. Reimbursement - Made interactive */}
        <Link 
          to="/financial-analytics" 
          className="block text-left w-full"
        >
          <Card className="p-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition-shadow h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-forestDark-light">Avg. Reimbursement</p>
                <h3 className="text-2xl font-bold text-forestDark mt-1">
                  {formatCurrency(averageReimbursement)}
                </h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-green-600">
              +5% from last month
            </div>
          </Card>
        </Link>

        {/* Card 5 - Avg Days in A/R (New) */}
        <Card className="p-4 bg-white shadow-sm h-full">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-forestDark-light">Avg. Days in A/R</p>
              <h3 className="text-2xl font-bold text-forestDark mt-1">
                {avgDaysInAR}
              </h3>
            </div>
            <div className="p-2 bg-teal-100 rounded-full">
              <Clock className="h-5 w-5 text-teal-600" />
            </div>
          </div>
          <div className="mt-2 text-xs text-red-600">
            +2 days from last month
          </div>
        </Card>
      </div>
      
      {/* Intelligent Dashboard Component */}
      <IntelligentDashboard className="mb-6" />
      
      {/* Recent Claims Table */}
      <Card className="bg-white shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-taupe/20">
          <h3 className="text-lg font-semibold text-forestDark">Recent Claims</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-forestLight/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light uppercase tracking-wider">
                  Procedure
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-forestDark-light uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-taupe/10">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-forestDark">Sarah Johnson</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark">D2750 - Crown</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark-light">Apr 15, 2025</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark">{formatCurrency(1250)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Approved
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-forestGreen hover:text-forestGreen-dark">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-forestDark">John Smith</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark">D2950 - Core Buildup</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark-light">Apr 14, 2025</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark">{formatCurrency(350)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                    Pending
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-forestGreen hover:text-forestGreen-dark">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-forestDark">Emily Davis</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark">D1110 - Cleaning</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark-light">Apr 13, 2025</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark">{formatCurrency(120)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Approved
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-forestGreen hover:text-forestGreen-dark">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-forestDark">Michael Brown</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark">D4341 - Scaling & Root Planing</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark-light">Apr 12, 2025</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark">{formatCurrency(780)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Denied
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-forestGreen hover:text-forestGreen-dark">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-forestDark">Jessica Wilson</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark">D0220 - X-ray (PA)</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark-light">Apr 11, 2025</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark">{formatCurrency(45)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Approved
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-forestGreen hover:text-forestGreen-dark">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
