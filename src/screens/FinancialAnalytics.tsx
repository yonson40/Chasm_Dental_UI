import React from 'react';
import { Card } from '@/components/ui/card';
import { DollarSign, TrendingUp, Clock, Percent } from 'lucide-react';

// Mock financial data
const mockFinancialData = {
  totalRevenueYTD: 125678.50,
  avgMonthlyRevenue: 10473.21,
  totalAR: 35240.90,
  arOver90Days: 4150.00,
  avgReimbursementRate: 88.5, // Percentage
  avgDaysInAR: 32,
};

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export default function FinancialAnalytics() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-forestDark mb-6">Financial Analytics</h2>
      
      {/* Remove placeholder paragraph */}
      {/* <p className="text-forestDark-light">Financial analytics details will be displayed here.</p> */}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Revenue YTD */}
        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-forestDark-light">Total Revenue (YTD)</p>
              <h3 className="text-2xl font-bold text-forestDark mt-1">
                {formatCurrency(mockFinancialData.totalRevenueYTD)}
              </h3>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Total A/R */}
        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-forestDark-light">Total Accounts Receivable</p>
              <h3 className="text-2xl font-bold text-forestDark mt-1">
                {formatCurrency(mockFinancialData.totalAR)}
              </h3>
            </div>
            <div className="p-2 bg-amber-100 rounded-full">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
          </div>
        </Card>

        {/* Avg Reimbursement Rate */}
        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-forestDark-light">Avg Reimbursement Rate</p>
              <h3 className="text-2xl font-bold text-forestDark mt-1">
                {mockFinancialData.avgReimbursementRate}%
              </h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <Percent className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Avg Days in A/R */}
        <Card className="p-4 bg-white shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-forestDark-light">Avg Days in A/R</p>
              <h3 className="text-2xl font-bold text-forestDark mt-1">
                {mockFinancialData.avgDaysInAR} days
              </h3>
            </div>
            <div className="p-2 bg-teal-100 rounded-full">
              <Clock className="h-5 w-5 text-teal-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Placeholder for more detailed sections (Charts, Tables etc.) */}
      <Card className="p-4 bg-white shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-forestDark mb-4">Revenue Trends</h3>
        <p className="text-sm text-forestDark-light">Detailed revenue charts and tables will go here.</p>
        {/* Example: Could add a simple bar chart component later */}
      </Card>

      <Card className="p-4 bg-white shadow-sm">
        <h3 className="text-lg font-semibold text-forestDark mb-4">A/R Aging</h3>
        <p className="text-sm text-forestDark-light">A/R aging summary table will go here. (e.g., 0-30, 31-60, 61-90, 90+ days)</p>
        <p className="text-sm text-forestDark-light mt-2">
          A/R over 90 days: {formatCurrency(mockFinancialData.arOver90Days)}
        </p>
      </Card>

    </div>
  );
} 