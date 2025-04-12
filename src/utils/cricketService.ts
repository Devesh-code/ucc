
import { useQuery } from "@tanstack/react-query";

export interface Player {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  battingStyle?: string;
  bowlingStyle?: string;
  matches: number;
  runsScored: number;
  battingAverage: number;
  wickets: number;
  bowlingAverage: number;
  bio: string;
}

export interface Match {
  id: string;
  date: string;
  opponent: string;
  venue: string;
  time: string;
  result?: string;
  isCompleted: boolean;
  uccScore?: string;
  opponentScore?: string;
}

export interface TeamStanding {
  position: number;
  teamName: string;
  matches: number;
  won: number;
  lost: number;
  tied: number;
  points: number;
  netRunRate: number;
}

// Temporary mock data - would be replaced with actual API calls
const mockPlayers: Player[] = [
  {
    id: "1",
    name: "Kunal Kirtikar",
    role: "All-rounder",
    imageUrl: "/placeholder.svg",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm spinner",
    matches: 15,
    runsScored: 420,
    battingAverage: 35.0,
    wickets: 18,
    bowlingAverage: 22.5,
    bio: "Kunal is a versatile all-rounder who can contribute with both bat and ball. He joined UCC in 2008 and has been a consistent performer."
  },
  {
    id: "2",
    name: "Brian Viegas",
    role: "Batsman",
    imageUrl: "/placeholder.svg",
    battingStyle: "Right-handed",
    matches: 20,
    runsScored: 780,
    battingAverage: 42.5,
    wickets: 0,
    bowlingAverage: 0,
    bio: "Brian is our captain and a reliable top-order batsman. His batting technique makes him a valuable player."
  },
  {
    id: "3",
    name: "Santosh Pandey",
    role: "Bowler",
    imageUrl: "/placeholder.svg",
    bowlingStyle: "Right-arm fast",
    matches: 18,
    runsScored: 120,
    battingAverage: 12.0,
    wickets: 35,
    bowlingAverage: 18.2,
    bio: "Santosh is our strike bowler who consistently takes wickets with his pace and accuracy. He's known for his lethal yorkers in death overs."
  },
  {
    id: "4",
    name: "Juffin Francis",
    role: "All-rounder",
    imageUrl: "/placeholder.svg",
    battingStyle: "Right-handed",
    bowlingStyle: "Left-arm fast-bowling",
    matches: 22,
    runsScored: 540,
    battingAverage: 30.0,
    wickets: 28,
    bowlingAverage: 24.1,
    bio: "Juffin contributes in all departments of the game. His off-spin bowling and middle-order batting have won many matches for UCC."
  },
  {
    id: "5",
    name: "Pritish Devrukar",
    role: "Batsmena",
    imageUrl: "/placeholder.svg",
    battingStyle: "Right-handed",
    matches: 19,
    runsScored: 350,
    battingAverage: 25.0,
    wickets: 0,
    bowlingAverage: 0,
    bio: "Pritish is our primary traditional batsmen and likes to play long innings"
  },
  {
    id: "6",
    name: "Kailash Natarajan",
    role: "Batsmen",
    imageUrl: "/placeholder.svg",
    bowlingStyle: "Righy-arm Batsmen",
    matches: 16,
    runsScored: 85,
    battingAverage: 8.5,
    wickets: 30,
    bowlingAverage: 19.8,
    bio: "Ahmed is our specialist Batsmen who likes to score big runs with high stike rate."
  }
];

const mockMatches: Match[] = [
  {
    id: "1",
    date: "2025-05-31",
    opponent: "TBD",
    venue: "Quincy",
    time: "8:00 AM",
    isCompleted: false
  },
  {
    id: "2",
    date: "2025-06-07",
    opponent: "TBD",
    venue: "Quincy",
    time: "8:00 AM",
    isCompleted: false
  },
  {
    id: "3",
    date: "2025-06-15",
    opponent: "TBD",
    venue: "Quincy",
    time: "8:00 AM",
  },
  {
    id: "4",
    date: "2025-06-22",
    opponent: "TBD",
    venue: "Quincy",
    time: "8:00 AM",
  },
  {
    id: "5",
    date: "2025-06-29",
    opponent: "TBD",
    venue: "Quincy",
    time: "8:00 AM",
    result: "Won",
    isCompleted: true,
    uccScore: "",
    opponentScore: ""
  }
];

const mockStandings: TeamStanding[] = [
  {
    position: 1,
    teamName: "UCC",
    matches: 5,
    won: 4,
    lost: 1,
    tied: 0,
    points: 8,
    netRunRate: 1.25
  },
  {
    position: 2,
    teamName: "TBD",
    matches: 5,
    won: 3,
    lost: 2,
    tied: 0,
    points: 6,
    netRunRate: 0.85
  },
  {
    position: 3,
    teamName: "TBD",
    matches: 5,
    won: 3,
    lost: 2,
    tied: 0,
    points: 6,
    netRunRate: 0.45
  },
  {
    position: 4,
    teamName: "TBD",
    matches: 5,
    won: 2,
    lost: 3,
    tied: 0,
    points: 4,
    netRunRate: -0.15
  },
  {
    position: 5,
    teamName: "TBD",
    matches: 5,
    won: 2,
    lost: 3,
    tied: 0,
    points: 4,
    netRunRate: -0.35
  },
  {
    position: 6,
    teamName: "TBD",
    matches: 5,
    won: 1,
    lost: 4,
    tied: 0,
    points: 2,
    netRunRate: -1.55
  }
];

// This would be replaced with actual API fetching from NECA website
export const usePlayers = () => {
  return useQuery({
    queryKey: ['players'],
    queryFn: async () => {
      // In a real implementation, this would fetch data from the NECA website
      console.log("Fetching players data...");
      // Simulate API call
      return new Promise<Player[]>((resolve) => {
        setTimeout(() => resolve(mockPlayers), 800);
      });
    }
  });
};

export const usePlayer = (id: string) => {
  return useQuery({
    queryKey: ['player', id],
    queryFn: async () => {
      // In a real implementation, this would fetch specific player data
      console.log(`Fetching player data for ID: ${id}`);
      // Simulate API call
      return new Promise<Player | undefined>((resolve) => {
        setTimeout(() => {
          const player = mockPlayers.find(p => p.id === id);
          resolve(player);
        }, 500);
      });
    }
  });
};

export const useMatches = () => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: async () => {
      // In a real implementation, this would fetch match data
      console.log("Fetching matches data...");
      // Simulate API call
      return new Promise<Match[]>((resolve) => {
        setTimeout(() => resolve(mockMatches), 800);
      });
    }
  });
};

export const useStandings = () => {
  return useQuery({
    queryKey: ['standings'],
    queryFn: async () => {
      // In a real implementation, this would fetch standings data
      console.log("Fetching standings data...");
      // Simulate API call
      return new Promise<TeamStanding[]>((resolve) => {
        setTimeout(() => resolve(mockStandings), 800);
      });
    }
  });
};
