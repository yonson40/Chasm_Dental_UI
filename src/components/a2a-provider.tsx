import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Notification, EventNotificationCenter } from '@/components/event-notification';

// Define message types for A2A communication
export type AgentCapability = 
  | 'INSURANCE_VERIFICATION'
  | 'INSURANCE_DISCOVERY'
  | 'DOCUMENT_RETRIEVAL'
  | 'CLAIM_VALIDATION'
  | 'CODING_ASSISTANCE'
  | 'DENIAL_MANAGEMENT';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AgentMessage = {
  id: string;
  timestamp: Date;
  source: string;
  destination: string;
  capability: AgentCapability;
  priority: TaskPriority;
  action: string;
  context: Record<string, any>;
  requiresApproval: boolean;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'APPROVED' | 'REJECTED';
};

export type AgentTask = {
  id: string;
  title: string;
  description: string;
  capability: AgentCapability;
  priority: TaskPriority;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  createdAt: Date;
  updatedAt: Date;
  estimatedTimeSaved: number; // in minutes
  context: Record<string, any>;
  messages: AgentMessage[];
  requiresApproval: boolean;
};

// Define the context type
interface A2AContextType {
  isConnected: boolean;
  tasks: AgentTask[];
  messages: AgentMessage[];
  notifications: Notification[];
  pendingApprovals: AgentTask[];
  timeSavedToday: number;
  actionsCompletedToday: number;
  sendMessage: (message: Partial<AgentMessage>) => Promise<void>;
  approveTask: (taskId: string) => Promise<void>;
  rejectTask: (taskId: string, reason?: string) => Promise<void>;
  dismissNotification: (notificationId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearAllNotifications: () => void;
}

// Create the context
const A2AContext = createContext<A2AContextType | undefined>(undefined);

// Mock backend connection (in a real app, this would connect to your message bus)
class MockA2AConnection {
  private listeners: ((message: AgentMessage) => void)[] = [];
  private connected = false;
  private mockTasks: AgentTask[] = [];
  private mockMessages: AgentMessage[] = [];

  constructor() {
    // Initialize with some mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Create some mock tasks and messages for demonstration
    const task1: AgentTask = {
      id: uuidv4(),
      title: 'Verify Insurance for Sarah Johnson',
      description: 'Automatically verify insurance coverage with Delta Dental',
      capability: 'INSURANCE_VERIFICATION',
      priority: 'MEDIUM',
      status: 'COMPLETED',
      createdAt: new Date(Date.now() - 30 * 60000),
      updatedAt: new Date(Date.now() - 25 * 60000),
      estimatedTimeSaved: 25,
      context: {
        patientId: '12345',
        insuranceProvider: 'Delta Dental',
        policyNumber: 'DD987654321'
      },
      messages: [],
      requiresApproval: false
    };

    const task2: AgentTask = {
      id: uuidv4(),
      title: 'Retrieve X-rays for John Smith',
      description: 'Automatically retrieve X-rays from imaging system for claim submission',
      capability: 'DOCUMENT_RETRIEVAL',
      priority: 'HIGH',
      status: 'PENDING',
      createdAt: new Date(Date.now() - 15 * 60000),
      updatedAt: new Date(Date.now() - 15 * 60000),
      estimatedTimeSaved: 15,
      context: {
        patientId: '67890',
        documentTypes: ['X-ray', 'Clinical Notes'],
        procedureCodes: ['D2750', 'D2950']
      },
      messages: [],
      requiresApproval: true
    };

    this.mockTasks = [task1, task2];

    // Create messages for these tasks
    const message1: AgentMessage = {
      id: uuidv4(),
      timestamp: new Date(Date.now() - 30 * 60000),
      source: 'insurance-verification-agent',
      destination: 'ui',
      capability: 'INSURANCE_VERIFICATION',
      priority: 'MEDIUM',
      action: 'VERIFY_INSURANCE',
      context: {
        taskId: task1.id,
        patientId: '12345',
        insuranceProvider: 'Delta Dental'
      },
      requiresApproval: false,
      status: 'COMPLETED'
    };

    const message2: AgentMessage = {
      id: uuidv4(),
      timestamp: new Date(Date.now() - 15 * 60000),
      source: 'document-retrieval-agent',
      destination: 'ui',
      capability: 'DOCUMENT_RETRIEVAL',
      priority: 'HIGH',
      action: 'RETRIEVE_DOCUMENTS',
      context: {
        taskId: task2.id,
        patientId: '67890',
        documentTypes: ['X-ray', 'Clinical Notes']
      },
      requiresApproval: true,
      status: 'PENDING'
    };

    this.mockMessages = [message1, message2];
    
    // Link messages to tasks
    task1.messages = [message1];
    task2.messages = [message2];
  }

  connect(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connected = true;
        resolve();
      }, 1000);
    });
  }

  disconnect(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connected = false;
        resolve();
      }, 500);
    });
  }

  isConnected(): boolean {
    return this.connected;
  }

  addMessageListener(listener: (message: AgentMessage) => void): void {
    this.listeners.push(listener);
  }

  removeMessageListener(listener: (message: AgentMessage) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  sendMessage(message: Partial<AgentMessage>): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fullMessage: AgentMessage = {
          id: message.id || uuidv4(),
          timestamp: message.timestamp || new Date(),
          source: message.source || 'ui',
          destination: message.destination || 'agent-coordinator',
          capability: message.capability || 'INSURANCE_VERIFICATION',
          priority: message.priority || 'MEDIUM',
          action: message.action || 'UNKNOWN',
          context: message.context || {},
          requiresApproval: message.requiresApproval || false,
          status: message.status || 'PENDING'
        };

        this.mockMessages.push(fullMessage);
        
        // If this is a response to a task, update the task
        if (fullMessage.context.taskId) {
          const task = this.mockTasks.find(t => t.id === fullMessage.context.taskId);
          if (task) {
            task.messages.push(fullMessage);
            task.updatedAt = new Date();
            
            if (fullMessage.action === 'APPROVE_TASK') {
              task.status = 'COMPLETED';
            } else if (fullMessage.action === 'REJECT_TASK') {
              task.status = 'FAILED';
            }
          }
        }

        // Notify listeners
        this.listeners.forEach(listener => listener(fullMessage));
        resolve();
      }, 500);
    });
  }

  getTasks(): AgentTask[] {
    return [...this.mockTasks];
  }

  getMessages(): AgentMessage[] {
    return [...this.mockMessages];
  }

  // Simulate receiving messages from the backend
  simulateIncomingMessages(): void {
    // Start a timer that occasionally sends mock messages
    setInterval(() => {
      if (this.connected && Math.random() > 0.7) {
        const capabilities: AgentCapability[] = [
          'INSURANCE_VERIFICATION',
          'INSURANCE_DISCOVERY',
          'DOCUMENT_RETRIEVAL',
          'CLAIM_VALIDATION'
        ];
        const actions = [
          'VERIFY_INSURANCE',
          'DISCOVER_INSURANCE',
          'RETRIEVE_DOCUMENTS',
          'VALIDATE_CLAIM'
        ];
        const priorities: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH'];
        
        const randomCapability = capabilities[Math.floor(Math.random() * capabilities.length)];
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
        
        const newTask: AgentTask = {
          id: uuidv4(),
          title: `Auto ${randomAction.toLowerCase().replace('_', ' ')}`,
          description: `Automatically ${randomAction.toLowerCase().replace('_', ' ')} for patient`,
          capability: randomCapability,
          priority: randomPriority,
          status: Math.random() > 0.3 ? 'COMPLETED' : 'PENDING',
          createdAt: new Date(),
          updatedAt: new Date(),
          estimatedTimeSaved: Math.floor(Math.random() * 30) + 5,
          context: {
            patientId: `P${Math.floor(Math.random() * 10000)}`,
          },
          messages: [],
          requiresApproval: Math.random() > 0.7
        };
        
        this.mockTasks.push(newTask);
        
        const newMessage: AgentMessage = {
          id: uuidv4(),
          timestamp: new Date(),
          source: `${randomCapability.toLowerCase()}-agent`,
          destination: 'ui',
          capability: randomCapability,
          priority: randomPriority,
          action: randomAction,
          context: {
            taskId: newTask.id,
            ...newTask.context
          },
          requiresApproval: newTask.requiresApproval,
          status: newTask.status
        };
        
        this.mockMessages.push(newMessage);
        newTask.messages.push(newMessage);
        
        // Notify listeners
        this.listeners.forEach(listener => listener(newMessage));
      }
    }, 60000); // Simulate a new message roughly every minute
  }
}

// Provider component
interface A2AProviderProps {
  children: React.ReactNode;
}

export const A2AProvider: React.FC<A2AProviderProps> = ({ children }) => {
  const [connection] = useState<MockA2AConnection>(new MockA2AConnection());
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Connect to the A2A backend on mount
  useEffect(() => {
    const connectToBackend = async () => {
      try {
        await connection.connect();
        setIsConnected(true);
        
        // Load initial data
        setTasks(connection.getTasks());
        setMessages(connection.getMessages());
        
        // Start simulating incoming messages
        connection.simulateIncomingMessages();
      } catch (error) {
        console.error('Failed to connect to A2A backend:', error);
      }
    };
    
    connectToBackend();
    
    // Cleanup on unmount
    return () => {
      connection.disconnect();
    };
  }, [connection]);
  
  // Listen for new messages
  useEffect(() => {
    const handleNewMessage = (message: AgentMessage) => {
      // Update messages
      setMessages(prev => [...prev, message]);
      
      // Update tasks
      if (message.context.taskId) {
        setTasks(prev => {
          const taskIndex = prev.findIndex(t => t.id === message.context.taskId);
          if (taskIndex >= 0) {
            const updatedTasks = [...prev];
            updatedTasks[taskIndex] = {
              ...updatedTasks[taskIndex],
              messages: [...updatedTasks[taskIndex].messages, message],
              updatedAt: new Date(),
              status: message.status === 'COMPLETED' ? 'COMPLETED' : 
                     message.status === 'FAILED' ? 'FAILED' : 
                     message.requiresApproval ? 'PENDING' : 'IN_PROGRESS'
            };
            return updatedTasks;
          }
          return prev;
        });
      }
      
      // Create a notification for the message
      const notification: Notification = {
        id: uuidv4(),
        title: getNotificationTitle(message),
        message: getNotificationMessage(message),
        timestamp: message.timestamp,
        priority: getNotificationPriority(message.priority),
        category: getCategoryFromCapability(message.capability),
        timeSaved: message.context.estimatedTimeSaved || getTaskByMessage(message)?.estimatedTimeSaved,
        autoClose: !message.requiresApproval,
        read: false,
        actions: message.requiresApproval ? [
          {
            label: 'View',
            onClick: () => console.log('View task', message.context.taskId),
            primary: false
          },
          {
            label: 'Approve',
            onClick: () => approveTask(message.context.taskId),
            primary: true
          }
        ] : undefined
      };
      
      setNotifications(prev => [...prev, notification]);
    };
    
    // Helper function to get task by message
    const getTaskByMessage = (message: AgentMessage): AgentTask | undefined => {
      return tasks.find(t => t.id === message.context.taskId);
    };
    
    connection.addMessageListener(handleNewMessage);
    
    return () => {
      connection.removeMessageListener(handleNewMessage);
    };
  }, [connection, tasks]);
  
  // Helper functions for notifications
  const getNotificationTitle = (message: AgentMessage): string => {
    switch (message.capability) {
      case 'INSURANCE_VERIFICATION':
        return 'Insurance Verified';
      case 'INSURANCE_DISCOVERY':
        return 'Insurance Discovered';
      case 'DOCUMENT_RETRIEVAL':
        return 'Documents Retrieved';
      case 'CLAIM_VALIDATION':
        return 'Claim Validated';
      case 'CODING_ASSISTANCE':
        return 'Coding Assistance';
      case 'DENIAL_MANAGEMENT':
        return 'Denial Management';
      default:
        return 'New Notification';
    }
  };
  
  const getNotificationMessage = (message: AgentMessage): string => {
    const patientName = message.context.patientName || 'Patient';
    
    switch (message.capability) {
      case 'INSURANCE_VERIFICATION':
        return `${patientName}'s insurance has been automatically verified with ${message.context.insuranceProvider || 'the insurance provider'}.`;
      case 'INSURANCE_DISCOVERY':
        return `Potential insurance coverage discovered for ${patientName}.`;
      case 'DOCUMENT_RETRIEVAL':
        return `Required documents for ${patientName} were automatically retrieved from the practice management system.`;
      case 'CLAIM_VALIDATION':
        return `Claim for ${patientName} has been validated and is ready for submission.`;
      case 'CODING_ASSISTANCE':
        return `Procedure codes for ${patientName} have been reviewed and optimized.`;
      case 'DENIAL_MANAGEMENT':
        return `A solution has been found for the denied claim for ${patientName}.`;
      default:
        return `A task has been ${message.status.toLowerCase()} for ${patientName}.`;
    }
  };
  
  const getNotificationPriority = (priority: TaskPriority): 'low' | 'medium' | 'high' => {
    switch (priority) {
      case 'LOW':
        return 'low';
      case 'MEDIUM':
        return 'medium';
      case 'HIGH':
      case 'CRITICAL':
        return 'high';
      default:
        return 'medium';
    }
  };
  
  const getCategoryFromCapability = (capability: AgentCapability): string => {
    switch (capability) {
      case 'INSURANCE_VERIFICATION':
      case 'INSURANCE_DISCOVERY':
        return 'Insurance';
      case 'DOCUMENT_RETRIEVAL':
        return 'Documents';
      case 'CLAIM_VALIDATION':
      case 'CODING_ASSISTANCE':
        return 'Claims';
      case 'DENIAL_MANAGEMENT':
        return 'Denials';
      default:
        return 'General';
    }
  };
  
  // Calculate pending approvals
  const pendingApprovals = tasks.filter(task => 
    task.requiresApproval && 
    (task.status === 'PENDING' || task.status === 'IN_PROGRESS')
  );
  
  // Calculate time saved today
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  
  const timeSavedToday = tasks
    .filter(task => task.status === 'COMPLETED' && task.updatedAt >= startOfToday)
    .reduce((total, task) => total + task.estimatedTimeSaved, 0);
  
  // Calculate actions completed today
  const actionsCompletedToday = tasks
    .filter(task => task.status === 'COMPLETED' && task.updatedAt >= startOfToday)
    .length;
  
  // Send a message to the backend
  const sendMessage = useCallback(async (message: Partial<AgentMessage>) => {
    if (!isConnected) {
      throw new Error('Not connected to A2A backend');
    }
    
    await connection.sendMessage(message);
  }, [connection, isConnected]);
  
  // Approve a task
  const approveTask = useCallback(async (taskId: string) => {
    if (!isConnected) {
      throw new Error('Not connected to A2A backend');
    }
    
    await connection.sendMessage({
      source: 'ui',
      destination: 'agent-coordinator',
      action: 'APPROVE_TASK',
      context: {
        taskId
      },
      status: 'APPROVED'
    });
    
    // Update the local task status
    setTasks(prev => {
      const taskIndex = prev.findIndex(t => t.id === taskId);
      if (taskIndex >= 0) {
        const updatedTasks = [...prev];
        updatedTasks[taskIndex] = {
          ...updatedTasks[taskIndex],
          status: 'COMPLETED',
          updatedAt: new Date()
        };
        return updatedTasks;
      }
      return prev;
    });
    
    // Remove the notification for this task
    setNotifications(prev => 
      prev.filter(n => {
        const notificationTask = tasks.find(t => 
          t.id === taskId && 
          t.messages.some(m => getNotificationTitle(m) === n.title)
        );
        return !notificationTask;
      })
    );
  }, [connection, isConnected, tasks]);
  
  // Reject a task
  const rejectTask = useCallback(async (taskId: string, reason?: string) => {
    if (!isConnected) {
      throw new Error('Not connected to A2A backend');
    }
    
    await connection.sendMessage({
      source: 'ui',
      destination: 'agent-coordinator',
      action: 'REJECT_TASK',
      context: {
        taskId,
        reason
      },
      status: 'REJECTED'
    });
    
    // Update the local task status
    setTasks(prev => {
      const taskIndex = prev.findIndex(t => t.id === taskId);
      if (taskIndex >= 0) {
        const updatedTasks = [...prev];
        updatedTasks[taskIndex] = {
          ...updatedTasks[taskIndex],
          status: 'FAILED',
          updatedAt: new Date()
        };
        return updatedTasks;
      }
      return prev;
    });
    
    // Remove the notification for this task
    setNotifications(prev => 
      prev.filter(n => {
        const notificationTask = tasks.find(t => 
          t.id === taskId && 
          t.messages.some(m => getNotificationTitle(m) === n.title)
        );
        return !notificationTask;
      })
    );
  }, [connection, isConnected, tasks]);
  
  // Dismiss a notification
  const dismissNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);
  
  // Mark a notification as read
  const markNotificationAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      )
    );
  }, []);
  
  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);
  
  // Create the context value
  const contextValue: A2AContextType = {
    isConnected,
    tasks,
    messages,
    notifications,
    pendingApprovals,
    timeSavedToday,
    actionsCompletedToday,
    sendMessage,
    approveTask,
    rejectTask,
    dismissNotification,
    markNotificationAsRead,
    clearAllNotifications
  };
  
  return (
    <A2AContext.Provider value={contextValue}>
      {children}
    </A2AContext.Provider>
  );
};

// Custom hook to use the A2A context
export const useA2A = (): A2AContextType => {
  const context = useContext(A2AContext);
  if (context === undefined) {
    throw new Error('useA2A must be used within an A2AProvider');
  }
  return context;
};

// Example usage:
/*
// In your app's root component:
import { A2AProvider } from '@/components/a2a-provider';

function App() {
  return (
    <A2AProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </AppProvider>
    </A2AProvider>
  );
}

// In a component that needs to use A2A:
import { useA2A } from '@/components/a2a-provider';
import { EventNotificationCenter } from '@/components/ui/event-notification';

function Header() {
  const { 
    notifications, 
    dismissNotification, 
    markNotificationAsRead, 
    clearAllNotifications 
  } = useA2A();
  
  return (
    <header>
      <div className="flex items-center">
        <h1>Chasm</h1>
        <EventNotificationCenter
          notifications={notifications}
          onClose={dismissNotification}
          onMarkAsRead={markNotificationAsRead}
          onClearAll={clearAllNotifications}
        />
      </div>
    </header>
  );
}
*/
