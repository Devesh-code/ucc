
import { useParams } from "react-router-dom";
import { usePlayer } from "@/utils/cricketService";
import { PlayerOverview } from "@/components/player/PlayerOverview";
import { CareerHighlights } from "@/components/player/CareerHighlights";
import { PerformanceStats } from "@/components/player/PerformanceStats";
import { RecentPerformances } from "@/components/player/RecentPerformances";
import { PlayerDetailLoading } from "@/components/player/LoadingState";
import { PlayerDetailError } from "@/components/player/ErrorState";

const PlayerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: player, isLoading, error } = usePlayer(id || "");

  if (error) {
    return <PlayerDetailError />;
  }

  if (isLoading) {
    return <PlayerDetailLoading />;
  }

  if (!player) {
    return <PlayerDetailError message="Player not found" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <PlayerOverview player={player} />
          <CareerHighlights player={player} />
        </div>
        
        <div className="lg:col-span-2">
          <PerformanceStats player={player} />
          <RecentPerformances player={player} />
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
