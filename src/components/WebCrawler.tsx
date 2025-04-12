
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import FirecrawlApp from '@mendable/firecrawl-js';
import { Loader2 } from 'lucide-react';

const WebCrawler = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [crawlResults, setCrawlResults] = useState<any | null>(null);

  const handleCrawl = async () => {
    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter your Firecrawl API key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const firecrawl = new FirecrawlApp({ apiKey });
      
      toast({
        title: "Crawling Started",
        description: "Starting to crawl the NECA website for UCC data...",
      });

      // Using the correct property name 'includeTerms' instead of 'searchTerms'
      const response = await firecrawl.crawlUrl('https://neca2020.org/', {
        limit: 10,
        scrapeOptions: {
          formats: ['markdown', 'html'],
          includeTerms: ['UCC', 'United Cricket Club']
        }
      });

      if (response.success) {
        setCrawlResults(response);
        toast({
          title: "Success",
          description: "Successfully crawled the NECA website!",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to crawl the website. Please check your API key.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Crawl error:", error);
      toast({
        title: "Error",
        description: "An error occurred while crawling the website",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Update UCC Data</h2>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Configure Data Crawler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="apiKey" className="block text-sm font-medium mb-1">
                Firecrawl API Key
              </label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Firecrawl API key"
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                You need a Firecrawl API key to fetch data from the NECA website
              </p>
            </div>
            
            <Button 
              onClick={handleCrawl} 
              disabled={isLoading} 
              className="cricket-gradient hover:opacity-90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Crawling...
                </>
              ) : (
                "Crawl NECA Website for UCC Data"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : crawlResults ? (
        <Card>
          <CardHeader>
            <CardTitle>Crawl Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Status: {crawlResults.status}</h3>
                <p>Pages Crawled: {crawlResults.completed} of {crawlResults.total}</p>
                <p>Credits Used: {crawlResults.creditsUsed}</p>
              </div>
              
              {crawlResults.data && crawlResults.data.length > 0 ? (
                <div>
                  <h3 className="font-semibold mb-2">Found Data:</h3>
                  <div className="bg-muted p-4 rounded-lg overflow-auto max-h-96">
                    <pre className="text-xs">{JSON.stringify(crawlResults.data, null, 2)}</pre>
                  </div>
                </div>
              ) : (
                <p>No data found specifically for UCC team. Try adjusting the search criteria.</p>
              )}
              
              <Button onClick={() => setCrawlResults(null)} variant="outline">
                Clear Results
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default WebCrawler;
