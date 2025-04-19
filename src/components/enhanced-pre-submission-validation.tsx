import React, { useState } from 'react';
import { useA2A } from '@/components/a2a-provider';
import { Card } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Clock, FileCheck, X, ChevronDown, ChevronUp, Search, Download } from 'lucide-react';

// Define type for required documents
type RequiredDocument = {
  type: string;
  status: 'missing' | 'found' | 'retrieved' | 'not_required';
  source?: string;
};

interface EnhancedPreSubmissionValidationProps {
  claimId: string;
  patientName: string;
  procedureCodes: string[];
  className?: string;
}

export const EnhancedPreSubmissionValidation: React.FC<EnhancedPreSubmissionValidationProps> = ({
  claimId,
  patientName,
  procedureCodes,
  className
}) => {
  const { sendMessage, approveTask } = useA2A();
  
  const [validationStatus, setValidationStatus] = useState<
    'idle' | 'validating' | 'validated' | 'failed'
  >('idle');
  
  const [validationResults, setValidationResults] = useState<{
    overallScore: number;
    procedureCount: number;
    criticalIssues: number;
    warnings: number;
    recommendations: number;
    procedures: Array<{
      code: string;
      description: string;
      validationScore: number;
      issues: Array<{
        type: 'critical' | 'warning' | 'recommendation';
        message: string;
        autoResolvable: boolean;
        resolved: boolean;
      }>;
    }>;
    requiredDocuments: Array<RequiredDocument>;
  } | null>(null);
  
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    issues: true,
    documents: false,
    procedures: false
  });
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Start validation
  const startValidation = async () => {
    setValidationStatus('validating');
    
    // Simulate sending a message to the backend
    sendMessage({
      source: 'ui',
      destination: 'claim-validation-agent',
      capability: 'CLAIM_VALIDATION',
      action: 'VALIDATE_CLAIM',
      context: {
        claimId,
        patientName,
        procedureCodes
      },
      requiresApproval: false
    });
    
    // Simulate a delay for validation
    setTimeout(() => {
      setValidationStatus('validated');
      setValidationResults({
        overallScore: 85,
        procedureCount: procedureCodes.length,
        criticalIssues: 1,
        warnings: 2,
        recommendations: 1,
        procedures: [
          {
            code: 'D2750',
            description: 'Crown - porcelain fused to high noble metal',
            validationScore: 70,
            issues: [
              {
                type: 'critical',
                message: 'Missing pre-operative X-ray required for crown procedure',
                autoResolvable: true,
                resolved: false
              },
              {
                type: 'warning',
                message: 'Frequency limitation: Last crown on this tooth was less than 5 years ago',
                autoResolvable: false,
                resolved: false
              }
            ]
          },
          {
            code: 'D2950',
            description: 'Core buildup, including any pins when required',
            validationScore: 90,
            issues: [
              {
                type: 'warning',
                message: 'Consider adding narrative explaining necessity of buildup',
                autoResolvable: false,
                resolved: false
              }
            ]
          },
          {
            code: 'D0220',
            description: 'Intraoral - periapical first radiographic image',
            validationScore: 100,
            issues: [
              {
                type: 'recommendation',
                message: 'Consider bundling with complete series if more than 4 periapicals',
                autoResolvable: false,
                resolved: false
              }
            ]
          }
        ],
        requiredDocuments: [
          {
            type: 'Pre-operative X-ray',
            status: 'missing'
          },
          {
            type: 'Clinical Notes',
            status: 'found',
            source: 'OpenDental'
          },
          {
            type: 'Periodontal Chart',
            status: 'not_required'
          }
        ]
      });
    }, 3000);
  };
  
  // Reset validation
  const resetValidation = () => {
    setValidationStatus('idle');
    setValidationResults(null);
  };
  
  // Resolve an issue automatically
  const resolveIssue = (procedureIndex: number, issueIndex: number) => {
    if (!validationResults) return;
    
    // Create a deep copy of validation results
    const updatedResults = JSON.parse(JSON.stringify(validationResults));
    
    // Mark the issue as resolved
    updatedResults.procedures[procedureIndex].issues[issueIndex].resolved = true;
    
    // If this was a critical issue, update the counts and score
    if (updatedResults.procedures[procedureIndex].issues[issueIndex].type === 'critical') {
      updatedResults.criticalIssues -= 1;
      updatedResults.overallScore += 10;
      updatedResults.procedures[procedureIndex].validationScore += 20;
    } else if (updatedResults.procedures[procedureIndex].issues[issueIndex].type === 'warning') {
      updatedResults.warnings -= 1;
      updatedResults.overallScore += 5;
      updatedResults.procedures[procedureIndex].validationScore += 10;
    } else {
      updatedResults.recommendations -= 1;
      updatedResults.overallScore += 2;
      updatedResults.procedures[procedureIndex].validationScore += 5;
    }
    
    // Cap the scores at 100
    updatedResults.overallScore = Math.min(100, updatedResults.overallScore);
    updatedResults.procedures[procedureIndex].validationScore = Math.min(100, updatedResults.procedures[procedureIndex].validationScore);
    
    // If this was a missing X-ray, update the document status
    if (updatedResults.procedures[procedureIndex].issues[issueIndex].message.includes('X-ray')) {
      const docIndex = updatedResults.requiredDocuments.findIndex(doc => doc.type.includes('X-ray'));
      if (docIndex >= 0) {
        updatedResults.requiredDocuments[docIndex].status = 'retrieved';
        updatedResults.requiredDocuments[docIndex].source = 'OpenDental';
      }
    }
    
    setValidationResults(updatedResults);
  };
  
  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };
  
  // Get background color based on score
  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-amber-100';
    return 'bg-red-100';
  };
  
  return (
    <Card className={`bg-white shadow-sm overflow-hidden ${className}`}>
      <div className="p-4 border-b border-taupe/20">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-forestDark">Pre-submission Validation</h3>
          {validationStatus === 'validated' && (
            <button 
              onClick={resetValidation}
              className="text-xs text-forestGreen hover:text-forestGreen-dark"
            >
              Validate Again
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {/* Claim Information */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-forestDark">{patientName}</h4>
              <p className="text-xs text-forestDark-light">Claim ID: {claimId}</p>
            </div>
            
            {validationStatus === 'validated' && validationResults && (
              <div className={`flex items-center px-3 py-1.5 rounded-full ${getScoreBgColor(validationResults.overallScore)}`}>
                <span className={`text-sm font-medium ${getScoreColor(validationResults.overallScore)}`}>
                  {validationResults.overallScore}%
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Validation Status */}
        {validationStatus === 'idle' && (
          <div className="text-center py-6">
            <p className="text-sm text-forestDark-light mb-4">
              Click below to automatically validate this claim before submission
            </p>
            <button
              onClick={startValidation}
              className="px-4 py-2 bg-forestGreen text-white rounded-md hover:bg-forestGreen-dark"
            >
              Validate Claim
            </button>
            <p className="text-xs text-forestDark-light mt-4">
              <Clock className="h-3 w-3 inline mr-1" />
              Saves approximately 45 minutes compared to manual validation
            </p>
          </div>
        )}
        
        {validationStatus === 'validating' && (
          <div className="text-center py-6">
            <div className="animate-pulse flex flex-col items-center">
              <FileCheck className="h-8 w-8 text-forestGreen mb-3" />
              <p className="text-sm text-forestDark">Validating claim...</p>
              <p className="text-xs text-forestDark-light mt-2">
                Checking procedure codes, documentation, and insurance requirements
              </p>
            </div>
          </div>
        )}
        
        {validationStatus === 'validated' && validationResults && (
          <div>
            {/* Validation Summary */}
            <div className="mb-4 p-4 bg-forestLight/50 rounded-md">
              <div className="grid grid-cols-5 gap-2 text-center">
                <div>
                  <p className="text-xs text-forestDark-light">Procedures</p>
                  <p className="text-lg font-medium text-forestDark">
                    {validationResults.procedureCount}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-forestDark-light">Critical Issues</p>
                  <p className={`text-lg font-medium ${
                    validationResults.criticalIssues > 0 
                      ? 'text-red-600' 
                      : 'text-forestDark'
                  }`}>
                    {validationResults.criticalIssues}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-forestDark-light">Warnings</p>
                  <p className={`text-lg font-medium ${
                    validationResults.warnings > 0 
                      ? 'text-amber-600' 
                      : 'text-forestDark'
                  }`}>
                    {validationResults.warnings}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-forestDark-light">Recommendations</p>
                  <p className="text-lg font-medium text-forestDark">
                    {validationResults.recommendations}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-forestDark-light">Overall Score</p>
                  <p className={`text-lg font-medium ${getScoreColor(validationResults.overallScore)}`}>
                    {validationResults.overallScore}%
                  </p>
                </div>
              </div>
            </div>
            
            {/* Issues Section */}
            <div className="mb-3">
              <button
                onClick={() => toggleSection('issues')}
                className="w-full flex items-center justify-between p-2 bg-forestLight/50 rounded-md text-sm font-medium text-forestDark hover:bg-forestLight"
              >
                <span>Issues & Warnings</span>
                {expandedSections.issues ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              
              {expandedSections.issues && (
                <div className="mt-2 space-y-3">
                  {validationResults.procedures.flatMap((procedure, procIndex) => 
                    procedure.issues.map((issue, issueIndex) => (
                      <div 
                        key={`${procIndex}-${issueIndex}`}
                        className={`p-3 rounded-md border ${
                          issue.type === 'critical' 
                            ? 'bg-red-50 border-red-200' 
                            : issue.type === 'warning'
                            ? 'bg-amber-50 border-amber-200'
                            : 'bg-blue-50 border-blue-200'
                        } ${issue.resolved ? 'opacity-50' : ''}`}
                      >
                        <div className="flex items-start">
                          {issue.type === 'critical' && !issue.resolved && (
                            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                          )}
                          {issue.type === 'warning' && !issue.resolved && (
                            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                          )}
                          {issue.type === 'recommendation' && !issue.resolved && (
                            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                          )}
                          {issue.resolved && (
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                          )}
                          
                          <div className="flex-grow">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm font-medium text-forestDark">
                                  {procedure.code} - {procedure.description}
                                </p>
                                <p className="text-xs text-forestDark-light mt-1">
                                  {issue.message}
                                </p>
                              </div>
                              <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                issue.type === 'critical' 
                                  ? 'bg-red-100 text-red-800' 
                                  : issue.type === 'warning'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {issue.type === 'critical' ? 'Critical' : 
                                 issue.type === 'warning' ? 'Warning' : 'Recommendation'}
                              </div>
                            </div>
                            
                            {issue.autoResolvable && !issue.resolved && (
                              <button
                                onClick={() => resolveIssue(procIndex, issueIndex)}
                                className="mt-2 px-3 py-1.5 bg-forestGreen text-white text-xs rounded-md hover:bg-forestGreen-dark flex items-center"
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Retrieve from OpenDental
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  
                  {validationResults.procedures.every(p => p.issues.every(i => i.resolved)) && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <p className="text-sm text-forestDark">All issues resolved</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Required Documents Section */}
            <div className="mb-3">
              <button
                onClick={() => toggleSection('documents')}
                className="w-full flex items-center justify-between p-2 bg-forestLight/50 rounded-md text-sm font-medium text-forestDark hover:bg-forestLight"
              >
                <span>Required Documentation</span>
                {expandedSections.documents ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              
              {expandedSections.documents && (
                <div className="mt-2 space-y-2">
                  {validationResults.requiredDocuments.map((doc: RequiredDocument, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 border-b border-taupe/10 last:border-0"
                    >
                      <div className="flex items-center">
                        {doc.status === 'missing' && (
                          <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                        )}
                        {doc.status === 'found' && (
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        )}
                        {doc.status === 'retrieved' && (
                          <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                        )}
                        {doc.status === 'not_required' && (
                          <CheckCircle className="h-4 w-4 text-gray-400 mr-2" />
                        )}
                        <span className="text-sm text-forestDark">{doc.type}</span>
                      </div>
                      
                      <div className="flex items-center">
                        {doc.source && (
                          <span className="text-xs text-forestDark-light mr-2">
                            {doc.source}
                          </span>
                        )}
                        
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          doc.status === 'missing' 
                            ? 'bg-red-100 text-red-800' 
                            : doc.status === 'found'
                            ? 'bg-green-100 text-green-800'
                            : doc.status === 'retrieved'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {doc.status === 'missing' ? 'Missing' : 
                           doc.status === 'found' ? 'Found' : 
                           doc.status === 'retrieved' ? 'Retrieved' : 'Not Required'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Procedure Validation Section */}
            <div className="mb-4">
              <button
                onClick={() => toggleSection('procedures')}
                className="w-full flex items-center justify-between p-2 bg-forestLight/50 rounded-md text-sm font-medium text-forestDark hover:bg-forestLight"
              >
                <span>Procedure Validation</span>
                {expandedSections.procedures ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
              
              {expandedSections.procedures && (
                <div className="mt-2 space-y-2">
                  {validationResults.procedures.map((procedure, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 border-b border-taupe/10 last:border-0"
                    >
                      <div>
                        <p className="text-sm font-medium text-forestDark">
                          {procedure.code}
                        </p>
                        <p className="text-xs text-forestDark-light">
                          {procedure.description}
                        </p>
                      </div>
                      
                      <div className={`px-2 py-1 rounded-full ${getScoreBgColor(procedure.validationScore)}`}>
                        <span className={`text-xs font-medium ${getScoreColor(procedure.validationScore)}`}>
                          {procedure.validationScore}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                className={`flex-1 px-4 py-2 bg-forestGreen text-white rounded-md hover:bg-forestGreen-dark ${
                  validationResults.criticalIssues > 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={validationResults.criticalIssues > 0}
              >
                Submit Claim
              </button>
              <button className="flex-1 px-4 py-2 bg-gray-200 text-forestDark rounded-md hover:bg-gray-300">
                Save Draft
              </button>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-xs text-forestDark-light">
                <Clock className="h-3 w-3 inline mr-1" />
                Saved 45 minutes compared to manual validation
              </p>
            </div>
          </div>
        )}
        
        {validationStatus === 'failed' && (
          <div className="text-center py-6">
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-red-100 mb-3">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-sm text-forestDark">Validation failed</p>
              <p className="text-xs text-forestDark-light mt-2 mb-4">
                Unable to automatically validate claim. Please try again or validate manually.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={startValidation}
                  className="px-3 py-1.5 bg-forestGreen text-white text-sm rounded-md hover:bg-forestGreen-dark"
                >
                  Try Again
                </button>
                <button className="px-3 py-1.5 bg-gray-200 text-forestDark text-sm rounded-md hover:bg-gray-300">
                  Validate Manually
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
