import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';

// Mock data for KPIs
const kpiData = {
  today: {
    pendingClaims: 36,
    cleanClaimRate: 95.2,
    avgReimbursement: 842,
  },
  week: {
    pendingClaims: 45,
    cleanClaimRate: 94.8,
    avgReimbursement: 815,
  },
  month: {
    pendingClaims: 182,
    cleanClaimRate: 93.5,
    avgReimbursement: 798,
  },
};

type KpiPeriod = keyof typeof kpiData;

const DashboardKpiBar: React.FC = () => {
  const [period, setPeriod] = useState<KpiPeriod>('today');

  const currentData = kpiData[period];

  // Placeholder function for currency formatting
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="bg-white p-3 shadow-sm border border-taupe/20">
      <div className="flex items-center justify-between space-x-4">
        {/* KPIs */}
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-xs text-forestDark-light uppercase tracking-wider">Pending Claims</div>
            <div className="text-3xl font-semibold text-forestDark mt-1">{currentData.pendingClaims}</div>
          </div>
          <div className="border-l border-taupe/20 h-10"></div> {/* Divider */}
          <div className="text-center">
            <div className="text-xs text-forestDark-light uppercase tracking-wider">Clean Claim %</div>
            <div className="text-3xl font-semibold text-forestDark mt-1">{currentData.cleanClaimRate}%</div>
          </div>
          <div className="border-l border-taupe/20 h-10"></div> {/* Divider */}
          <div className="text-center">
            <div className="text-xs text-forestDark-light uppercase tracking-wider">Avg. Reimbursement</div>
            <div className="text-3xl font-semibold text-forestDark mt-1">{formatCurrency(currentData.avgReimbursement)}</div>
          </div>
        </div>
        
        {/* Period Selector */}
        <div className="flex items-center">
          <Select value={period} onValueChange={(value) => setPeriod(value as KpiPeriod)}>
            <SelectTrigger className="w-[180px] h-9 text-xs border-taupe/30">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              {/* Add Custom Range later if needed */}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default DashboardKpiBar; 