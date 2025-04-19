import React, { useState } from 'react';
import { useA2A } from '@/components/a2a-provider';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Clock, FileCheck, X, ChevronDown, ChevronUp, Search, Download, File, FileText, Image } from 'lucide-react';

interface EnhancedDocumentRetrievalProps {
  patientId: string;
  patientName: string;
  documentTypes?: string[];
  className?: string;
}

export const EnhancedDocumentRetrieval: React.FC<EnhancedDocumentRetrievalProps> = ({
  patientId,
  patientName,
  documentTypes = ['X-ray', 'Clinical Notes', 'Periodontal Chart', 'Treatment Plan'],
  className
}) => {
  const { sendMessage } = useA2A();
  
  const [retrievalStatus, setRetrievalStatus] = useState<
    'idle' | 'searching' | 'retrieving' | 'completed' | 'failed'
  >('idle');
  
  const [retrievalResults, setRetrievalResults] = useState<{
    documentsFound: number;
    documentsRetrieved: number;
    timeSaved: number;
    documents: Array<{
      id: string;
      name: string;
      type: string;
      date: Date;
      source: string;
      status: 'found' | 'retrieved' | 'not_found';
      thumbnail?: string;
      selected: boolean;
    }>;
  } | null>(null);
  
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Start document retrieval
  const startRetrieval = async () => {
    setRetrievalStatus('searching');
    
    // Simulate sending a message to the backend
    sendMessage({
      source: 'ui',
      destination: 'document-retrieval-agent',
      capability: 'DOCUMENT_RETRIEVAL',
      action: 'RETRIEVE_DOCUMENTS',
      context: {
        patientId,
        patientName,
        documentTypes
      },
      requiresApproval: false
    });
    
    // Simulate a delay for searching
    setTimeout(() => {
      setRetrievalStatus('retrieving');
      
      // Simulate a delay for retrieval
      setTimeout(() => {
        setRetrievalStatus('completed');
        setRetrievalResults({
          documentsFound: 8,
          documentsRetrieved: 6,
          timeSaved: 20,
          documents: [
            {
              id: '1',
              name: 'FMX X-ray Series',
              type: 'X-ray',
              date: new Date(2025, 2, 15),
              source: 'OpenDental',
              status: 'retrieved',
              selected: true
            },
            {
              id: '2',
              name: 'Periapical X-ray #14',
              type: 'X-ray',
              date: new Date(2025, 3, 1),
              source: 'OpenDental',
              status: 'retrieved',
              selected: true
            },
            {
              id: '3',
              name: 'Bitewing X-rays',
              type: 'X-ray',
              date: new Date(2025, 3, 1),
              source: 'OpenDental',
              status: 'retrieved',
              selected: true
            },
            {
              id: '4',
              name: 'Clinical Notes - Crown Prep',
              type: 'Clinical Notes',
              date: new Date(2025, 3, 10),
              source: 'OpenDental',
              status: 'retrieved',
              selected: true
            },
            {
              id: '5',
              name: 'Periodontal Chart',
              type: 'Periodontal Chart',
              date: new Date(2025, 2, 15),
              source: 'OpenDental',
              status: 'retrieved',
              selected: true
            },
            {
              id: '6',
              name: 'Treatment Plan',
              type: 'Treatment Plan',
              date: new Date(2025, 2, 15),
              source: 'OpenDental',
              status: 'retrieved',
              selected: true
            },
            {
              id: '7',
              name: 'Previous Treatment Plan',
              type: 'Treatment Plan',
              date: new Date(2024, 11, 10),
              source: 'OpenDental',
              status: 'found',
              selected: false
            },
            {
              id: '8',
              name: 'Medical History Form',
              type: 'Medical History',
              date: new Date(2025, 1, 5),
              source: 'OpenDental',
              status: 'found',
              selected: false
            }
          ]
        });
      }, 3000);
    }, 2000);
  };
  
  // Reset retrieval
  const resetRetrieval = () => {
    setRetrievalStatus('idle');
    setRetrievalResults(null);
  };
  
  // Toggle document selection
  const toggleDocumentSelection = (documentId: string) => {
    if (!retrievalResults) return;
    
    setRetrievalResults({
      ...retrievalResults,
      documents: retrievalResults.documents.map(doc => 
        doc.id === documentId ? { ...doc, selected: !doc.selected } : doc
      )
    });
  };
  
  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'X-ray':
        return <Image className="h-5 w-5 text-blue-600" />;
      case 'Clinical Notes':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'Periodontal Chart':
        return <FileCheck className="h-5 w-5 text-purple-600" />;
      case 'Treatment Plan':
        return <FileCheck className="h-5 w-5 text-amber-600" />;
      default:
        return <File className="h-5 w-5 text-forestDark-light" />;
    }
  };
  
  // Group documents by type
  const groupDocumentsByType = () => {
    if (!retrievalResults) return {};
    
    return retrievalResults.documents.reduce((groups, document) => {
      const type = document.type;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(document);
      return groups;
    }, {} as Record<string, typeof retrievalResults.documents>);
  };
  
  const documentGroups = groupDocumentsByType();
  
  return (
    <Card className={`bg-white shadow-sm overflow-hidden ${className}`}>
      <div className="p-4 border-b border-taupe/20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-forestDark">Document Retrieval</h3>
          {retrievalStatus === 'completed' && (
            <button 
              onClick={resetRetrieval}
              className="text-xs text-forestGreen hover:text-forestGreen-dark"
            >
              Search Again
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {/* Patient Information */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-forestDark">{patientName}</h4>
              <p className="text-xs text-forestDark-light">Patient ID: {patientId}</p>
            </div>
            
            {retrievalStatus === 'completed' && retrievalResults && (
              <div className="flex items-center px-2 py-1 bg-green-100 rounded-full">
                <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">
                  {retrievalResults.documentsRetrieved} documents retrieved
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Retrieval Status */}
        {retrievalStatus === 'idle' && (
          <div className="text-center py-6">
            <p className="text-sm text-forestDark-light mb-4">
              Click below to automatically retrieve documents from connected systems
            </p>
            <button
              onClick={startRetrieval}
              className="px-4 py-2 bg-forestGreen text-white rounded-md hover:bg-forestGreen-dark"
            >
              Retrieve Documents
            </button>
            <p className="text-xs text-forestDark-light mt-4">
              <Clock className="h-3 w-3 inline mr-1" />
              Saves approximately 20 minutes compared to manual retrieval
            </p>
          </div>
        )}
        
        {retrievalStatus === 'searching' && (
          <div className="text-center py-6">
            <div className="animate-pulse flex flex-col items-center">
              <Search className="h-8 w-8 text-forestGreen mb-3" />
              <p className="text-sm text-forestDark">Searching for documents...</p>
              <p className="text-xs text-forestDark-light mt-2">
                Checking OpenDental and connected imaging systems
              </p>
            </div>
          </div>
        )}
        
        {retrievalStatus === 'retrieving' && (
          <div className="text-center py-6">
            <div className="animate-pulse flex flex-col items-center">
              <Download className="h-8 w-8 text-forestGreen mb-3" />
              <p className="text-sm text-forestDark">Retrieving documents...</p>
              <p className="text-xs text-forestDark-light mt-2">
                Downloading and preparing documents for submission
              </p>
            </div>
          </div>
        )}
        
        {retrievalStatus === 'completed' && retrievalResults && (
          <div>
            {/* Retrieval Summary */}
            <div className="mb-4 p-4 bg-forestLight/50 rounded-md">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-forestDark-light">Documents Found</p>
                  <p className="text-lg font-medium text-forestDark">
                    {retrievalResults.documentsFound}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-forestDark-light">Documents Retrieved</p>
                  <p className="text-lg font-medium text-green-600">
                    {retrievalResults.documentsRetrieved}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-forestDark-light">Time Saved</p>
                  <p className="text-lg font-medium text-forestDark">
                    {retrievalResults.timeSaved} min
                  </p>
                </div>
              </div>
            </div>
            
            {/* Documents by Type */}
            {Object.entries(documentGroups).map(([type, documents]) => (
              <div key={type} className="mb-3">
                <button
                  onClick={() => toggleSection(type)}
                  className="w-full flex items-center justify-between p-2 bg-forestLight/50 rounded-md text-sm font-medium text-forestDark hover:bg-forestLight"
                >
                  <div className="flex items-center">
                    {getDocumentIcon(type)}
                    <span className="ml-2">{type}</span>
                    <span className="ml-2 text-xs bg-forestGreen text-white px-1.5 py-0.5 rounded-full">
                      {documents.length}
                    </span>
                  </div>
                  {expandedSections[type] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                
                {expandedSections[type] && (
                  <div className="mt-2 space-y-2">
                    {documents.map(document => (
                      <div 
                        key={document.id}
                        className={`p-3 rounded-md border ${
                          document.status === 'retrieved' 
                            ? 'bg-green-50 border-green-200' 
                            : 'bg-forestLight/30 border-taupe/20'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <input
                              type="checkbox"
                              aria-label={`Select document ${document.name}`}
                              checked={document.selected}
                              onChange={() => toggleDocumentSelection(document.id)}
                              className="h-4 w-4 text-forestGreen focus:ring-forestGreen border-taupe/40 rounded"
                            />
                          </div>
                          
                          <div className="ml-3 flex-grow">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm font-medium text-forestDark">
                                  {document.name}
                                </p>
                                <div className="flex items-center mt-1">
                                  <p className="text-xs text-forestDark-light">
                                    {document.date.toLocaleDateString()}
                                  </p>
                                  <span className="mx-1 text-forestDark-light">•</span>
                                  <p className="text-xs text-forestDark-light">
                                    {document.source}
                                  </p>
                                </div>
                              </div>
                              
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                document.status === 'retrieved' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {document.status === 'retrieved' ? 'Retrieved' : 'Found'}
                              </span>
                            </div>
                            
                            {document.status === 'found' && (
                              <button
                                onClick={() => {
                                  // Simulate retrieving the document
                                  setRetrievalResults({
                                    ...retrievalResults,
                                    documentsRetrieved: retrievalResults.documentsRetrieved + 1,
                                    documents: retrievalResults.documents.map(doc => 
                                      doc.id === document.id 
                                        ? { ...doc, status: 'retrieved', selected: true } 
                                        : doc
                                    )
                                  });
                                }}
                                className="mt-2 px-3 py-1 bg-forestGreen text-white text-xs rounded-md hover:bg-forestGreen-dark flex items-center"
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Retrieve Document
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                className="flex-1 px-4 py-2 bg-forestGreen text-white rounded-md hover:bg-forestGreen-dark"
              >
                Use Selected Documents
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-200 text-forestDark rounded-md hover:bg-gray-300">
                Upload Additional
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-forestDark-light">
                <Clock className="h-3 w-3 inline mr-1" />
                Saved {retrievalResults.timeSaved} minutes compared to manual retrieval
              </p>
            </div>
          </div>
        )}
        
        {retrievalStatus === 'failed' && (
          <div className="text-center py-6">
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-red-100 mb-3">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-sm text-forestDark">Retrieval failed</p>
              <p className="text-xs text-forestDark-light mt-2 mb-4">
                Unable to automatically retrieve documents. Please try again or retrieve manually.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={startRetrieval}
                  className="px-3 py-1.5 bg-forestGreen text-white text-sm rounded-md hover:bg-forestGreen-dark"
                >
                  Try Again
                </button>
                <button className="px-3 py-1.5 bg-gray-200 text-forestDark text-sm rounded-md hover:bg-gray-300">
                  Manual Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
