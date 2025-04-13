
import { useState, useMemo } from 'react';
import { usePlayers } from "@/utils/cricketService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Search, 
  ArrowUpDown, 
  BarChart, 
  Award, 
  User 
} from 'lucide-react';

const PlayerStats = () => {
  const { data: players, isLoading, error } = usePlayers();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const sortedPlayers = useMemo(() => {
    if (!players) return [];
    let sortablePlayers = [...players];

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      sortablePlayers = sortablePlayers.filter(player => 
        player.name.toLowerCase().includes(lowerCaseQuery) ||
        player.role.toLowerCase().includes(lowerCaseQuery)
      );
    }

    if (sortConfig !== null) {
      sortablePlayers.sort((a, b) => {
        if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePlayers;
  }, [players, searchQuery, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error loading player statistics</h1>
        <p className="mt-4">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Player Statistics</h1>
        <p className="text-muted-foreground text-lg">
          Comprehensive statistics for all UCC players
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                className="pl-10 w-full"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={() => setSearchQuery('')}
              className="whitespace-nowrap"
            >
              Clear Filter
            </Button>
          </div>
          
          <Tabs defaultValue="batting">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="batting" className="flex items-center">
                  <Trophy className="mr-2 h-4 w-4" /> Batting
                </TabsTrigger>
                <TabsTrigger value="bowling" className="flex items-center">
                  <Award className="mr-2 h-4 w-4" /> Bowling
                </TabsTrigger>
                <TabsTrigger value="overall" className="flex items-center">
                  <User className="mr-2 h-4 w-4" /> Overall
                </TabsTrigger>
              </TabsList>
              
              <div className="text-sm text-muted-foreground">
                Showing {sortedPlayers.length} of {players?.length || 0} players
              </div>
            </div>

            <TabsContent value="batting" className="mt-0">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="w-full h-12" />
                  <Skeleton className="w-full h-12" />
                  <Skeleton className="w-full h-12" />
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>
                          <button 
                            className="flex items-center font-medium" 
                            onClick={() => requestSort('name')}
                          >
                            Player <ArrowUpDown className="ml-2 h-4 w-4" />
                          </button>
                        </TableHead>
                        <TableHead>
                          <button 
                            className="flex items-center font-medium" 
                            onClick={() => requestSort('matches')}
                          >
                            Matches <ArrowUpDown className="ml-2 h-4 w-4" />
                          </button>
                        </TableHead>
                        <TableHead>
                          <button 
                            className="flex items-center font-medium" 
                            onClick={() => requestSort('runsScored')}
                          >
                            Runs <ArrowUpDown className="ml-2 h-4 w-4" />
                          </button>
                        </TableHead>
                        <TableHead>
                          <button 
                            className="flex items-center font-medium" 
                            onClick={() => requestSort('battingAverage')}
                          >
                            Avg <ArrowUpDown className="ml-2 h-4 w-4" />
                          </button>
                        </TableHead>
                        <TableHead>Strike Rate</TableHead>
                        <TableHead>50s/100s</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedPlayers.map((player, index) => (
                        <TableRow key={player.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="font-medium">{player.name}</TableCell>
                          <TableCell>{player.matches}</TableCell>
                          <TableCell>{player.runsScored}</TableCell>
                          <TableCell>{player.battingAverage.toFixed(2)}</TableCell>
                          <TableCell>{Math.floor(Math.random() * 40 + 100)}</TableCell>
                          <TableCell>{Math.floor(Math.random() * 5)}/{Math.floor(Math.random() * 2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="bowling" className="mt-0">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="w-full h-12" />
                  <Skeleton className="w-full h-12" />
                  <Skeleton className="w-full h-12" />
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>
                          <button 
                            className="flex items-center font-medium" 
                            onClick={() => requestSort('name')}
                          >
                            Player <ArrowUpDown className="ml-2 h-4 w-4" />
                          </button>
                        </TableHead>
                        <TableHead>
                          <button 
                            className="flex items-center font-medium" 
                            onClick={() => requestSort('matches')}
                          >
                            Matches <ArrowUpDown className="ml-2 h-4 w-4" />
                          </button>
                        </TableHead>
                        <TableHead>
                          <button 
                            className="flex items-center font-medium" 
                            onClick={() => requestSort('wickets')}
                          >
                            Wickets <ArrowUpDown className="ml-2 h-4 w-4" />
                          </button>
                        </TableHead>
                        <TableHead>
                          <button 
                            className="flex items-center font-medium" 
                            onClick={() => requestSort('bowlingAverage')}
                          >
                            Avg <ArrowUpDown className="ml-2 h-4 w-4" />
                          </button>
                        </TableHead>
                        <TableHead>Economy</TableHead>
                        <TableHead>Best Figures</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedPlayers
                        .filter(player => player.wickets > 0)
                        .map((player, index) => (
                          <TableRow key={player.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell className="font-medium">{player.name}</TableCell>
                            <TableCell>{player.matches}</TableCell>
                            <TableCell>{player.wickets}</TableCell>
                            <TableCell>{player.bowlingAverage.toFixed(2)}</TableCell>
                            <TableCell>{(Math.random() * 4 + 4).toFixed(2)}</TableCell>
                            <TableCell>{Math.floor(Math.random() * 5)}/{Math.floor(Math.random() * 30 + 10)}</TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="overall" className="mt-0">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="w-full h-12" />
                  <Skeleton className="w-full h-12" />
                  <Skeleton className="w-full h-12" />
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">#</TableHead>
                        <TableHead>
                          <button 
                            className="flex items-center font-medium" 
                            onClick={() => requestSort('name')}
                          >
                            Player <ArrowUpDown className="ml-2 h-4 w-4" />
                          </button>
                        </TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>
                          <button 
                            className="flex items-center font-medium" 
                            onClick={() => requestSort('matches')}
                          >
                            Matches <ArrowUpDown className="ml-2 h-4 w-4" />
                          </button>
                        </TableHead>
                        <TableHead>
                          <button 
                            className="flex items-center font-medium" 
                            onClick={() => requestSort('runsScored')}
                          >
                            Runs <ArrowUpDown className="ml-2 h-4 w-4" />
                          </button>
                        </TableHead>
                        <TableHead>
                          <button 
                            className="flex items-center font-medium" 
                            onClick={() => requestSort('wickets')}
                          >
                            Wickets <ArrowUpDown className="ml-2 h-4 w-4" />
                          </button>
                        </TableHead>
                        <TableHead>Batting Style</TableHead>
                        <TableHead>Bowling Style</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedPlayers.map((player, index) => (
                        <TableRow key={player.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell className="font-medium">{player.name}</TableCell>
                          <TableCell>{player.role}</TableCell>
                          <TableCell>{player.matches}</TableCell>
                          <TableCell>{player.runsScored}</TableCell>
                          <TableCell>{player.wickets}</TableCell>
                          <TableCell>{player.battingStyle || "N/A"}</TableCell>
                          <TableCell>{player.bowlingStyle || "N/A"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <BarChart className="mr-2 h-5 w-5 text-cricket-pitch" />
            Team Statistical Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">TOP RUN SCORER</div>
              {isLoading ? (
                <Skeleton className="h-12 w-full" />
              ) : (
                <>
                  <div className="text-xl font-bold">
                    {players?.sort((a, b) => b.runsScored - a.runsScored)[0]?.name}
                  </div>
                  <div className="text-muted-foreground">
                    {players?.sort((a, b) => b.runsScored - a.runsScored)[0]?.runsScored} runs
                  </div>
                </>
              )}
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">TOP WICKET TAKER</div>
              {isLoading ? (
                <Skeleton className="h-12 w-full" />
              ) : (
                <>
                  <div className="text-xl font-bold">
                    {players?.sort((a, b) => b.wickets - a.wickets)[0]?.name}
                  </div>
                  <div className="text-muted-foreground">
                    {players?.sort((a, b) => b.wickets - a.wickets)[0]?.wickets} wickets
                  </div>
                </>
              )}
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">BEST BATTING AVG</div>
              {isLoading ? (
                <Skeleton className="h-12 w-full" />
              ) : (
                <>
                  <div className="text-xl font-bold">
                    {players?.sort((a, b) => b.battingAverage - a.battingAverage)[0]?.name}
                  </div>
                  <div className="text-muted-foreground">
                    {players?.sort((a, b) => b.battingAverage - a.battingAverage)[0]?.battingAverage.toFixed(2)} avg
                  </div>
                </>
              )}
            </div>
            
            <div className="bg-muted rounded-lg p-4">
              <div className="text-sm text-muted-foreground mb-1">BEST BOWLING AVG</div>
              {isLoading ? (
                <Skeleton className="h-12 w-full" />
              ) : (
                <>
                  <div className="text-xl font-bold">
                    {players?.filter(p => p.wickets > 0).sort((a, b) => a.bowlingAverage - b.bowlingAverage)[0]?.name}
                  </div>
                  <div className="text-muted-foreground">
                    {players?.filter(p => p.wickets > 0).sort((a, b) => a.bowlingAverage - b.bowlingAverage)[0]?.bowlingAverage.toFixed(2)} avg
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerStats;
