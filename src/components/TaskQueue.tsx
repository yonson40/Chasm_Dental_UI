import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle } from 'lucide-react';

// Mock Task Data
const mockTasks = [
  {
    id: 'task-1',
    action: 'Attach X-ray (D2740)',
    time: '15m', 
    value: 412,
    status: 'fix_required'
  },
  {
    id: 'task-2',
    action: 'Verify Cigna Eligibility',
    time: '2m',
    value: null,
    status: 'run_required'
  },
  {
    id: 'task-3',
    action: 'Resubmit Crown Claim',
    time: null,
    value: 820,
    status: 'send_required'
  },
];

const TaskQueue: React.FC = () => {

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '-';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="bg-white shadow-sm border border-taupe/20">
      <div className="p-4 border-b border-taupe/20">
        <h3 className="text-lg font-semibold text-forestDark">Task Queue</h3>
      </div>
      <div className="p-0"> {/* Remove padding for full-width table */}
        <table className="w-full">
          <thead>
            <tr className="border-b border-taupe/10 bg-forestLight/30">
              <th className="px-4 py-2 text-left text-xs font-medium text-forestDark-light uppercase">Action</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-forestDark-light uppercase">Est. Time Saved</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-forestDark-light uppercase">Value</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-forestDark-light uppercase"></th>
            </tr>
          </thead>
          <tbody>
            {mockTasks.map((task) => (
              <tr key={task.id} className="border-b border-taupe/10 last:border-b-0">
                <td className="px-4 py-3 text-sm text-forestDark font-medium flex items-center">
                  {task.status === 'fix_required' && <AlertCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />}
                   {task.action}
                </td>
                <td className="px-4 py-3 text-sm text-forestDark-light">
                  {task.time ? (
                    <span className='inline-flex items-center'>
                      <Clock className="h-3 w-3 mr-1" /> {task.time}
                    </span>
                   ) : '-'}
                </td>
                <td className="px-4 py-3 text-sm text-forestDark font-medium">{formatCurrency(task.value)}</td>
                <td className="px-4 py-3 text-right">
                  {task.status === 'fix_required' && <Button variant="destructive" size="sm">Fix</Button>}
                  {task.status === 'run_required' && <Button variant="secondary" size="sm">Run</Button>}
                  {task.status === 'send_required' && <Button variant="default" size="sm">Send</Button>}
                  {/* Add Approve/Reject later */}
                </td>
              </tr>
            ))}
            {mockTasks.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-forestDark-light">
                   🎉 All claims clean today!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TaskQueue; 