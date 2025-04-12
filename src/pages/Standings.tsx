
import { useStandings } from "@/utils/cricketService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

const Standings = () => {
  const { data: standings, isLoading, error } = useStandings();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error loading standings data</h1>
        <p className="mt-4">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">League Standings</h1>
        <p className="text-muted-foreground text-lg">
          Current standings of teams in the New England Cricket Association
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader className="cricket-gradient text-white">
          <CardTitle className="flex items-center">
            <Trophy className="mr-2" />
            NECA 2025 Season Standings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6">
              <Skeleton className="h-[400px] w-full" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-12 text-center">Pos</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="flex items-center justify-center w-full">
                            P <Info size={14} className="ml-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Matches Played</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                    <TableHead className="text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="flex items-center justify-center w-full">
                            W <Info size={14} className="ml-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Matches Won</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                    <TableHead className="text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="flex items-center justify-center w-full">
                            L <Info size={14} className="ml-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Matches Lost</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                    <TableHead className="text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="flex items-center justify-center w-full">
                            T <Info size={14} className="ml-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Matches Tied</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                    <TableHead className="text-center font-bold">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="flex items-center justify-center w-full">
                            Pts <Info size={14} className="ml-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Total Points</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                    <TableHead className="text-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="flex items-center justify-center w-full">
                            NRR <Info size={14} className="ml-1" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Net Run Rate</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {standings?.map((team) => (
                    <TableRow 
                      key={team.position} 
                      className={team.teamName === "UCC" ? "bg-cricket-pitch/10 font-medium" : ""}
                    >
                      <TableCell className="text-center font-bold">{team.position}</TableCell>
                      <TableCell>
                        {team.teamName === "UCC" ? (
                          <span className="font-bold">{team.teamName}</span>
                        ) : (
                          team.teamName
                        )}
                      </TableCell>
                      <TableCell className="text-center">{team.matches}</TableCell>
                      <TableCell className="text-center">{team.won}</TableCell>
                      <TableCell className="text-center">{team.lost}</TableCell>
                      <TableCell className="text-center">{team.tied}</TableCell>
                      <TableCell className="text-center font-bold">{team.points}</TableCell>
                      <TableCell className="text-center">{team.netRunRate.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">League Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The New England Cricket Association (NECA) 2025 season features six teams competing in a round-robin format.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Points System</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Win: 2 points</li>
              <li>Tie: 1 point</li>
              <li>Loss: 0 points</li>
              <li>No Result: 1 point each</li>
            </ul>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Qualification for Playoffs</h3>
            <p>Top 4 teams qualify for the semi-finals based on points and net run rate.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Standings;
