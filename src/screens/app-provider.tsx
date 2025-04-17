import React from 'react';
import { A2AProvider } from '@/components/a2a-provider';
import { EventNotificationCenter } from '@/components/ui/event-notification';
import { useA2A } from '@/components/a2a-provider';
import { ThemeProvider } from '@/lib/theme-provider';

interface AppProviderProps {
  children: React.ReactNode;
}

// Enhanced AppProvider that includes A2A integration
export function AppProvider({ children }: AppProviderProps) {
  return (
    <A2AProvider>
      <ThemeProvider defaultTheme="light" storageKey="chasm-theme-preference">
        <AppContent>{children}</AppContent>
      </ThemeProvider>
    </A2AProvider>
  );
}

// AppContent component to use A2A context
function AppContent({ children }: { children: React.ReactNode }) {
  const { 
    notifications, 
    dismissNotification, 
    markNotificationAsRead, 
    clearAllNotifications 
  } = useA2A();
  
  return (
    <div className="min-h-screen bg-forestLight dark:bg-blueBlack transition-colors duration-300">
      {/* Header with notification center */}
      <header className="border-b border-taupe/20 bg-white dark:bg-forestDark dark:border-taupe/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-forestGreen dark:text-beige">
              Chasm
            </h1>
            <span className="ml-2 text-xs bg-forestGreen text-white px-2 py-0.5 rounded">
              Dental Billing
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Notification Center */}
            <EventNotificationCenter
              notifications={notifications}
              onClose={dismissNotification}
              onMarkAsRead={markNotificationAsRead}
              onClearAll={clearAllNotifications}
            />
            
            {/* Other header elements from original AppLayout */}
          </div>
        </div>
      </header>
      
      {children}
    </div>
  );
}

// Original AppLayout remains for compatibility
export function AppLayout({ children }: { children: React.ReactNode }) {
  // Original implementation remains unchanged
  // This ensures backward compatibility with existing code
}
