
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Player } from "@/utils/cricketService";

interface RecentPerformancesProps {
  player: Player;
}

export const RecentPerformances = ({ player }: RecentPerformancesProps) => {
  return (
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
  );
};
