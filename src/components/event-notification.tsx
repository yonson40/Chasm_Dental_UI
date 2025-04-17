import React, { useState, useEffect } from 'react';
import { X, Check, AlertCircle, Info, Clock, ChevronDown, ChevronUp } from 'lucide-react';

// Define notification priority levels
export type NotificationPriority = 'low' | 'medium' | 'high';

// Define notification action type
export type NotificationAction = {
  label: string;
  onClick: () => void;
  primary?: boolean;
};

// Define notification type
export type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  priority: NotificationPriority;
  category: string;
  actions?: NotificationAction[];
  autoClose?: boolean;
  timeSaved?: number; // in minutes
  read?: boolean;
  grouped?: boolean;
  groupCount?: number;
};

// Props for the EventNotification component
interface EventNotificationProps {
  notification: Notification;
  onClose: (id: string) => void;
  onAction?: (id: string, actionIndex: number) => void;
  onMarkAsRead?: (id: string) => void;
}

// Props for the EventNotificationCenter component
interface EventNotificationCenterProps {
  notifications: Notification[];
  onClose: (id: string) => void;
  onAction?: (id: string, actionIndex: number) => void;
  onMarkAsRead?: (id: string) => void;
  onClearAll?: () => void;
}

// Individual notification component
export const EventNotification: React.FC<EventNotificationProps> = ({
  notification,
  onClose,
  onAction,
  onMarkAsRead
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Auto-close notification if specified
  useEffect(() => {
    if (notification.autoClose) {
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => onClose(notification.id), 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, onClose]);

  // Handle notification click
  const handleClick = () => {
    if (notification.grouped) {
      setExpanded(!expanded);
    }
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  // Get priority color
  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case 'high':
        return 'bg-amber-100 border-amber-500 dark:bg-amber-900/30 dark:border-amber-600';
      case 'medium':
        return 'bg-blue-100 border-blue-500 dark:bg-blue-900/30 dark:border-blue-600';
      case 'low':
      default:
        return 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-600';
    }
  };

  // Get priority icon
  const getPriorityIcon = (priority: NotificationPriority) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
      case 'medium':
        return <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
      case 'low':
      default:
        return <Check className="h-5 w-5 text-green-500 dark:text-green-400" />;
    }
  };

  return (
    <div
      className={`relative border-l-4 rounded-md shadow-sm mb-3 transition-all duration-300 ${
        getPriorityColor(notification.priority)
      } ${isClosing ? 'opacity-0 transform -translate-y-2' : 'opacity-100'} ${
        !notification.read ? 'font-medium' : ''
      }`}
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {getPriorityIcon(notification.priority)}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-forestDark dark:text-beige flex items-center">
                {notification.title}
                {notification.grouped && (
                  <span className="ml-2 text-xs bg-forestGreen text-white px-1.5 py-0.5 rounded-full">
                    {notification.groupCount}
                  </span>
                )}
              </h4>
              <p className="text-sm text-forestDark-light dark:text-beige/80 mt-1">
                {notification.message}
              </p>
              
              {notification.timeSaved && (
                <div className="flex items-center mt-1 text-xs text-forestGreen dark:text-forestGreen-light">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>Saved {notification.timeSaved} minutes</span>
                </div>
              )}
              
              <div className="flex items-center mt-2 text-xs text-forestDark-light dark:text-beige/60">
                <span>
                  {new Date(notification.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                <span className="mx-1">•</span>
                <span>{notification.category}</span>
                
                {notification.grouped && (
                  <span className="ml-1 flex items-center">
                    {expanded ? (
                      <ChevronUp className="h-3 w-3" />
                    ) : (
                      <ChevronDown className="h-3 w-3" />
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsClosing(true);
              setTimeout(() => onClose(notification.id), 300);
            }}
            className="text-forestDark-light hover:text-forestDark dark:text-beige/60 dark:hover:text-beige"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {notification.actions && notification.actions.length > 0 && (
          <div className="mt-3 flex space-x-2 justify-end">
            {notification.actions.map((action, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onAction) {
                    onAction(notification.id, index);
                  } else {
                    action.onClick();
                  }
                }}
                className={`px-3 py-1 text-xs rounded-md ${
                  action.primary
                    ? 'bg-forestGreen text-white hover:bg-forestGreen-dark'
                    : 'bg-gray-200 text-forestDark hover:bg-gray-300 dark:bg-forestDark dark:text-beige dark:hover:bg-forestDark-light'
                }`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Expanded content for grouped notifications */}
      {notification.grouped && expanded && (
        <div className="px-4 pb-3 pt-0 border-t border-forestLight-dark/20 dark:border-forestDark-light/20">
          <ul className="text-sm space-y-2">
            {/* This would be populated with the individual notifications in the group */}
            <li className="flex items-center text-forestDark-light dark:text-beige/80">
              <Check className="h-3 w-3 mr-2 text-green-500" />
              <span>X-ray for tooth #14 retrieved from OpenDental</span>
            </li>
            <li className="flex items-center text-forestDark-light dark:text-beige/80">
              <Check className="h-3 w-3 mr-2 text-green-500" />
              <span>Periodontal chart retrieved from OpenDental</span>
            </li>
            <li className="flex items-center text-forestDark-light dark:text-beige/80">
              <Check className="h-3 w-3 mr-2 text-green-500" />
              <span>Clinical notes retrieved from OpenDental</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

// Notification center component
export const EventNotificationCenter: React.FC<EventNotificationCenterProps> = ({
  notifications,
  onClose,
  onAction,
  onMarkAsRead,
  onClearAll
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  
  // Filter notifications based on active tab
  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      {/* Notification bell icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-forestDark hover:bg-forestLight rounded-full dark:text-beige dark:hover:bg-forestDark-light"
      >
        <span className="sr-only">Notifications</span>
        <Info className="h-5 w-5" />
        
        {/* Unread badge */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center bg-forestGreen text-white rounded-full">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      
      {/* Notification panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-forestDark rounded-md shadow-lg z-50 overflow-hidden border border-forestLight-dark dark:border-forestDark-light">
          <div className="p-3 border-b border-forestLight-dark dark:border-forestDark-light">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-forestDark dark:text-beige">Notifications</h3>
              {notifications.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-forestGreen hover:text-forestGreen-dark dark:text-forestGreen-light dark:hover:text-forestGreen"
                >
                  Clear all
                </button>
              )}
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`text-xs pb-1 ${
                  activeTab === 'all'
                    ? 'text-forestGreen border-b-2 border-forestGreen font-medium'
                    : 'text-forestDark-light dark:text-beige/60 hover:text-forestDark dark:hover:text-beige'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('unread')}
                className={`text-xs pb-1 ${
                  activeTab === 'unread'
                    ? 'text-forestGreen border-b-2 border-forestGreen font-medium'
                    : 'text-forestDark-light dark:text-beige/60 hover:text-forestDark dark:hover:text-beige'
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto p-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <EventNotification
                  key={notification.id}
                  notification={notification}
                  onClose={onClose}
                  onAction={onAction}
                  onMarkAsRead={onMarkAsRead}
                />
              ))
            ) : (
              <div className="text-center py-6 text-forestDark-light dark:text-beige/60">
                <p className="text-sm">No notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Example usage:
/*
const notifications: Notification[] = [
  {
    id: '1',
    title: 'Documents Retrieved',
    message: 'Required X-rays and clinical notes were automatically retrieved from OpenDental.',
    timestamp: new Date(),
    priority: 'low',
    category: 'Document Retrieval',
    timeSaved: 15,
    autoClose: false,
    read: false,
    grouped: true,
    groupCount: 3,
    actions: [
      {
        label: 'View',
        onClick: () => console.log('View documents'),
        primary: false
      },
      {
        label: 'Approve',
        onClick: () => console.log('Approve documents'),
        primary: true
      }
    ]
  },
  {
    id: '2',
    title: 'Insurance Verified',
    message: 'Patient insurance has been automatically verified with Delta Dental.',
    timestamp: new Date(Date.now() - 15 * 60000),
    priority: 'medium',
    category: 'Insurance',
    timeSaved: 25,
    autoClose: false,
    read: true
  }
];
*/
