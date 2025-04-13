
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar, MapPin, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Match } from '@/utils/cricketService';

// This component displays matches that have been scraped using the external scripts
const ScrapedMatchesViewer = () => {
  const { toast } = useToast();
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoadScrapedData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would fetch from your server or API
      // For demo purposes, we'll simulate loading the data
      const response = await fetch('/scraped-matches.json');
      
      if (!response.ok) {
        throw new Error('Failed to load scraped match data');
      }
      
      const scrapedMatches = await response.json();
      setMatches(scrapedMatches);
      
      toast({
        title: "Success",
        description: `Loaded ${scrapedMatches.length} scraped matches`,
      });
    } catch (err) {
      console.error('Error loading scraped matches:', err);
      setError('Could not load scraped match data. Make sure you have run the scraping script first.');
      
      toast({
        title: "Error",
        description: "Failed to load scraped match data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Scraped Match Data</h1>
          <p className="text-muted-foreground">
            Match data scraped from NECA website
          </p>
        </div>
        <Button 
          onClick={handleLoadScrapedData} 
          disabled={isLoading}
          className="cricket-gradient"
        >
          {isLoading ? "Loading..." : "Load Scraped Data"}
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {matches.length > 0 ? (
        <div className="space-y-6">
          {matches.map((match) => (
            <Card key={match.id} className="overflow-hidden border-l-4 border-l-cricket-pitch">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-bold mb-2">UCC vs {match.opponent}</h3>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar size={16} className="mr-2" />
                        <span>{match.date}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin size={16} className="mr-2" />
                        <span>{match.venue}</span>
                      </div>
                    </div>
                    {match.isCompleted && (
                      <div className="mt-4 grid grid-cols-2 gap-6">
                        <div>
                          <p className="font-semibold">UCC</p>
                          <p className="text-lg">{match.uccScore}</p>
                        </div>
                        <div>
                          <p className="font-semibold">{match.opponent}</p>
                          <p className="text-lg">{match.opponentScore}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  {match.isCompleted && match.result && (
                    <div className="flex flex-col items-center md:items-end">
                      <div 
                        className={`flex items-center px-6 py-3 rounded-full text-white font-bold mb-3 ${
                          match.result === "Won" 
                            ? "bg-green-500" 
                            : match.result === "Lost" 
                              ? "bg-red-500" 
                              : "bg-yellow-500"
                        }`}
                      >
                        {match.result}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              No scraped match data available. Click the button above to load scraped data, or run the scraping script first.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScrapedMatchesViewer;
