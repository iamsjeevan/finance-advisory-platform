
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Chart } from '@/components/ui/chart';
import { ArrowLeft, Clock, Wallet, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AssetItem {
  name: string;
  value: number;
  category: 'cash' | 'investment' | 'property' | 'other';
}

interface LiabilityItem {
  name: string;
  value: number;
  category: 'mortgage' | 'loan' | 'credit' | 'other';
}

interface NetWorthResult {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  assetData: AssetItem[];
  liabilityData: LiabilityItem[];
  date: string;
}

const NetWorthTracker = () => {
  const [activeTab, setActiveTab] = useState('calculator');
  const [trackerHistory, setTrackerHistory] = useState<NetWorthResult[]>([]);
  const [trackerResult, setTrackerResult] = useState<NetWorthResult | null>(null);
  
  const [assets, setAssets] = useState<AssetItem[]>([
    { name: 'Checking Account', value: 5000, category: 'cash' },
    { name: 'Savings Account', value: 10000, category: 'cash' },
    { name: 'Investment Portfolio', value: 50000, category: 'investment' },
    { name: 'Primary Residence', value: 300000, category: 'property' }
  ]);
  
  const [liabilities, setLiabilities] = useState<LiabilityItem[]>([
    { name: 'Mortgage', value: 250000, category: 'mortgage' },
    { name: 'Auto Loan', value: 15000, category: 'loan' },
    { name: 'Student Loan', value: 20000, category: 'loan' },
    { name: 'Credit Card', value: 2000, category: 'credit' }
  ]);
  
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetValue, setNewAssetValue] = useState('');
  const [newAssetCategory, setNewAssetCategory] = useState('cash');
  
  const [newLiabilityName, setNewLiabilityName] = useState('');
  const [newLiabilityValue, setNewLiabilityValue] = useState('');
  const [newLiabilityCategory, setNewLiabilityCategory] = useState('loan');

  const calculateNetWorth = () => {
    const totalAssets = assets.reduce((sum, item) => sum + item.value, 0);
    const totalLiabilities = liabilities.reduce((sum, item) => sum + item.value, 0);
    const netWorth = totalAssets - totalLiabilities;
    
    const result: NetWorthResult = {
      totalAssets,
      totalLiabilities,
      netWorth,
      assetData: [...assets],
      liabilityData: [...liabilities],
      date: new Date().toISOString()
    };
    
    setTrackerResult(result);
    setTrackerHistory([result, ...trackerHistory]);
    setActiveTab('results');
  };

  const addAsset = () => {
    if (newAssetName && newAssetValue && !isNaN(Number(newAssetValue))) {
      setAssets([
        ...assets,
        { 
          name: newAssetName, 
          value: Number(newAssetValue), 
          category: newAssetCategory as AssetItem['category']
        }
      ]);
      setNewAssetName('');
      setNewAssetValue('');
    }
  };
  
  const removeAsset = (index: number) => {
    setAssets(assets.filter((_, i) => i !== index));
  };
  
  const addLiability = () => {
    if (newLiabilityName && newLiabilityValue && !isNaN(Number(newLiabilityValue))) {
      setLiabilities([
        ...liabilities,
        { 
          name: newLiabilityName, 
          value: Number(newLiabilityValue), 
          category: newLiabilityCategory as LiabilityItem['category']
        }
      ]);
      setNewLiabilityName('');
      setNewLiabilityValue('');
    }
  };
  
  const removeLiability = (index: number) => {
    setLiabilities(liabilities.filter((_, i) => i !== index));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6 pt-16">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/tools">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Net Worth Tracker</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Track Your Net Worth</CardTitle>
            <CardDescription>
              Calculate and track your net worth over time to measure your financial progress and wealth building.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="calculator">Calculator</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="calculator">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Assets</h3>
                    <div className="space-y-4">
                      {assets.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex-1">
                            <Input 
                              value={item.name} 
                              onChange={(e) => {
                                const updated = [...assets];
                                updated[index].name = e.target.value;
                                setAssets(updated);
                              }} 
                            />
                          </div>
                          <div className="w-32">
                            <Input 
                              type="number"
                              value={item.value}
                              onChange={(e) => {
                                const updated = [...assets];
                                updated[index].value = Number(e.target.value);
                                setAssets(updated);
                              }}
                            />
                          </div>
                          <div className="w-32">
                            <select 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={item.category}
                              onChange={(e) => {
                                const updated = [...assets];
                                updated[index].category = e.target.value as AssetItem['category'];
                                setAssets(updated);
                              }}
                            >
                              <option value="cash">Cash</option>
                              <option value="investment">Investment</option>
                              <option value="property">Property</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeAsset(index)}
                            className="h-10 w-10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <Input 
                            placeholder="Asset Name" 
                            value={newAssetName}
                            onChange={(e) => setNewAssetName(e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <Input 
                            type="number"
                            placeholder="Value"
                            value={newAssetValue}
                            onChange={(e) => setNewAssetValue(e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <select 
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={newAssetCategory}
                            onChange={(e) => setNewAssetCategory(e.target.value)}
                          >
                            <option value="cash">Cash</option>
                            <option value="investment">Investment</option>
                            <option value="property">Property</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={addAsset}
                          className="h-10 w-10"
                          disabled={!newAssetName || !newAssetValue}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Liabilities</h3>
                    <div className="space-y-4">
                      {liabilities.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex-1">
                            <Input 
                              value={item.name} 
                              onChange={(e) => {
                                const updated = [...liabilities];
                                updated[index].name = e.target.value;
                                setLiabilities(updated);
                              }} 
                            />
                          </div>
                          <div className="w-32">
                            <Input 
                              type="number"
                              value={item.value}
                              onChange={(e) => {
                                const updated = [...liabilities];
                                updated[index].value = Number(e.target.value);
                                setLiabilities(updated);
                              }}
                            />
                          </div>
                          <div className="w-32">
                            <select 
                              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              value={item.category}
                              onChange={(e) => {
                                const updated = [...liabilities];
                                updated[index].category = e.target.value as LiabilityItem['category'];
                                setLiabilities(updated);
                              }}
                            >
                              <option value="mortgage">Mortgage</option>
                              <option value="loan">Loan</option>
                              <option value="credit">Credit Card</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeLiability(index)}
                            className="h-10 w-10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <Input 
                            placeholder="Liability Name" 
                            value={newLiabilityName}
                            onChange={(e) => setNewLiabilityName(e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <Input 
                            type="number"
                            placeholder="Value"
                            value={newLiabilityValue}
                            onChange={(e) => setNewLiabilityValue(e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <select 
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            value={newLiabilityCategory}
                            onChange={(e) => setNewLiabilityCategory(e.target.value)}
                          >
                            <option value="mortgage">Mortgage</option>
                            <option value="loan">Loan</option>
                            <option value="credit">Credit Card</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={addLiability}
                          className="h-10 w-10"
                          disabled={!newLiabilityName || !newLiabilityValue}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={calculateNetWorth} className="w-full md:w-auto">Calculate Net Worth</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="results">
                {trackerResult ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Total Assets</p>
                            <p className="text-3xl font-bold">${trackerResult.totalAssets.toLocaleString()}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Total Liabilities</p>
                            <p className="text-3xl font-bold">${trackerResult.totalLiabilities.toLocaleString()}</p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">Net Worth</p>
                            <p className={`text-3xl font-bold ${trackerResult.netWorth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              ${trackerResult.netWorth.toLocaleString()}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Asset Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 h-64">
                          {trackerResult.assetData.length > 0 ? (
                            <Chart
                              type="pie"
                              data={{
                                labels: trackerResult.assetData.map(item => item.name),
                                datasets: [
                                  {
                                    data: trackerResult.assetData.map(item => item.value),
                                    backgroundColor: [
                                      '#9b87f5', '#87b3f5', '#87f5e5', '#87f59b', 
                                      '#b3f587', '#f5e587', '#f5b387', '#f587b3',
                                      '#d987f5', '#87a6f5', '#87f5d9', '#95f587'
                                    ]
                                  }
                                ]
                              }}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <p className="text-muted-foreground">No asset data available</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Liability Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 h-64">
                          {trackerResult.liabilityData.length > 0 ? (
                            <Chart
                              type="pie"
                              data={{
                                labels: trackerResult.liabilityData.map(item => item.name),
                                datasets: [
                                  {
                                    data: trackerResult.liabilityData.map(item => item.value),
                                    backgroundColor: [
                                      '#f5877c', '#f59b87', '#f5b387', '#f5cd87', 
                                      '#f5e587', '#e5f587', '#b3f587', '#87f59b',
                                      '#f587c4', '#f5879b', '#f587d9', '#f58795'
                                    ]
                                  }
                                ]
                              }}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <p className="text-muted-foreground">No liability data available</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Asset Categories</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {['cash', 'investment', 'property', 'other'].map((category) => {
                            const categoryTotal = trackerResult.assetData
                              .filter(item => item.category === category)
                              .reduce((sum, item) => sum + item.value, 0);
                            
                            const percentage = trackerResult.totalAssets > 0 
                              ? ((categoryTotal / trackerResult.totalAssets) * 100).toFixed(1) 
                              : '0';
                            
                            return (
                              <Card key={category}>
                                <CardContent className="pt-6">
                                  <div className="text-center">
                                    <p className="text-sm text-muted-foreground capitalize">{category}</p>
                                    <p className="text-xl font-bold">${categoryTotal.toLocaleString()}</p>
                                    <p className="text-sm text-muted-foreground">{percentage}%</p>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab('calculator')}>Adjust Values</Button>
                      <Button onClick={() => setActiveTab('calculator')}>New Calculation</Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Net Worth Results Yet</h3>
                    <p className="text-muted-foreground">Complete the calculator form to see your net worth breakdown</p>
                    <Button className="mt-4" onClick={() => setActiveTab('calculator')}>Go to Calculator</Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="history">
                {trackerHistory.length > 0 ? (
                  <div className="space-y-4">
                    {trackerHistory.map((calc, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="p-4 flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(calc.date).toLocaleDateString()} at {new Date(calc.date).toLocaleTimeString()}
                              </p>
                              <p className="font-medium">
                                Assets: ${calc.totalAssets.toLocaleString()} | Liabilities: ${calc.totalLiabilities.toLocaleString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Net Worth: ${calc.netWorth.toLocaleString()}
                              </p>
                            </div>
                            <div className="md:text-right space-y-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => {
                                  setTrackerResult(calc);
                                  setActiveTab('results');
                                }}
                              >
                                View Results
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No History Yet</h3>
                    <p className="text-muted-foreground">Your net worth history will appear here</p>
                    <Button className="mt-4" onClick={() => setActiveTab('calculator')}>Create Your First Entry</Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default NetWorthTracker;
