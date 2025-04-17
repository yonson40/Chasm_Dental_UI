import React from 'react';
import { IntelligentDashboard } from '@/components/intelligent-dashboard';
import { useA2A } from '@/components/a2a-provider';
import { Card } from '@/components/ui/card';
import { Clock, CheckCircle, AlertCircle, Activity, BarChart2, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const { tasks, pendingApprovals, timeSavedToday } = useA2A();
  
  // Calculate statistics for the traditional dashboard metrics
  const totalClaims = 248;
  const pendingClaims = 36;
  const cleanClaimRate = 95.2;
  const averageReimbursement = 842;
  
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
      <h2 className="text-2xl font-bold text-forestDark dark:text-beige mb-6">Dashboard</h2>
      
      {/* Traditional Dashboard Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 bg-white dark:bg-forestDark shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-forestDark-light dark:text-beige/70">Total Claims</p>
              <h3 className="text-2xl font-bold text-forestDark dark:text-beige mt-1">
                {totalClaims}
              </h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900/30">
              <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400">
            +12% from last month
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-forestDark shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-forestDark-light dark:text-beige/70">Pending Claims</p>
              <h3 className="text-2xl font-bold text-forestDark dark:text-beige mt-1">
                {pendingClaims}
              </h3>
            </div>
            <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900/30">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400">
            -8% from last month
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-forestDark shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-forestDark-light dark:text-beige/70">Clean Claim Rate</p>
              <h3 className="text-2xl font-bold text-forestDark dark:text-beige mt-1">
                {cleanClaimRate}%
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-full dark:bg-green-900/30">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400">
            +2.3% from last month
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-forestDark shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-forestDark-light dark:text-beige/70">Avg. Reimbursement</p>
              <h3 className="text-2xl font-bold text-forestDark dark:text-beige mt-1">
                {formatCurrency(averageReimbursement)}
              </h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900/30">
              <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-2 text-xs text-green-600 dark:text-green-400">
            +5% from last month
          </div>
        </Card>
      </div>
      
      {/* Intelligent Dashboard */}
      <IntelligentDashboard className="mb-6" />
      
      {/* Recent Claims Table */}
      <Card className="bg-white dark:bg-forestDark shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-forestLight-dark/20 dark:border-forestDark-light/20">
          <h3 className="text-lg font-semibold text-forestDark dark:text-beige">Recent Claims</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-forestLight/50 dark:bg-forestDark-light/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light dark:text-beige/70 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light dark:text-beige/70 uppercase tracking-wider">
                  Procedure
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light dark:text-beige/70 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light dark:text-beige/70 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light dark:text-beige/70 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-forestDark-light dark:text-beige/70 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forestLight-dark/10 dark:divide-forestDark-light/10">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-forestDark dark:text-beige">Sarah Johnson</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark dark:text-beige">D2750 - Crown</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark-light dark:text-beige/70">Apr 15, 2025</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark dark:text-beige">{formatCurrency(1250)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Approved
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-forestGreen hover:text-forestGreen-dark dark:text-forestGreen-light dark:hover:text-forestGreen">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-forestDark dark:text-beige">John Smith</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark dark:text-beige">D2950 - Core Buildup</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark-light dark:text-beige/70">Apr 14, 2025</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark dark:text-beige">{formatCurrency(350)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                    Pending
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-forestGreen hover:text-forestGreen-dark dark:text-forestGreen-light dark:hover:text-forestGreen">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-forestDark dark:text-beige">Emily Davis</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark dark:text-beige">D1110 - Cleaning</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark-light dark:text-beige/70">Apr 13, 2025</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark dark:text-beige">{formatCurrency(120)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Approved
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-forestGreen hover:text-forestGreen-dark dark:text-forestGreen-light dark:hover:text-forestGreen">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-forestDark dark:text-beige">Michael Brown</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark dark:text-beige">D4341 - Scaling & Root Planing</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark-light dark:text-beige/70">Apr 12, 2025</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark dark:text-beige">{formatCurrency(780)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                    Denied
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-forestGreen hover:text-forestGreen-dark dark:text-forestGreen-light dark:hover:text-forestGreen">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-forestDark dark:text-beige">Jessica Wilson</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark dark:text-beige">D0220 - X-ray (PA)</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark-light dark:text-beige/70">Apr 11, 2025</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-forestDark dark:text-beige">{formatCurrency(45)}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Approved
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-forestGreen hover:text-forestGreen-dark dark:text-forestGreen-light dark:hover:text-forestGreen">
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
