
import { Link } from "react-router-dom";
import { useMatches, useStandings } from "@/utils/cricketService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, Trophy, Users, Clock } from "lucide-react";

const Index = () => {
  const { data: matches, isLoading: matchesLoading } = useMatches();
  const { data: standings, isLoading: standingsLoading } = useStandings();
  
  const upcomingMatches = matches?.filter(match => !match.isCompleted).slice(0, 2);
  const recentMatches = matches?.filter(match => match.isCompleted).slice(0, 2);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative mb-16">
        <div className="absolute inset-0 bg-cricket-pitch/10 rounded-lg"></div>
        <div className="relative cricket-gradient rounded-lg overflow-hidden">
          <div className="container mx-auto px-6 py-16 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to UCC Cricket</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              Home of the University Cricket Club in the New England Cricket Association
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="secondary" className="bg-cricket-gold hover:bg-yellow-500 text-black">
                <Link to="/schedule">View Schedule</Link>
              </Button>
              <Button asChild variant="outline" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/20">
                <Link to="/players">Meet the Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <CalendarDays className="mr-2 text-cricket-pitch" />
            Upcoming Matches
          </h2>
          
          {matchesLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-[140px] w-full rounded-lg" />
              <Skeleton className="h-[140px] w-full rounded-lg" />
            </div>
          ) : upcomingMatches && upcomingMatches.length > 0 ? (
            <div className="space-y-4">
              {upcomingMatches.map((match) => (
                <Card key={match.id} className="overflow-hidden border-l-4 border-l-cricket-pitch">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">UCC vs {match.opponent}</h3>
                        <p className="text-muted-foreground">{match.venue}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{new Date(match.date).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">{match.time}</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button asChild variant="outline" size="sm">
                        <Link to="/schedule">Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p>No upcoming matches</p>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-4">
            <Button asChild variant="link" className="text-cricket-pitch">
              <Link to="/schedule">View full schedule</Link>
            </Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Clock className="mr-2 text-cricket-pitch" />
            Recent Results
          </h2>
          
          {matchesLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-[140px] w-full rounded-lg" />
              <Skeleton className="h-[140px] w-full rounded-lg" />
            </div>
          ) : recentMatches && recentMatches.length > 0 ? (
            <div className="space-y-4">
              {recentMatches.map((match) => (
                <Card 
                  key={match.id} 
                  className={`overflow-hidden border-l-4 ${
                    match.result === "Won" 
                      ? "border-l-green-500" 
                      : match.result === "Lost" 
                        ? "border-l-red-500" 
                        : "border-l-yellow-500"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">UCC vs {match.opponent}</h3>
                        <p className="text-muted-foreground">{match.venue}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          match.result === "Won" 
                            ? "text-green-600" 
                            : match.result === "Lost" 
                              ? "text-red-600" 
                              : "text-yellow-600"
                        }`}>
                          {match.result}
                        </p>
                        <p className="text-sm">{new Date(match.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm">
                        <span className="font-medium">UCC:</span> {match.uccScore}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">{match.opponent}:</span> {match.opponentScore}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p>No recent matches</p>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-4">
            <Button asChild variant="link" className="text-cricket-pitch">
              <Link to="/schedule">View all results</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Standings */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Trophy className="mr-2 text-cricket-pitch" />
          Team Standings
        </h2>
        
        {standingsLoading ? (
          <Skeleton className="h-[300px] w-full rounded-lg" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="cricket-gradient text-white">
                <tr>
                  <th className="p-3 text-left">Pos</th>
                  <th className="p-3 text-left">Team</th>
                  <th className="p-3 text-center">P</th>
                  <th className="p-3 text-center">W</th>
                  <th className="p-3 text-center">L</th>
                  <th className="p-3 text-center">T</th>
                  <th className="p-3 text-center">Pts</th>
                  <th className="p-3 text-center">NRR</th>
                </tr>
              </thead>
              <tbody>
                {standings?.slice(0, 4).map((team) => (
                  <tr key={team.position} className={`border-b hover:bg-muted/50 ${team.teamName === "UCC" ? "bg-cricket-pitch/10 font-medium" : ""}`}>
                    <td className="p-3">{team.position}</td>
                    <td className="p-3">{team.teamName}</td>
                    <td className="p-3 text-center">{team.matches}</td>
                    <td className="p-3 text-center">{team.won}</td>
                    <td className="p-3 text-center">{team.lost}</td>
                    <td className="p-3 text-center">{team.tied}</td>
                    <td className="p-3 text-center font-bold">{team.points}</td>
                    <td className="p-3 text-center">{team.netRunRate.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-4">
          <Button asChild variant="link" className="text-cricket-pitch">
            <Link to="/standings">View full standings</Link>
          </Button>
        </div>
      </section>

      {/* Team Highlight */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Users className="mr-2 text-cricket-pitch" />
          Meet Our Team
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="col-span-2 md:col-span-3 overflow-hidden border-none shadow-lg">
            <div className="cricket-gradient text-white p-6">
              <h3 className="text-xl font-bold mb-2">UCC Cricket Team</h3>
              <p className="mb-4">Meet our talented squad of cricketers representing UCC in the NECA league</p>
              <Button asChild variant="secondary" className="bg-cricket-gold hover:bg-yellow-500 text-black">
                <Link to="/players">View Players</Link>
              </Button>
            </div>
          </Card>
          
          <Card className="col-span-2 md:col-span-3 overflow-hidden relative h-48 border-none shadow-lg">
            <div className="absolute inset-0 bg-cricket-pitch-light/20"></div>
            <CardContent className="p-6 relative h-full flex flex-col justify-end">
              <h3 className="text-xl font-bold mb-2">Team Achievements</h3>
              <p className="text-sm text-muted-foreground mb-4">League finalists 2023, Semi-finalists 2022</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mb-8">
        <Card className="cricket-gradient text-white">
          <CardContent className="p-8 flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Join UCC Cricket Club</h2>
              <p className="max-w-xl">Looking to be part of our cricket community? UCC welcomes new players of all skill levels.</p>
            </div>
            <Button variant="secondary" className="mt-4 md:mt-0 bg-white hover:bg-gray-100 text-cricket-pitch">
              Contact Us
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
