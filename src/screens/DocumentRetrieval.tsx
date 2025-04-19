import React, { useState } from 'react';
import { useA2A } from '@/components/a2a-provider';
import { EnhancedDocumentRetrieval } from '@/components/enhanced-document-retrieval';
import { Card } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';

export default function DocumentRetrieval() {
  const [patientId] = useState('P12345');
  const [patientName] = useState('Sarah Johnson');
  const [activeTab, setActiveTab] = useState('retrieval');
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-forestDark mb-6">Document Management</h2>
      
      <Tabs
        tabs={[
          { id: 'retrieval', label: 'Document Retrieval' },
          { id: 'upload', label: 'Manual Upload' },
          { id: 'history', label: 'Document History' }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
        className="mb-6"
      />
      
      {activeTab === 'retrieval' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Enhanced Document Retrieval Component */}
            <EnhancedDocumentRetrieval 
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
              </div>
            </Card>
            
            {/* Connected Systems Card */}
            <Card className="p-4 bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-forestDark mb-3">Connected Systems</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-sm text-forestDark">OpenDental</p>
                  </div>
                  <span className="text-xs text-green-600">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <p className="text-sm text-forestDark">Dexis Imaging</p>
                  </div>
                  <span className="text-xs text-green-600">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                    <p className="text-sm text-forestDark">Carestream</p>
                  </div>
                  <span className="text-xs text-amber-600">Limited Access</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <p className="text-sm text-forestDark">Cloud Storage</p>
                  </div>
                  <span className="text-xs text-red-600">Disconnected</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
      
      {activeTab === 'upload' && (
        <Card className="p-6 bg-white shadow-sm">
          <h3 className="text-lg font-semibold text-forestDark mb-4">Manual Document Upload</h3>
          <p className="text-sm text-forestDark-light mb-6">
            Upload documents manually when they cannot be automatically retrieved from connected systems.
          </p>
          
          <div className="border-2 border-dashed border-taupe/30 rounded-lg p-8 text-center mb-6">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-forestDark-light mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm font-medium text-forestDark mb-1">Drag and drop files here</p>
              <p className="text-xs text-forestDark-light mb-3">or</p>
              <button className="px-4 py-2 bg-forestGreen text-white text-sm rounded-md hover:bg-forestGreen-dark">
                Browse Files
              </button>
            </div>
          </div>
          
          <div className="text-xs text-forestDark-light mb-2">
            Supported file types: PDF, JPG, PNG, TIFF, DCM
          </div>
          
          <div className="flex justify-end mt-6">
            <button className="px-4 py-2 bg-forestGreen text-white rounded-md hover:bg-forestGreen-dark">
              Upload Documents
            </button>
          </div>
        </Card>
      )}
      
      {activeTab === 'history' && (
        <Card className="p-4 bg-white shadow-sm">
          <h3 className="text-lg font-semibold text-forestDark mb-3">Document History</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-forestLight/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light uppercase tracking-wider">
                    Document Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-forestDark-light uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-forestDark-light uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-taupe/10">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-forestDark">FMX X-ray Series</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-forestDark">X-ray</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-forestDark-light">Mar 15, 2025</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-forestDark">OpenDental</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-forestGreen hover:text-forestGreen-dark mr-2">
                      View
                    </button>
                    <button className="text-forestGreen hover:text-forestGreen-dark">
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-forestDark">Periapical X-ray #14</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-forestDark">X-ray</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-forestDark-light">Apr 1, 2025</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-forestDark">OpenDental</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-forestGreen hover:text-forestGreen-dark mr-2">
                      View
                    </button>
                    <button className="text-forestGreen hover:text-forestGreen-dark">
                      Download
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-forestDark">Clinical Notes - Crown Prep</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-forestDark">Clinical Notes</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-forestDark-light">Apr 10, 2025</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-forestDark">OpenDental</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-forestGreen hover:text-forestGreen-dark mr-2">
                      View
                    </button>
                    <button className="text-forestGreen hover:text-forestGreen-dark">
                      Download
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
