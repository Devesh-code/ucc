
import { useState } from "react";
import { useMatches } from "@/utils/cricketService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, Clock, CheckCircle2, XCircle } from "lucide-react";

const Schedule = () => {
  const { data: matches, isLoading, error } = useMatches();
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const upcomingMatches = matches?.filter(match => !match.isCompleted) || [];
  const pastMatches = matches?.filter(match => match.isCompleted) || [];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error loading match data</h1>
        <p className="mt-4">Please try again later</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Match Schedule</h1>
        <p className="text-muted-foreground text-lg">
          View upcoming and past matches for UCC Cricket Team
        </p>
      </div>
      
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8 cricket-gradient">
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:text-cricket-pitch">
            Upcoming Matches
          </TabsTrigger>
          <TabsTrigger value="past" className="data-[state=active]:bg-white data-[state=active]:text-cricket-pitch">
            Past Results
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-[180px] w-full rounded-lg" />
              ))}
            </div>
          ) : upcomingMatches.length > 0 ? (
            <div className="space-y-6">
              {upcomingMatches.map((match) => (
                <Card key={match.id} className="overflow-hidden border-l-4 border-l-cricket-pitch">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">UCC vs {match.opponent}</h3>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar size={16} className="mr-2" />
                            <span>{new Date(match.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock size={16} className="mr-2" />
                            <span>{match.time}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin size={16} className="mr-2" />
                            <span>{match.venue}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center md:items-end">
                        <div className="cricket-gradient text-white font-bold py-3 px-6 rounded-full mb-3 text-center">
                          {Math.ceil((new Date(match.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days to go
                        </div>
                        <Button variant="outline" size="sm">
                          Add to Calendar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No upcoming matches scheduled</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {isLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-[200px] w-full rounded-lg" />
              ))}
            </div>
          ) : pastMatches.length > 0 ? (
            <div className="space-y-6">
              {pastMatches.map((match) => (
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
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">UCC vs {match.opponent}</h3>
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar size={16} className="mr-2" />
                            <span>{new Date(match.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin size={16} className="mr-2" />
                            <span>{match.venue}</span>
                          </div>
                        </div>
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
                      </div>
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
                          {match.result === "Won" ? <CheckCircle2 size={18} className="mr-2" /> : <XCircle size={18} className="mr-2" />}
                          {match.result}
                        </div>
                        <Button variant="outline" size="sm">
                          Match Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No past matches found</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Schedule;
