
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Target, Award } from "lucide-react";
import { Player } from "@/utils/cricketService";

interface PerformanceStatsProps {
  player: Player;
}

export const PerformanceStats = ({ player }: PerformanceStatsProps) => {
  return (
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
                <Award size={18} className="mr-2 text-cricket-pitch" />
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
  );
};
