import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, CheckCircle, XCircle, FileText, AlertTriangle } from 'lucide-react';

export default function PreSubmissionValidation() {
  const [expandedProcedure, setExpandedProcedure] = useState<string | null>('d2740');

  const toggleProcedure = (id: string) => {
    setExpandedProcedure(expandedProcedure === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blueBlack dark:text-beige">Pre-submission Validation</h1>
      </div>

      {/* Patient Summary */}
      <div className="bg-lightBeige dark:bg-forestDark rounded-lg p-4 flex items-center">
        <div className="w-12 h-12 rounded-full bg-forestGreen text-white flex items-center justify-center font-bold text-lg mr-4">
          JS
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-lg">John Smith</h2>
          <p className="text-sm text-muted-foreground">DOB: 05/15/1980 | ID: P12345 | Insurance: Delta Dental PPO</p>
        </div>
        <Button variant="outline" size="sm">View Patient</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Claim Validation Summary</CardTitle>
          <CardDescription>
            AI-powered validation to prevent claim denials before submission
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Validation Summary Stats */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-lightBeige dark:bg-forestDark p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-forestGreen">85%</div>
              <div className="text-sm text-muted-foreground">Overall Score</div>
            </div>
            
            <div className="bg-lightBeige dark:bg-forestDark p-4 rounded-lg text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Procedures</div>
            </div>
            
            <div className="bg-lightBeige dark:bg-forestDark p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-red-500">1</div>
              <div className="text-sm text-muted-foreground">Critical Issues</div>
            </div>
            
            <div className="bg-lightBeige dark:bg-forestDark p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-amber-500">2</div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </div>
            
            <div className="bg-lightBeige dark:bg-forestDark p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-500">3</div>
              <div className="text-sm text-muted-foreground">Recommendations</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <Progress value={85} className="h-2" />
          </div>

          {/* Alert */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-amber-700 font-medium">
                  <strong>Action Required:</strong> This claim has issues that need to be addressed before submission to prevent denial.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="procedures">
            <TabsList className="mb-4">
              <TabsTrigger value="procedures">Procedures</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="frequency">Frequency Check</TabsTrigger>
              <TabsTrigger value="coverage">Coverage Check</TabsTrigger>
            </TabsList>
            
            <TabsContent value="procedures">
              {/* Procedure List */}
              <div className="space-y-4">
                {/* Procedure 1 - Crown */}
                <div className="border rounded-lg overflow-hidden">
                  <div 
                    className={`p-4 cursor-pointer ${
                      expandedProcedure === 'd2740' 
                        ? 'bg-lightBeige dark:bg-forestDark' 
                        : 'bg-background hover:bg-muted'
                    }`}
                    onClick={() => toggleProcedure('d2740')}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Badge className="bg-red-100 text-red-800 border-red-200 mr-3">
                          <XCircle className="mr-1 h-3 w-3" />
                          Issues Found
                        </Badge>
                        <div>
                          <h3 className="font-medium">D2740 - Crown, Porcelain/Ceramic</h3>
                          <p className="text-sm text-muted-foreground">
                            Tooth #14 | $1,200.00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-red-600 mr-2">65% Validation Score</span>
                        <svg className={`w-5 h-5 transition-transform ${expandedProcedure === 'd2740' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {expandedProcedure === 'd2740' && (
                    <div className="p-4 border-t">
                      <div className="space-y-4">
                        {/* Critical Issue */}
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r">
                          <div className="flex">
                            <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-red-700 font-medium">
                                Missing pre-treatment X-ray
                              </p>
                              <p className="text-xs text-red-600 mt-1">
                                Delta Dental requires pre-treatment X-rays for crown procedures
                              </p>
                              <div className="mt-2">
                                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                  Upload X-ray
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Warning */}
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r">
                          <div className="flex">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-amber-700 font-medium">
                                Frequency limitation warning
                              </p>
                              <p className="text-xs text-amber-600 mt-1">
                                Patient had a filling on this tooth 13 months ago. Some plans require 24 months between restoration procedures.
                              </p>
                              <div className="mt-2">
                                <Button size="sm" variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-100">
                                  Add Clinical Notes
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Documentation Requirements */}
                        <div className="bg-blue-50 p-3 rounded">
                          <h4 className="font-medium text-blue-800 mb-2">Documentation Requirements</h4>
                          <ul className="space-y-2">
                            <li className="flex items-center">
                              <input type="checkbox" className="mr-2 h-4 w-4" />
                              <span className="text-sm">Pre-treatment X-ray</span>
                            </li>
                            <li className="flex items-center">
                              <input type="checkbox" className="mr-2 h-4 w-4" checked />
                              <span className="text-sm">Clinical notes indicating need for crown</span>
                            </li>
                            <li className="flex items-center">
                              <input type="checkbox" className="mr-2 h-4 w-4" checked />
                              <span className="text-sm">Tooth charting</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Procedure 2 - Exam */}
                <div className="border rounded-lg overflow-hidden">
                  <div 
                    className={`p-4 cursor-pointer ${
                      expandedProcedure === 'd0120' 
                        ? 'bg-lightBeige dark:bg-forestDark' 
                        : 'bg-background hover:bg-muted'
                    }`}
                    onClick={() => toggleProcedure('d0120')}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Badge className="bg-green-100 text-green-800 border-green-200 mr-3">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Valid
                        </Badge>
                        <div>
                          <h3 className="font-medium">D0120 - Periodic Oral Evaluation</h3>
                          <p className="text-sm text-muted-foreground">
                            $65.00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-green-600 mr-2">100% Validation Score</span>
                        <svg className={`w-5 h-5 transition-transform ${expandedProcedure === 'd0120' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {expandedProcedure === 'd0120' && (
                    <div className="p-4 border-t">
                      <div className="space-y-4">
                        {/* Success Message */}
                        <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r">
                          <div className="flex">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-green-700 font-medium">
                                All validation checks passed
                              </p>
                              <p className="text-xs text-green-600 mt-1">
                                This procedure meets all requirements for submission
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Frequency Check */}
                        <div className="bg-blue-50 p-3 rounded">
                          <h4 className="font-medium text-blue-800 mb-2">Frequency Check</h4>
                          <p className="text-sm mb-2">Last periodic exam: 6 months ago (10/15/2024)</p>
                          <p className="text-sm text-green-700">
                            <CheckCircle className="inline h-4 w-4 mr-1" />
                            Meets 6-month frequency limitation
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Procedure 3 - X-ray */}
                <div className="border rounded-lg overflow-hidden">
                  <div 
                    className={`p-4 cursor-pointer ${
                      expandedProcedure === 'd0274' 
                        ? 'bg-lightBeige dark:bg-forestDark' 
                        : 'bg-background hover:bg-muted'
                    }`}
                    onClick={() => toggleProcedure('d0274')}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 mr-3">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Warning
                        </Badge>
                        <div>
                          <h3 className="font-medium">D0274 - Bitewings - Four Films</h3>
                          <p className="text-sm text-muted-foreground">
                            $75.00
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-amber-600 mr-2">85% Validation Score</span>
                        <svg className={`w-5 h-5 transition-transform ${expandedProcedure === 'd0274' ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {expandedProcedure === 'd0274' && (
                    <div className="p-4 border-t">
                      <div className="space-y-4">
                        {/* Warning */}
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r">
                          <div className="flex">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-amber-700 font-medium">
                                Frequency limitation warning
                              </p>
                              <p className="text-xs text-amber-600 mt-1">
                                Patient had bitewings 10 months ago. Some plans limit to once per 12 months.
                              </p>
                              <div className="mt-2">
                                <Button size="sm" variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-100">
                                  Add Clinical Notes
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Recommendation */}
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r">
                          <div className="flex">
                            <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-blue-700 font-medium">
                                Recommendation
                              </p>
                              <p className="text-xs text-blue-600 mt-1">
                                Add clinical notes explaining the medical necessity for additional X-rays within 12 months to improve approval chances.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="documentation">
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r mb-6">
                  <div className="flex">
                    <FileText className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-700 font-medium">
                        Documentation Requirements
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        The following documentation is required for this claim based on the procedures and insurance requirements.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-red-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <XCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Pre-treatment X-ray for Crown (D2740)</h3>
                          <p className="text-sm text-muted-foreground">
                            Required for crown procedure on tooth #14
                          </p>
                        </div>
                      </div>
                      <Button size="sm">Upload X-ray</Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-green-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Clinical Notes</h3>
                          <p className="text-sm text-muted-foreground">
                            Notes documenting need for crown are present
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-amber-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Additional Clinical Notes for X-rays</h3>
                          <p className="text-sm text-muted-foreground">
                            Recommended to explain need for X-rays within 12-month period
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Add Notes</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="frequency">
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r mb-6">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-700 font-medium">
                        Frequency Check Results
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        Our system has checked the frequency limitations for all procedures against the patient's history and insurance requirements.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">D2740 - Crown, Porcelain/Ceramic (Tooth #14)</h3>
                    
                    <div className="space-y-3 ml-4">
                      <div className="flex justify-between border-b border-forestLight pb-2">
                        <span className="text-sm">Previous restoration on tooth #14</span>
                        <span className="text-sm font-medium">03/15/2024 (13 months ago)</span>
                      </div>
                      <div className="flex justify-between border-b border-forestLight pb-2">
                        <span className="text-sm">Insurance limitation</span>
                        <span className="text-sm font-medium">24 months between restorations</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span className="text-sm">Status</span>
                        <span className="text-sm font-medium text-amber-600">
                          <AlertTriangle className="inline h-4 w-4 mr-1" />
                          Warning: May require additional documentation
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">D0120 - Periodic Oral Evaluation</h3>
                    
                    <div className="space-y-3 ml-4">
                      <div className="flex justify-between border-b border-forestLight pb-2">
                        <span className="text-sm">Previous exam</span>
                        <span className="text-sm font-medium">10/15/2024 (6 months ago)</span>
                      </div>
                      <div className="flex justify-between border-b border-forestLight pb-2">
                        <span className="text-sm">Insurance limitation</span>
                        <span className="text-sm font-medium">2 per benefit year</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span className="text-sm">Status</span>
                        <span className="text-sm font-medium text-green-600">
                          <CheckCircle className="inline h-4 w-4 mr-1" />
                          Meets frequency requirements
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">D0274 - Bitewings - Four Films</h3>
                    
                    <div className="space-y-3 ml-4">
                      <div className="flex justify-between border-b border-forestLight pb-2">
                        <span className="text-sm">Previous bitewings</span>
                        <span className="text-sm font-medium">06/15/2024 (10 months ago)</span>
                      </div>
                      <div className="flex justify-between border-b border-forestLight pb-2">
                        <span className="text-sm">Insurance limitation</span>
                        <span className="text-sm font-medium">1 per 12 months</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span className="text-sm">Status</span>
                        <span className="text-sm font-medium text-amber-600">
                          <AlertTriangle className="inline h-4 w-4 mr-1" />
                          Warning: May require additional documentation
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="coverage">
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r mb-6">
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-green-700 font-medium">
                        Coverage Check Results
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        All procedures are covered under the patient's insurance plan. Estimated patient responsibility is shown below.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">D2740 - Crown, Porcelain/Ceramic (Tooth #14)</h3>
                    
                    <div className="space-y-3 ml-4">
                      <div className="flex justify-between border-b border-forestLight pb-2">
                        <span className="text-sm">Fee</span>
                        <span className="text-sm font-medium">$1,200.00</span>
                      </div>
                      <div className="flex justify-between border-b border-forestLight pb-2">
                        <span className="text-sm">Insurance coverage</span>
                        <span className="text-sm font-medium">50% ($600.00)</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span className="text-sm">Patient responsibility</span>
                        <span className="text-sm font-medium">$600.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">D0120 - Periodic Oral Evaluation</h3>
                    
                    <div className="space-y-3 ml-4">
                      <div className="flex justify-between border-b border-forestLight pb-2">
                        <span className="text-sm">Fee</span>
                        <span className="text-sm font-medium">$65.00</span>
                      </div>
                      <div className="flex justify-between border-b border-forestLight pb-2">
                        <span className="text-sm">Insurance coverage</span>
                        <span className="text-sm font-medium">100% ($65.00)</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span className="text-sm">Patient responsibility</span>
                        <span className="text-sm font-medium">$0.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-3">D0274 - Bitewings - Four Films</h3>
                    
                    <div className="space-y-3 ml-4">
                      <div className="flex justify-between border-b border-forestLight pb-2">
                        <span className="text-sm">Fee</span>
                        <span className="text-sm font-medium">$75.00</span>
                      </div>
                      <div className="flex justify-between border-b border-forestLight pb-2">
                        <span className="text-sm">Insurance coverage</span>
                        <span className="text-sm font-medium">100% ($75.00)</span>
                      </div>
                      <div className="flex justify-between pb-2">
                        <span className="text-sm">Patient responsibility</span>
                        <span className="text-sm font-medium">$0.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-forestLight pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Total Patient Responsibility</span>
                      <span className="font-medium">$600.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Button variant="outline">Back to Patient</Button>
            <div className="space-x-2">
              <Button variant="outline">Save Draft</Button>
              <Button>Fix Issues & Submit</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Saved Indicator */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium">Time Saved: 45 minutes</h4>
              <p className="text-sm text-muted-foreground">Pre-submission validation completed in 3 seconds vs. traditional 45-minute manual review process</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
