import React, { useState } from 'react';
import { useA2A } from '@/components/a2a-provider';
import { EnhancedInsuranceVerification } from '@/components/enhanced-insurance-verification';
import { Card } from '@/components/ui/card';

export default function InsuranceVerification() {
  const [patientId] = useState('P12345');
  const [patientName] = useState('Sarah Johnson');
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-forestDark mb-6">Insurance Verification</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Enhanced Insurance Verification Component */}
          <EnhancedInsuranceVerification 
            patientId={patientId}
            patientName={patientName}
          />
        </div>
        
        <div className="space-y-6">
          {/* Patient Information Card */}
          <Card className="p-4 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-forestDark mb-3">Patient Information</h3>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-forestDark-light">Name</p>
                <p className="text-sm font-medium text-forestDark">{patientName}</p>
              </div>
              <div>
                <p className="text-xs text-forestDark-light">Patient ID</p>
                <p className="text-sm font-medium text-forestDark">{patientId}</p>
              </div>
              <div>
                <p className="text-xs text-forestDark-light">Date of Birth</p>
                <p className="text-sm font-medium text-forestDark">05/12/1985</p>
              </div>
              <div>
                <p className="text-xs text-forestDark-light">Phone</p>
                <p className="text-sm font-medium text-forestDark">(555) 123-4567</p>
              </div>
              <div>
                <p className="text-xs text-forestDark-light">Email</p>
                <p className="text-sm font-medium text-forestDark">sarah.johnson@example.com</p>
              </div>
            </div>
          </Card>
          
          {/* Verification History Card */}
          <Card className="p-4 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-forestDark mb-3">Verification History</h3>
            <div className="space-y-3">
              <div className="border-b border-taupe/10 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-forestDark">Delta Dental</p>
                    <p className="text-xs text-forestDark-light">Verified on Apr 10, 2025</p>
                  </div>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
              <div className="border-b border-taupe/10 pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-forestDark">Cigna Dental</p>
                    <p className="text-xs text-forestDark-light">Verified on Jan 15, 2025</p>
                  </div>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                    Inactive
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-forestDark">Aetna</p>
                    <p className="text-xs text-forestDark-light">Verified on Oct 5, 2024</p>
                  </div>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
                    Inactive
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
