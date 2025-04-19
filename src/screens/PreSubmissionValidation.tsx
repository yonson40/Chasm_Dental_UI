import React, { useState } from 'react';
import { useA2A } from '@/components/a2a-provider';
import { EnhancedPreSubmissionValidation } from '@/components/enhanced-pre-submission-validation';
import { Card } from '@/components/ui/card';

export default function PreSubmissionValidation() {
  const [claimId] = useState('C78901');
  const [patientName] = useState('John Smith');
  const [procedureCodes] = useState(['D2750', 'D2950', 'D0220']);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-forestDark mb-6">Pre-submission Validation</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Enhanced Pre-submission Validation Component */}
          <EnhancedPreSubmissionValidation 
            claimId={claimId}
            patientName={patientName}
            procedureCodes={procedureCodes}
          />
        </div>
        
        <div className="space-y-6">
          {/* Claim Information Card */}
          <Card className="p-4 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-forestDark mb-3">Claim Information</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-forestDark-light">Patient</p>
                <p className="text-sm font-medium text-forestDark">{patientName}</p>
              </div>
              <div>
                <p className="text-xs text-forestDark-light">Claim ID</p>
                <p className="text-sm font-medium text-forestDark">{claimId}</p>
              </div>
              <div>
                <p className="text-xs text-forestDark-light">Date of Service</p>
                <p className="text-sm font-medium text-forestDark">Apr 10, 2025</p>
              </div>
              <div>
                <p className="text-xs text-forestDark-light">Provider</p>
                <p className="text-sm font-medium text-forestDark">Dr. Jane Doe</p>
              </div>
              <div>
                <p className="text-xs text-forestDark-light">Insurance</p>
                <p className="text-sm font-medium text-forestDark">Delta Dental - PPO</p>
              </div>
            </div>
          </Card>
          
          {/* Procedures Card */}
          <Card className="p-4 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-forestDark mb-3">Procedures</h3>
            <div className="space-y-3">
              <div className="border-b border-taupe/10 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-forestDark">D2750</p>
                    <p className="text-xs text-forestDark-light">Crown - porcelain fused to high noble metal</p>
                  </div>
                  <p className="text-sm font-medium text-forestDark">$1,200.00</p>
                </div>
                <div className="mt-1 text-xs text-forestDark-light">
                  Tooth #14
                </div>
              </div>
              <div className="border-b border-taupe/10 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-forestDark">D2950</p>
                    <p className="text-xs text-forestDark-light">Core buildup, including any pins when required</p>
                  </div>
                  <p className="text-sm font-medium text-forestDark">$350.00</p>
                </div>
                <div className="mt-1 text-xs text-forestDark-light">
                  Tooth #14
                </div>
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-forestDark">D0220</p>
                    <p className="text-xs text-forestDark-light">Intraoral - periapical first radiographic image</p>
                  </div>
                  <p className="text-sm font-medium text-forestDark">$45.00</p>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-taupe/10">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-forestDark">Total</p>
                <p className="text-sm font-medium text-forestDark">$1,595.00</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
