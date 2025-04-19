# Chasm Dental UI Components - Usage Documentation

This document provides detailed usage instructions for the new UI components implemented in the Chasm Dental application. These components are designed to create an intuitive interface that leverages the power of your agent-based backend while maintaining a simple user experience.

## Table of Contents
1. [A2A Provider](#a2a-provider)
2. [Event Notification Center](#event-notification-center)
3. [Intelligent Dashboard](#intelligent-dashboard)
4. [Enhanced Insurance Verification](#enhanced-insurance-verification)
5. [Enhanced Pre-submission Validation](#enhanced-pre-submission-validation)
6. [Enhanced Document Retrieval](#enhanced-document-retrieval)

## A2A Provider

The A2A Provider is a context provider that connects your UI with the backend message bus, enabling seamless communication between the UI and agent-based backend.

### Setup

```tsx
// In your main application file (e.g., src/renderer/index.tsx)
import { A2AProvider } from '@/components/a2a-provider';

function App() {
  return (
    <A2AProvider>
      {/* Your application components */}
    </A2AProvider>
  );
}
```

### Usage

```tsx
import { useA2A } from '@/components/a2a-provider';

function MyComponent() {
  const { 
    tasks, 
    pendingApprovals, 
    timeSavedToday, 
    actionsCompletedToday,
    notifications,
    sendMessage,
    approveTask,
    dismissNotification,
    markNotificationAsRead,
    clearAllNotifications
  } = useA2A();
  
  // Use these values and functions in your component
  
  return (
    <div>
      <p>Time saved today: {timeSavedToday} minutes</p>
      <p>Pending approvals: {pendingApprovals.length}</p>
      {/* ... */}
    </div>
  );
}
```

### API Reference

#### Context Values

| Property | Type | Description |
|----------|------|-------------|
| `tasks` | `Task[]` | Array of all tasks tracked by the system |
| `pendingApprovals` | `Task[]` | Array of tasks requiring user approval |
| `timeSavedToday` | `number` | Minutes saved today through automation |
| `actionsCompletedToday` | `number` | Count of actions completed today |
| `notifications` | `Notification[]` | Array of all notifications |

#### Methods

| Method | Parameters | Return | Description |
|--------|------------|--------|-------------|
| `sendMessage` | `message: Message` | `void` | Sends a message to the backend |
| `approveTask` | `taskId: string` | `void` | Approves a task requiring user intervention |
| `dismissNotification` | `notificationId: string` | `void` | Dismisses a notification |
| `markNotificationAsRead` | `notificationId: string` | `void` | Marks a notification as read |
| `clearAllNotifications` | None | `void` | Clears all notifications |

## Event Notification Center

The Event Notification Center displays real-time notifications about agent activities without exposing technical details.

### Usage

```tsx
import { EventNotificationCenter } from '@/components/ui/event-notification';
import { useA2A } from '@/components/a2a-provider';

function Header() {
  const { 
    notifications, 
    dismissNotification, 
    markNotificationAsRead, 
    clearAllNotifications 
  } = useA2A();
  
  return (
    <header>
      {/* Other header elements */}
      
      <EventNotificationCenter
        notifications={notifications}
        onClose={dismissNotification}
        onMarkAsRead={markNotificationAsRead}
        onClearAll={clearAllNotifications}
      />
    </header>
  );
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `notifications` | `Notification[]` | Yes | Array of notifications to display |
| `onClose` | `(id: string) => void` | Yes | Function to call when a notification is closed |
| `onMarkAsRead` | `(id: string) => void` | Yes | Function to call when a notification is marked as read |
| `onClearAll` | `() => void` | Yes | Function to call when all notifications are cleared |
| `className` | `string` | No | Additional CSS classes to apply |

## Intelligent Dashboard

The Intelligent Dashboard showcases AI activity and time savings without exposing technical complexity.

### Usage

```tsx
import { IntelligentDashboard } from '@/components/intelligent-dashboard';

function DashboardScreen() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Traditional dashboard metrics */}
      
      {/* Intelligent Dashboard */}
      <IntelligentDashboard className="mb-6" />
      
      {/* Other dashboard elements */}
    </div>
  );
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | No | Additional CSS classes to apply |

## Enhanced Insurance Verification

The Enhanced Insurance Verification component provides a user-friendly interface for automatically verifying insurance coverage.

### Usage

```tsx
import { EnhancedInsuranceVerification } from '@/components/enhanced-insurance-verification';

function InsuranceVerificationScreen() {
  const patientId = 'P12345';
  const patientName = 'Sarah Johnson';
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Insurance Verification</h2>
      
      <EnhancedInsuranceVerification 
        patientId={patientId}
        patientName={patientName}
      />
    </div>
  );
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `patientId` | `string` | Yes | ID of the patient |
| `patientName` | `string` | Yes | Name of the patient |
| `className` | `string` | No | Additional CSS classes to apply |

## Enhanced Pre-submission Validation

The Enhanced Pre-submission Validation component provides a user-friendly interface for automatically validating claims before submission.

### Usage

```tsx
import { EnhancedPreSubmissionValidation } from '@/components/enhanced-pre-submission-validation';

function PreSubmissionValidationScreen() {
  const claimId = 'C78901';
  const patientName = 'John Smith';
  const procedureCodes = ['D2750', 'D2950', 'D0220'];
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Pre-submission Validation</h2>
      
      <EnhancedPreSubmissionValidation 
        claimId={claimId}
        patientName={patientName}
        procedureCodes={procedureCodes}
      />
    </div>
  );
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `claimId` | `string` | Yes | ID of the claim |
| `patientName` | `string` | Yes | Name of the patient |
| `procedureCodes` | `string[]` | Yes | Array of procedure codes in the claim |
| `className` | `string` | No | Additional CSS classes to apply |

## Enhanced Document Retrieval

The Enhanced Document Retrieval component provides a user-friendly interface for automatically retrieving documents from connected systems.

### Usage

```tsx
import { EnhancedDocumentRetrieval } from '@/components/enhanced-document-retrieval';

function DocumentRetrievalScreen() {
  const patientId = 'P12345';
  const patientName = 'Sarah Johnson';
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">Document Retrieval</h2>
      
      <EnhancedDocumentRetrieval 
        patientId={patientId}
        patientName={patientName}
        documentTypes={['X-ray', 'Clinical Notes', 'Periodontal Chart', 'Treatment Plan']}
      />
    </div>
  );
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `patientId` | `string` | Yes | ID of the patient |
| `patientName` | `string` | Yes | Name of the patient |
| `documentTypes` | `string[]` | No | Array of document types to retrieve (defaults to a standard set) |
| `className` | `string` | No | Additional CSS classes to apply |

## Backend Integration

These components are designed to integrate with your agent-based backend through the A2A Provider. The provider expects your backend to expose an API that follows the Agent-to-Agent protocol format.

### Message Format

When sending messages to the backend using the `sendMessage` function, use the following format:

```typescript
{
  source: 'ui',
  destination: 'agent-name',
  capability: 'CAPABILITY_NAME',
  action: 'ACTION_NAME',
  context: {
    // Context-specific data
  },
  requiresApproval: boolean
}
```

### Task Format

Tasks received from the backend should follow this format:

```typescript
{
  id: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  requiresApproval: boolean;
  estimatedTimeSaved: number;
  createdAt: string;
  updatedAt: string;
}
```

### Notification Format

Notifications should follow this format:

```typescript
{
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
  actionable: boolean;
  actionText?: string;
  actionId?: string;
}
```
