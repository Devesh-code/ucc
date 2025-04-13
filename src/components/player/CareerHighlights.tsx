
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { Player } from "@/utils/cricketService";

interface CareerHighlightsProps {
  player: Player;
}

export const CareerHighlights = ({ player }: CareerHighlightsProps) => {
  return (
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
  );
};
