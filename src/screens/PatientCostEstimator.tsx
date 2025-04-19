import React from 'react';
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
import { AlertCircle, CheckCircle, DollarSign, Calculator } from 'lucide-react';

export default function PatientCostEstimator() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-forestDark">Patient Cost Estimator</h1>
      </div>

      {/* Patient Summary */}
      <div className="bg-white rounded-lg p-4 flex items-center border border-taupe/20">
        <div className="w-12 h-12 rounded-full bg-forestGreen text-white flex items-center justify-center font-bold text-lg mr-4">
          JS
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-lg text-forestDark">John Smith</h2>
          <p className="text-sm text-forestDark-light">DOB: 05/15/1980 | ID: P12345 | Insurance: Delta Dental PPO</p>
        </div>
        <Button variant="outline" size="sm">View Patient</Button>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Treatment Cost Estimate</CardTitle>
          <CardDescription>
            Detailed breakdown of insurance coverage and patient responsibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Insurance Verification Status */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r">
            <div className="flex">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-green-700 font-medium">
                  Insurance verified successfully
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Delta Dental PPO coverage is active with $1,850 remaining annual benefit
                </p>
              </div>
            </div>
          </div>

          {/* Cost Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-forestLight/30 p-4 rounded-lg text-center border border-taupe/10">
              <div className="text-sm text-forestDark-light mb-1">Total Treatment Cost</div>
              <div className="text-2xl font-bold text-forestDark">$1,340.00</div>
            </div>
            
            <div className="bg-forestLight/30 p-4 rounded-lg text-center border border-taupe/10">
              <div className="text-sm text-forestDark-light mb-1">Insurance Pays</div>
              <div className="text-2xl font-bold text-forestGreen">$740.00</div>
            </div>
            
            <div className="bg-forestLight/30 p-4 rounded-lg text-center border border-taupe/10">
              <div className="text-sm text-forestDark-light mb-1">Patient Responsibility</div>
              <div className="text-2xl font-bold text-amber-600">$600.00</div>
            </div>
          </div>

          {/* Visual Breakdown */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-forestDark-light mb-2">Payment Breakdown</h3>
            <div className="h-8 rounded-full overflow-hidden flex">
              <div 
                className="bg-forestGreen text-white text-xs flex items-center justify-center"
                style={{ width: '55%' }}
              >
                Insurance (55%)
              </div>
              <div 
                className="bg-amber-500 text-white text-xs flex items-center justify-center"
                style={{ width: '45%' }}
              >
                Patient (45%)
              </div>
            </div>
          </div>

          <Tabs defaultValue="procedures">
            <TabsList className="mb-4">
              <TabsTrigger value="procedures">Procedures</TabsTrigger>
              <TabsTrigger value="benefits">Insurance Benefits</TabsTrigger>
              <TabsTrigger value="payment">Payment Options</TabsTrigger>
            </TabsList>
            
            <TabsContent value="procedures">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-taupe/20">
                      <th className="text-left py-3 px-4 font-medium text-forestDark-light">Procedure</th>
                      <th className="text-left py-3 px-4 font-medium text-forestDark-light">Tooth</th>
                      <th className="text-right py-3 px-4 font-medium text-forestDark-light">Fee</th>
                      <th className="text-right py-3 px-4 font-medium text-forestDark-light">Coverage</th>
                      <th className="text-right py-3 px-4 font-medium text-forestDark-light">Insurance Pays</th>
                      <th className="text-right py-3 px-4 font-medium text-forestDark-light">Patient Pays</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-taupe/10">
                      <td className="py-3 px-4">
                        <div className="font-medium text-forestDark">D2740 - Crown, Porcelain/Ceramic</div>
                        <div className="text-xs text-forestDark-light">Major Restorative</div>
                      </td>
                      <td className="py-3 px-4 text-forestDark">#14</td>
                      <td className="py-3 px-4 text-right text-forestDark">$1,200.00</td>
                      <td className="py-3 px-4 text-right text-forestDark">50%</td>
                      <td className="py-3 px-4 text-right text-forestGreen">$600.00</td>
                      <td className="py-3 px-4 text-right text-amber-600">$600.00</td>
                    </tr>
                    <tr className="border-b border-taupe/10">
                      <td className="py-3 px-4">
                        <div className="font-medium text-forestDark">D0120 - Periodic Oral Evaluation</div>
                        <div className="text-xs text-forestDark-light">Diagnostic</div>
                      </td>
                      <td className="py-3 px-4 text-forestDark">-</td>
                      <td className="py-3 px-4 text-right text-forestDark">$65.00</td>
                      <td className="py-3 px-4 text-right text-forestDark">100%</td>
                      <td className="py-3 px-4 text-right text-forestGreen">$65.00</td>
                      <td className="py-3 px-4 text-right text-amber-600">$0.00</td>
                    </tr>
                    <tr className="border-b border-taupe/10">
                      <td className="py-3 px-4">
                        <div className="font-medium text-forestDark">D0274 - Bitewings - Four Films</div>
                        <div className="text-xs text-forestDark-light">Diagnostic</div>
                      </td>
                      <td className="py-3 px-4 text-forestDark">-</td>
                      <td className="py-3 px-4 text-right text-forestDark">$75.00</td>
                      <td className="py-3 px-4 text-right text-forestDark">100%</td>
                      <td className="py-3 px-4 text-right text-forestGreen">$75.00</td>
                      <td className="py-3 px-4 text-right text-amber-600">$0.00</td>
                    </tr>
                    <tr className="border-b border-taupe/10">
                      <td colSpan={3} className="py-3 px-4 text-right font-medium text-forestDark">Totals</td>
                      <td className="py-3 px-4 text-right text-forestDark">-</td>
                      <td className="py-3 px-4 text-right font-medium text-forestGreen">$740.00</td>
                      <td className="py-3 px-4 text-right font-medium text-amber-600">$600.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-blue-700 font-medium">
                      Estimate Notes
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      This estimate is based on the information available at this time. Actual costs may vary based on changes to the treatment plan or additional findings during treatment.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="benefits">
              <div className="space-y-6">
                <div className="bg-forestLight/30 p-4 rounded-lg border border-taupe/10">
                  <h3 className="font-medium mb-4 text-forestDark">Insurance Benefits Summary</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Annual Maximum</span>
                        <span className="text-sm font-medium">$2,000.00</span>
                      </div>
                      <div className="w-full bg-taupe/20 rounded-full h-2.5">
                        <div className="bg-forestGreen h-2.5 rounded-full" style={{ width: '7.5%' }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-forestDark-light">$150 Used</span>
                        <span className="text-xs text-forestDark-light">$1,850 Remaining</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Deductible</span>
                        <span className="text-sm font-medium">$50.00 / $50.00</span>
                      </div>
                      <div className="w-full bg-taupe/20 rounded-full h-2.5">
                        <div className="bg-forestGreen h-2.5 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-forestDark-light">$50 Applied</span>
                        <span className="text-xs text-forestGreen font-medium">Deductible Met</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border rounded-lg p-4 border-taupe/20">
                    <h3 className="font-medium mb-3 text-forestDark">Coverage by Service Category</h3>
                    
                    <div className="space-y-3 text-forestDark">
                      <div className="flex justify-between border-b border-taupe/10 pb-2">
                        <span>Preventive Services</span>
                        <span className="font-medium text-forestGreen">100%</span>
                      </div>
                      <div className="flex justify-between border-b border-taupe/10 pb-2">
                        <span>Basic Services</span>
                        <span className="font-medium text-forestGreen">80%</span>
                      </div>
                      <div className="flex justify-between border-b border-taupe/10 pb-2">
                        <span>Major Services</span>
                        <span className="font-medium text-forestGreen">50%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Orthodontic Services</span>
                        <span className="font-medium text-forestGreen">50% ($1,500 lifetime)</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 border-taupe/20">
                    <h3 className="font-medium mb-3 text-forestDark">Waiting Periods & Limitations</h3>
                    
                    <div className="space-y-3 text-forestDark">
                      <div className="flex justify-between border-b border-taupe/10 pb-2">
                        <span>Preventive Services</span>
                        <span className="font-medium text-forestGreen">No waiting period</span>
                      </div>
                      <div className="flex justify-between border-b border-taupe/10 pb-2">
                        <span>Basic Services</span>
                        <span className="font-medium text-forestGreen">No waiting period</span>
                      </div>
                      <div className="flex justify-between border-b border-taupe/10 pb-2">
                        <span>Major Services</span>
                        <span className="font-medium text-forestGreen">No waiting period</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Orthodontic Services</span>
                        <span className="font-medium text-amber-600">12-month waiting period</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="payment">
              <div className="space-y-6">
                <div className="bg-forestLight/30 p-4 rounded-lg border border-taupe/10">
                  <div className="flex items-center mb-4">
                    <DollarSign className="h-5 w-5 text-forestGreen mr-2" />
                    <h3 className="font-medium text-forestDark">Payment Options for $600.00</h3>
                  </div>
                  
                  <div className="space-y-2 text-forestDark">
                    <div className="flex items-center">
                      <input type="radio" id="pay-full" name="payment-option" className="mr-2" defaultChecked />
                      <label htmlFor="pay-full" className="text-sm">Pay in full ($600.00)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="pay-3" name="payment-option" className="mr-2" />
                      <label htmlFor="pay-3" className="text-sm">3 monthly payments ($200.00/month)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="pay-6" name="payment-option" className="mr-2" />
                      <label htmlFor="pay-6" className="text-sm">6 monthly payments ($100.00/month)</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="pay-12" name="payment-option" className="mr-2" />
                      <label htmlFor="pay-12" className="text-sm">12 monthly payments ($50.00/month)</label>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 border-taupe/20">
                  <div className="flex items-center mb-4">
                    <Calculator className="h-5 w-5 text-forestGreen mr-2" />
                    <h3 className="font-medium text-forestDark">Financing Calculator</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm text-forestDark-light block mb-1">Amount to Finance</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-forestDark-light">$</span>
                        <input 
                          type="text" 
                          aria-label="Amount to Finance"
                          value="600.00" 
                          className="w-full pl-8 pr-4 py-2 rounded-md border border-input bg-background"
                          readOnly
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-forestDark-light block mb-1">Number of Months</label>
                      <select 
                        aria-label="Number of Months for Financing"
                        className="w-full px-4 py-2 rounded-md border border-input bg-background"
                      >
                        <option>3 months</option>
                        <option>6 months</option>
                        <option selected>12 months</option>
                        <option>18 months</option>
                        <option>24 months</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-forestLight/30 p-4 rounded-lg mb-4 border border-taupe/10">
                    <div className="flex justify-between mb-2 text-forestDark">
                      <span className="text-sm">Monthly Payment:</span>
                      <span className="font-medium">$50.00</span>
                    </div>
                    <div className="flex justify-between mb-2 text-forestDark">
                      <span className="text-sm">Total Payments:</span>
                      <span className="font-medium">$600.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Interest:</span>
                      <span className="font-medium text-forestGreen">$0.00 (0% APR)</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r mb-4">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                      <p className="text-xs text-blue-600">
                        In-house payment plans are interest-free for up to 12 months. Third-party financing options are available for longer terms.
                      </p>
                    </div>
                  </div>
                  
                  <Button className="w-full">Generate Payment Plan</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-8">
            <Button variant="outline">Back to Patient</Button>
            <div className="space-x-2">
              <Button variant="outline">Print Estimate</Button>
              <Button>Email to Patient</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Saved Indicator */}
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-medium text-forestDark">Time Saved: 20 minutes</h4>
              <p className="text-sm text-forestDark-light">Cost estimation completed in 2 seconds vs. traditional 20-minute manual calculation process</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
