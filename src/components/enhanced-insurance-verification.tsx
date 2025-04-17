import React, { useState } from 'react';
import { useA2A } from '@/components/a2a-provider';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Clock, Search, FileCheck, X, ChevronDown, ChevronUp } from 'lucide-react';

interface EnhancedInsuranceVerificationProps {
  patientId: string;
  patientName: string;
  className?: string;
}

export const EnhancedInsuranceVerification: React.FC<EnhancedInsuranceVerificationProps> = ({
  patientId,
  patientName,
  className
}) => {
  const { sendMessage, approveTask } = useA2A();
  
  const [verificationStatus, setVerificationStatus] = useState<
    'idle' | 'searching' | 'verifying' | 'verified' | 'failed'
  >('idle');
  
  const [insuranceDetails, setInsuranceDetails] = useState<{
    provider: string;
    memberId: string;
    groupNumber: string;
    planType: string;
    coverageStatus: 'active' | 'inactive' | 'pending';
    effectiveDate: string;
    terminationDate: string | null;
    verificationMethod: 'automatic' | 'manual';
    verificationSource: string;
    remainingBenefits: number;
    annualMaximum: number;
    lastVerified: Date | null;
  } | null>(null);
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Start automatic verification
  const startVerification = async () => {
    setVerificationStatus('searching');
    
    // Simulate a delay for searching
    setTimeout(() => {
      setVerificationStatus('verifying');
      
      // Simulate sending a message to the backend
      sendMessage({
        source: 'ui',
        destination: 'insurance-verification-agent',
        capability: 'INSURANCE_VERIFICATION',
        action: 'VERIFY_INSURANCE',
        context: {
          patientId,
          patientName
        },
        requiresApproval: false
      });
      
      // Simulate a delay for verification
      setTimeout(() => {
        setVerificationStatus('verified');
        setInsuranceDetails({
          provider: 'Delta Dental',
          memberId: 'DD123456789',
          groupNumber: 'GRP987654',
          planType: 'PPO',
          coverageStatus: 'active',
          effectiveDate: '2025-01-01',
          terminationDate: null,
          verificationMethod: 'automatic',
          verificationSource: 'Delta Dental API',
          remainingBenefits: 1250,
          annualMaximum: 1500,
          lastVerified: new Date()
        });
      }, 3000);
    }, 2000);
  };
  
  // Reset verification
  const resetVerification = () => {
    setVerificationStatus('idle');
    setInsuranceDetails(null);
  };
  
  return (
    <Card className={`bg-white dark:bg-forestDark shadow-sm overflow-hidden ${className}`}>
      <div className="p-4 border-b border-forestLight-dark/20 dark:border-forestDark-light/20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-forestDark dark:text-beige">Insurance Verification</h3>
          {verificationStatus === 'verified' && (
            <div className="flex items-center">
              <span className="text-xs text-forestDark-light dark:text-beige/70 mr-2">
                Last verified: {insuranceDetails?.lastVerified?.toLocaleString()}
              </span>
              <button 
                onClick={resetVerification}
                className="text-xs text-forestGreen hover:text-forestGreen-dark dark:text-forestGreen-light dark:hover:text-forestGreen"
              >
                Verify Again
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {/* Patient Information */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-forestDark dark:text-beige">{patientName}</h4>
              <p className="text-xs text-forestDark-light dark:text-beige/70">Patient ID: {patientId}</p>
            </div>
            
            {verificationStatus === 'verified' && (
              <div className="flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400 mr-1" />
                <span className="text-xs text-green-600 dark:text-green-400">Verified</span>
              </div>
            )}
            
            {verificationStatus === 'failed' && (
              <div className="flex items-center px-2 py-1 bg-red-100 dark:bg-red-900/30 rounded-full">
                <AlertCircle className="h-3 w-3 text-red-600 dark:text-red-400 mr-1" />
                <span className="text-xs text-red-600 dark:text-red-400">Failed</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Verification Status */}
        {verificationStatus === 'idle' && (
          <div className="text-center py-6">
            <p className="text-sm text-forestDark-light dark:text-beige/70 mb-4">
              Click below to automatically verify insurance coverage
            </p>
            <button
              onClick={startVerification}
              className="px-4 py-2 bg-forestGreen text-white rounded-md hover:bg-forestGreen-dark"
            >
              Verify Insurance
            </button>
            <p className="text-xs text-forestDark-light dark:text-beige/70 mt-4">
              <Clock className="h-3 w-3 inline mr-1" />
              Saves approximately 25 minutes compared to manual verification
            </p>
          </div>
        )}
        
        {verificationStatus === 'searching' && (
          <div className="text-center py-6">
            <div className="animate-pulse flex flex-col items-center">
              <Search className="h-8 w-8 text-forestGreen dark:text-forestGreen-light mb-3" />
              <p className="text-sm text-forestDark dark:text-beige">Searching for insurance information...</p>
              <p className="text-xs text-forestDark-light dark:text-beige/70 mt-2">
                Checking connected systems for existing coverage
              </p>
            </div>
          </div>
        )}
        
        {verificationStatus === 'verifying' && (
          <div className="text-center py-6">
            <div className="animate-pulse flex flex-col items-center">
              <FileCheck className="h-8 w-8 text-forestGreen dark:text-forestGreen-light mb-3" />
              <p className="text-sm text-forestDark dark:text-beige">Verifying insurance coverage...</p>
              <p className="text-xs text-forestDark-light dark:text-beige/70 mt-2">
                Connecting to insurance provider to verify benefits
              </p>
            </div>
          </div>
        )}
        
        {verificationStatus === 'verified' && insuranceDetails && (
          <div>
            {/* Insurance Summary */}
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-md">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-forestDark dark:text-beige">
                    {insuranceDetails.provider} - {insuranceDetails.planType}
                  </h4>
                  <p className="text-xs text-forestDark-light dark:text-beige/70 mt-1">
                    Member ID: {insuranceDetails.memberId} | Group: {insuranceDetails.groupNumber}
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex-1">
                      <p className="text-xs text-forestDark-light dark:text-beige/70">Remaining Benefits</p>
                      <p className="text-sm font-medium text-forestDark dark:text-beige">
                        ${insuranceDetails.remainingBenefits.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-forestDark-light dark:text-beige/70">Annual Maximum</p>
                      <p className="text-sm font-medium text-forestDark dark:text-beige">
                        ${insuranceDetails.annualMaximum.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-forestDark-light dark:text-beige/70">Status</p>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400 capitalize">
                        {insuranceDetails.coverageStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Verification Details Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between p-2 bg-forestLight/50 dark:bg-forestDark-light/30 rounded-md text-sm text-forestDark dark:text-beige hover:bg-forestLight dark:hover:bg-forestDark-light"
            >
              <span>Verification Details</span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {/* Expanded Details */}
            {isExpanded && (
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-forestDark-light dark:text-beige/70">Effective Date</p>
                    <p className="text-sm text-forestDark dark:text-beige">
                      {new Date(insuranceDetails.effectiveDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-forestDark-light dark:text-beige/70">Termination Date</p>
                    <p className="text-sm text-forestDark dark:text-beige">
                      {insuranceDetails.terminationDate 
                        ? new Date(insuranceDetails.terminationDate).toLocaleDateString() 
                        : 'None'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-forestDark-light dark:text-beige/70">Verification Method</p>
                    <p className="text-sm text-forestDark dark:text-beige capitalize">
                      {insuranceDetails.verificationMethod}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-forestDark-light dark:text-beige/70">Verification Source</p>
                    <p className="text-sm text-forestDark dark:text-beige">
                      {insuranceDetails.verificationSource}
                    </p>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-forestLight-dark/20 dark:border-forestDark-light/20">
                  <h5 className="text-sm font-medium text-forestDark dark:text-beige mb-2">Coverage Details</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-forestDark-light dark:text-beige/70">Preventive (D1000-D1999)</span>
                      <span className="text-forestDark dark:text-beige font-medium">100%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-forestDark-light dark:text-beige/70">Basic (D2000-D2999)</span>
                      <span className="text-forestDark dark:text-beige font-medium">80%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-forestDark-light dark:text-beige/70">Major (D3000-D9999)</span>
                      <span className="text-forestDark dark:text-beige font-medium">50%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-forestDark-light dark:text-beige/70">Deductible</span>
                      <span className="text-forestDark dark:text-beige font-medium">$50 Individual / $150 Family</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 text-center">
              <p className="text-xs text-forestDark-light dark:text-beige/70">
                <Clock className="h-3 w-3 inline mr-1" />
                Saved 25 minutes compared to manual verification
              </p>
            </div>
          </div>
        )}
        
        {verificationStatus === 'failed' && (
          <div className="text-center py-6">
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 mb-3">
                <X className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-sm text-forestDark dark:text-beige">Verification failed</p>
              <p className="text-xs text-forestDark-light dark:text-beige/70 mt-2 mb-4">
                Unable to automatically verify insurance. Please try again or verify manually.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={startVerification}
                  className="px-3 py-1.5 bg-forestGreen text-white text-sm rounded-md hover:bg-forestGreen-dark"
                >
                  Try Again
                </button>
                <button className="px-3 py-1.5 bg-gray-200 text-forestDark text-sm rounded-md hover:bg-gray-300 dark:bg-forestDark-light dark:text-beige dark:hover:bg-forestDark-lighter">
                  Verify Manually
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
