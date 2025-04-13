
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, UserPlus } from 'lucide-react';
import { Player } from '@/utils/cricketService';

// Parse player data from the crawled HTML
const parsePlayerData = (htmlContent: string): Partial<Player> | null => {
  try {
    // Extract player name
    const nameMatch = htmlContent.match(/<h1 class="text-xl font-bold mb-2">(.*?)<\/h1>/);
    const name = nameMatch ? nameMatch[1].trim() : null;
    
    if (!name) return null;
    
    // Extract batting stats
    const runsMatch = htmlContent.match(/Runs<\/th>\s*<td.*?>(.*?)<\/td>/);
    const runs = runsMatch ? parseInt(runsMatch[1].trim(), 10) || 0 : 0;
    
    const battingAvgMatch = htmlContent.match(/Average<\/th>\s*<td.*?>(.*?)<\/td>/);
    const battingAverage = battingAvgMatch ? parseFloat(battingAvgMatch[1].trim()) || 0 : 0;
    
    const matchesMatch = htmlContent.match(/Matches<\/th>\s*<td.*?>(.*?)<\/td>/);
    const matches = matchesMatch ? parseInt(matchesMatch[1].trim(), 10) || 0 : 0;

    // Extract bowling stats
    const wicketsMatch = htmlContent.match(/Wickets<\/th>\s*<td.*?>(.*?)<\/td>/);
    const wickets = wicketsMatch ? parseInt(wicketsMatch[1].trim(), 10) || 0 : 0;
    
    const bowlingAvgMatch = htmlContent.match(/Bowling Average<\/th>\s*<td.*?>(.*?)<\/td>/);
    const bowlingAverage = bowlingAvgMatch ? parseFloat(bowlingAvgMatch[1].trim()) || 0 : 0;

    // Extract role and style
    const roleMatch = htmlContent.match(/Role<\/th>\s*<td.*?>(.*?)<\/td>/);
    const role = roleMatch ? roleMatch[1].trim() : "Batsman";
    
    const battingStyleMatch = htmlContent.match(/Batting Style<\/th>\s*<td.*?>(.*?)<\/td>/);
    const battingStyle = battingStyleMatch ? battingStyleMatch[1].trim() : undefined;
    
    const bowlingStyleMatch = htmlContent.match(/Bowling Style<\/th>\s*<td.*?>(.*?)<\/td>/);
    const bowlingStyle = bowlingStyleMatch ? bowlingStyleMatch[1].trim() : undefined;

    // Create player object
    const player: Partial<Player> = {
      name,
      role,
      battingStyle,
      bowlingStyle,
      matches,
      runsScored: runs,
      battingAverage,
      wickets,
      bowlingAverage,
      imageUrl: "/placeholder.svg",
      bio: `${name} is a player for United Cricket Club.`
    };

    return player;
  } catch (error) {
    console.error("Error parsing player data:", error);
    return null;
  }
};

// Create a function to crawl the NECA website for player data
const crawlPlayerUrl = async (url: string, apiKey: string) => {
  const response = await fetch('https://api.firecrawl.dev/v1/crawl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      url,
      limit: 1,
      scrapeOptions: {
        formats: ['html'],
        filter: {
          includeTerms: ['player', 'statistics', 'batting', 'bowling']
        }
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to crawl website');
  }

  return response.json();
};

const WebCrawler = () => {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState('');
  const [url, setUrl] = useState('https://neca2020.org/playerprofile/');
  const [isLoading, setIsLoading] = useState(false);
  const [crawlResults, setCrawlResults] = useState<any | null>(null);
  const [extractedPlayer, setExtractedPlayer] = useState<Partial<Player> | null>(null);

  const handleCrawl = async () => {
    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please enter your Firecrawl API key",
        variant: "destructive",
      });
      return;
    }

    if (!url.includes('playerprofile')) {
      toast({
        title: "Warning",
        description: "URL should be a NECA player profile URL (e.g., https://neca2020.org/playerprofile/...)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setExtractedPlayer(null);
    
    try {
      toast({
        title: "Crawling Started",
        description: "Starting to crawl the player profile...",
      });

      const response = await crawlPlayerUrl(url, apiKey);

      if (response.success) {
        setCrawlResults(response);
        
        // Extract player data from the HTML content
        if (response.data && response.data.length > 0 && response.data[0].content) {
          const htmlContent = response.data[0].content.html || '';
          const playerData = parsePlayerData(htmlContent);
          
          if (playerData) {
            setExtractedPlayer(playerData);
            toast({
              title: "Success",
              description: `Successfully extracted player data for ${playerData.name}`,
            });
          } else {
            toast({
              title: "Warning",
              description: "Couldn't extract player data from the crawled content",
              variant: "destructive",
            });
          }
        }
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
        description: error instanceof Error ? error.message : "An error occurred while crawling the website",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePlayer = () => {
    if (!extractedPlayer) return;
    
    // In a real app, you would save this to the database
    // For now, we'll just show a success toast
    toast({
      title: "Player Saved",
      description: `${extractedPlayer.name} has been added to your players database`,
    });
    
    // Reset the extracted player
    setExtractedPlayer(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-8">Import Player Data</h2>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">NECA Player Data Importer</CardTitle>
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
                You need a Firecrawl API key to fetch data from websites
              </p>
            </div>
            
            <div>
              <label htmlFor="url" className="block text-sm font-medium mb-1">
                NECA Player Profile URL
              </label>
              <Input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://neca2020.org/playerprofile/[id]"
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter the full URL to a player profile on the NECA website
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
                  Importing...
                </>
              ) : (
                "Import Player Data"
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
      ) : extractedPlayer ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Extracted Player: {extractedPlayer.name}</span>
              <Button 
                onClick={handleSavePlayer}
                variant="default" 
                className="cricket-gradient"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Save Player
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <p><span className="font-medium">Name:</span> {extractedPlayer.name}</p>
                  <p><span className="font-medium">Role:</span> {extractedPlayer.role}</p>
                  <p><span className="font-medium">Batting Style:</span> {extractedPlayer.battingStyle || 'N/A'}</p>
                  <p><span className="font-medium">Bowling Style:</span> {extractedPlayer.bowlingStyle || 'N/A'}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Statistics</h3>
                  <p><span className="font-medium">Matches:</span> {extractedPlayer.matches}</p>
                  <p><span className="font-medium">Runs:</span> {extractedPlayer.runsScored}</p>
                  <p><span className="font-medium">Batting Average:</span> {extractedPlayer.battingAverage?.toFixed(2)}</p>
                  <p><span className="font-medium">Wickets:</span> {extractedPlayer.wickets}</p>
                  <p><span className="font-medium">Bowling Average:</span> {extractedPlayer.bowlingAverage?.toFixed(2) || 'N/A'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
                  <p className="text-sm text-muted-foreground">Raw HTML data was found but player information couldn't be extracted.</p>
                </div>
              ) : (
                <p>No data found for this player profile. Try another URL.</p>
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
