import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { A2AProvider } from '@/components/a2a-provider';
import { AppProvider, AppLayout } from '@/components/app-provider';
import Dashboard from '@/screens/Dashboard';
import InsuranceVerification from '@/screens/InsuranceVerification';
import ClaimSubmission from '@/screens/ClaimSubmission';
import PatientOnboarding from '@/screens/PatientOnboarding';
import InsuranceDiscovery from '@/screens/InsuranceDiscovery';
import NetworkStatusVisualizer from '@/screens/NetworkStatusVisualizer';
import PreSubmissionValidation from '@/screens/PreSubmissionValidation';
import PatientCostEstimator from '@/screens/PatientCostEstimator';
import '@/styles/globals.css';

// Remove loading animation once app is ready
window.postMessage({ payload: 'removeLoading' }, '*');

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout><Dashboard /></AppLayout>,
  },
  {
    path: '/insurance-verification',
    element: <AppLayout><InsuranceVerification /></AppLayout>,
  },
  {
    path: '/claim-submission',
    element: <AppLayout><ClaimSubmission /></AppLayout>,
  },
  {
    path: '/patient-onboarding',
    element: <AppLayout><PatientOnboarding /></AppLayout>,
  },
  {
    path: '/insurance-discovery',
    element: <AppLayout><InsuranceDiscovery /></AppLayout>,
  },
  {
    path: '/network-status',
    element: <AppLayout><NetworkStatusVisualizer /></AppLayout>,
  },
  {
    path: '/pre-submission-validation',
    element: <AppLayout><PreSubmissionValidation /></AppLayout>,
  },
  {
    path: '/cost-estimator',
    element: <AppLayout><PatientCostEstimator /></AppLayout>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <A2AProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </A2AProvider>
  </React.StrictMode>,
);
