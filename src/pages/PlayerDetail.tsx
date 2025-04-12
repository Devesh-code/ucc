
import { useParams, Link } from "react-router-dom";
import { usePlayer } from "@/utils/cricketService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Trophy, TrendingUp, Target, Award } from "lucide-react";  // Replaced Cricket with Award

const PlayerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: player, isLoading, error } = usePlayer(id || "");

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error loading player data</h1>
        <p className="mt-4">Please try again later</p>
        <Button asChild variant="link" className="mt-4">
          <Link to="/players">Back to Players</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/players" className="flex items-center">
            <ChevronLeft size={16} className="mr-1" />
            Back to Players
          </Link>
        </Button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <Skeleton className="w-full h-80 rounded-lg mb-4" />
            <Skeleton className="w-3/4 h-8 mb-2" />
            <Skeleton className="w-1/2 h-6 mb-4" />
            <Skeleton className="w-full h-40" />
          </div>
          <div className="lg:col-span-2">
            <Skeleton className="w-full h-60 rounded-lg mb-6" />
            <Skeleton className="w-full h-40 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Player not found</h1>
        <Button asChild variant="link" className="mt-4">
          <Link to="/players">Back to Players</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-8">
        <Link to="/players" className="flex items-center">
          <ChevronLeft size={16} className="mr-1" />
          Back to Players
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <Card className="mb-6 overflow-hidden">
            <div className="relative aspect-square overflow-hidden bg-muted flex justify-center items-center">
              <div className="absolute inset-0 cricket-gradient opacity-20"></div>
              <Trophy size={80} className="text-cricket-pitch opacity-20" /> {/* Replaced Cricket with Trophy */}
              <img
                src={player.imageUrl}
                alt={player.name}
                className="w-full h-full object-cover absolute inset-0 z-10 opacity-90"
              />
              <Badge className="absolute top-4 right-4 z-20 bg-cricket-pitch">
                {player.role}
              </Badge>
            </div>
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-1">{player.name}</h1>
              <div className="text-muted-foreground mb-4">
                {player.battingStyle && <div>{player.battingStyle} Batsman</div>}
                {player.bowlingStyle && <div>{player.bowlingStyle} Bowler</div>}
              </div>
              <Separator className="my-4" />
              <p className="text-sm leading-relaxed">{player.bio}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Trophy size={18} className="mr-2 text-cricket-gold" />
                Career Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-cricket-pitch mr-2">•</span>
                  <span>Played {player.matches} matches for UCC</span>
                </li>
                {player.runsScored > 0 && (
                  <li className="flex items-start">
                    <span className="text-cricket-pitch mr-2">•</span>
                    <span>Scored {player.runsScored} runs in career</span>
                  </li>
                )}
                {player.wickets > 0 && (
                  <li className="flex items-start">
                    <span className="text-cricket-pitch mr-2">•</span>
                    <span>Taken {player.wickets} wickets</span>
                  </li>
                )}
                <li className="flex items-start">
                  <span className="text-cricket-pitch mr-2">•</span>
                  <span>Member since 2022</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp size={20} className="mr-2 text-cricket-pitch" />
                Performance Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                  <span className="text-sm text-muted-foreground mb-1">MATCHES</span>
                  <span className="text-3xl font-bold">{player.matches}</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                  <span className="text-sm text-muted-foreground mb-1">RUNS</span>
                  <span className="text-3xl font-bold">{player.runsScored}</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                  <span className="text-sm text-muted-foreground mb-1">BATTING AVG</span>
                  <span className="text-3xl font-bold">{player.battingAverage.toFixed(2)}</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                  <span className="text-sm text-muted-foreground mb-1">WICKETS</span>
                  <span className="text-3xl font-bold">{player.wickets}</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Target size={18} className="mr-2 text-cricket-pitch" />
                    Batting Records
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Highest Score:</span>
                      <span className="font-semibold">78 (vs Boston CC)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Strike Rate:</span>
                      <span className="font-semibold">125.6</span>
                    </div>
                    <div className="flex justify-between">
                      <span>50s:</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span>100s:</span>
                      <span className="font-semibold">0</span>
                    </div>
                  </div>
                </div>
                {player.wickets > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <Award size={18} className="mr-2 text-cricket-pitch" /> {/* Replaced Cricket with Award */}
                      Bowling Records
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Best Figures:</span>
                        <span className="font-semibold">3/24 (vs Lowell Lions)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Economy Rate:</span>
                        <span className="font-semibold">5.8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bowling Average:</span>
                        <span className="font-semibold">{player.bowlingAverage.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>5 Wicket Hauls:</span>
                        <span className="font-semibold">0</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Performances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">vs {["Boston CC", "Cambridge XI", "Waltham Warriors"][index]}</h4>
                        <p className="text-xs text-muted-foreground">
                          {["April 2, 2025", "March 25, 2025", "March 18, 2025"][index]}
                        </p>
                      </div>
                      <Badge variant={index === 0 ? "default" : "outline"} className={index === 0 ? "bg-green-500" : ""}>
                        {index === 0 ? "Latest" : "Recent"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Batting: </span>
                        <span className="font-medium">
                          {[
                            `${Math.floor(Math.random() * 50)} (${Math.floor(Math.random() * 30)} balls)`, 
                            `${Math.floor(Math.random() * 40)} (${Math.floor(Math.random() * 25)} balls)`,
                            `${Math.floor(Math.random() * 30)} (${Math.floor(Math.random() * 20)} balls)`
                          ][index]}
                        </span>
                      </div>
                      {player.wickets > 0 && (
                        <div>
                          <span className="text-muted-foreground">Bowling: </span>
                          <span className="font-medium">
                            {[
                              `${Math.floor(Math.random() * 3)}/${Math.floor(Math.random() * 20)}`, 
                              `${Math.floor(Math.random() * 2)}/${Math.floor(Math.random() * 25)}`,
                              `${Math.floor(Math.random() * 2)}/${Math.floor(Math.random() * 30)}`
                            ][index]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
