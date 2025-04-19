import React from 'react';
import { useA2A } from '@/components/a2a-provider';
import { Card } from '@/components/ui/card';
import { EventNotificationCenter } from '@/components/event-notification';
import { Clock, CheckCircle, AlertCircle, Activity, Calendar, BarChart2 } from 'lucide-react';

interface IntelligentDashboardProps {
  className?: string;
}

export const IntelligentDashboard: React.FC<IntelligentDashboardProps> = ({ className }) => {
  const { 
    tasks, 
    pendingApprovals, 
    timeSavedToday, 
    actionsCompletedToday,
    notifications,
    dismissNotification,
    markNotificationAsRead,
    clearAllNotifications,
    approveTask
  } = useA2A();

  // Calculate statistics
  const completedTasks = tasks.filter(task => task.status === 'COMPLETED');
  const pendingTasks = tasks.filter(task => task.status === 'PENDING' || task.status === 'IN_PROGRESS');
  const failedTasks = tasks.filter(task => task.status === 'FAILED');
  
  // Calculate time saved this week
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const timeSavedThisWeek = completedTasks
    .filter(task => new Date(task.updatedAt) >= startOfWeek)
    .reduce((total, task) => total + task.estimatedTimeSaved, 0);
  
  // Format time saved as hours and minutes
  const formatTimeSaved = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Get score color/bg functions (ensure no dark: variants)
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };
  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-amber-100';
    return 'bg-red-100';
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* AI Activity Center and Pending Approvals List (KEEP these) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Activity Center Card */}
        <Card className="col-span-1 lg:col-span-2 bg-white shadow-sm overflow-hidden">
          <div className="p-4 border-b border-taupe/20">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-forestDark">AI Activity Center</h3>
              <div className="flex items-center space-x-2">
                <select 
                  aria-label="Select time period for activity"
                  className="text-xs bg-forestLight border border-taupe/30 rounded px-2 py-1 text-forestDark"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <button className="text-xs text-forestGreen hover:text-forestGreen-dark">
                  View All
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-forestDark-light" />
                <span className="text-sm text-forestDark-light">Today's Activity</span>
              </div>
              <div className="text-xs text-forestDark-light">
                {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>
            
            {/* Activity Timeline */}
            <div className="space-y-4">
              {tasks
                .filter(task => new Date(task.createdAt).toDateString() === new Date().toDateString())
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 5)
                .map(task => (
                  <div key={task.id} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                      task.status === 'COMPLETED' ? 'bg-green-500' :
                      task.status === 'FAILED' ? 'bg-red-500' :
                      'bg-amber-500'
                    }`} />
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-forestDark">{task.title}</p>
                        <span className="text-xs text-forestDark-light">
                          {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-forestDark-light mt-0.5">{task.description}</p>
                      
                      {task.status === 'COMPLETED' && (
                        <div className="flex items-center mt-1 text-xs text-green-600">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>Saved {task.estimatedTimeSaved} minutes</span>
                        </div>
                      )}
                      
                      {task.requiresApproval && task.status === 'PENDING' && (
                        <div className="flex items-center space-x-2 mt-2">
                          <button 
                            onClick={() => approveTask(task.id)}
                            className="px-2 py-1 text-xs bg-forestGreen text-white rounded-md hover:bg-forestGreen-dark"
                          >
                            Approve
                          </button>
                          <button className="px-2 py-1 text-xs bg-gray-200 text-forestDark rounded-md hover:bg-gray-300">
                            View Details
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
              {tasks.filter(task => new Date(task.createdAt).toDateString() === new Date().toDateString()).length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm text-forestDark-light">No activity today</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Pending Approvals Card (List, not KPI) */}
        <Card className="bg-white shadow-sm overflow-hidden">
          <div className="p-4 border-b border-taupe/20">
            <h3 className="text-lg font-semibold text-forestDark">Pending Approvals</h3>
          </div>
          
          <div className="p-4">
            {pendingApprovals.length > 0 ? (
              <div className="space-y-4">
                {pendingApprovals.slice(0, 4).map(task => (
                  <div key={task.id} className="border border-amber-200 rounded-md p-3 bg-amber-50">
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-medium text-forestDark">{task.title}</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        task.priority === 'HIGH' || task.priority === 'CRITICAL' 
                          ? 'bg-red-100 text-red-800' 
                          : task.priority === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-forestDark-light mt-1">{task.description}</p>
                    
                    <div className="flex items-center mt-2 text-xs text-forestDark-light">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Will save ~{task.estimatedTimeSaved} minutes</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-3">
                      <button 
                        onClick={() => approveTask(task.id)}
                        className="flex-1 px-2 py-1.5 text-xs bg-forestGreen text-white rounded-md hover:bg-forestGreen-dark"
                      >
                        Approve
                      </button>
                      <button className="flex-1 px-2 py-1.5 text-xs bg-gray-200 text-forestDark rounded-md hover:bg-gray-300">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
                
                {pendingApprovals.length > 4 && (
                  <button className="w-full text-center text-xs text-forestGreen hover:text-forestGreen-dark py-2">
                    View all {pendingApprovals.length} pending approvals
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-forestDark-light">No pending approvals</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Performance Metrics Card (KEEP this) */}
      <Card className="bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b border-taupe/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-forestDark">Performance Metrics</h3>
            <div className="flex items-center space-x-2">
              <select 
                aria-label="Select time period for performance metrics"
                className="text-xs bg-forestLight border border-taupe/30 rounded px-2 py-1 text-forestDark"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Time Saved Chart */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-forestDark">Time Saved</h4>
                <div className="flex items-center text-xs text-green-600">
                  <span className="font-medium">+24%</span>
                  <BarChart2 className="h-3 w-3 ml-1" />
                </div>
              </div>
              
              <div className="h-24 bg-forestLight/50 rounded-md flex items-end p-2">
                <div className="w-1/7 h-40% bg-green-500 rounded-sm mx-0.5"></div>
                <div className="w-1/7 h-60% bg-green-500 rounded-sm mx-0.5"></div>
                <div className="w-1/7 h-30% bg-green-500 rounded-sm mx-0.5"></div>
                <div className="w-1/7 h-70% bg-green-500 rounded-sm mx-0.5"></div>
                <div className="w-1/7 h-50% bg-green-500 rounded-sm mx-0.5"></div>
                <div className="w-1/7 h-80% bg-green-500 rounded-sm mx-0.5"></div>
                <div className="w-1/7 h-90% bg-green-500 rounded-sm mx-0.5"></div>
              </div>
              
              <div className="text-xs text-center text-forestDark-light">
                {formatTimeSaved(timeSavedThisWeek)} saved this week
              </div>
            </div>
            
            {/* Task Completion Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-forestDark">Completion Rate</h4>
                <div className="flex items-center text-xs text-blue-600">
                  <span className="font-medium">95.2%</span>
                  <BarChart2 className="h-3 w-3 ml-1" />
                </div>
              </div>
              
              <div className="h-24 bg-forestLight/50 rounded-md p-2 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <div className="text-sm font-bold text-blue-600">95.2%</div>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-center text-forestDark-light">
                {completedTasks.length} of {completedTasks.length + failedTasks.length} tasks completed
              </div>
            </div>
            
            {/* Claim Approval Rate */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-forestDark">Claim Approval Rate</h4>
                <div className="flex items-center text-xs text-purple-600">
                  <span className="font-medium">+12%</span>
                  <BarChart2 className="h-3 w-3 ml-1" />
                </div>
              </div>
              
              <div className="h-24 bg-forestLight/50 rounded-md p-2 flex flex-col justify-center">
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-forestDark-light">Manual: 80%</span>
                  <span className="text-purple-600 font-medium">AI: 92%</span>
                </div>
              </div>
              
              <div className="text-xs text-center text-forestDark-light">
                12% higher approval rate with AI assistance
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
