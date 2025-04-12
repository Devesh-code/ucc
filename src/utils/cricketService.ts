
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
    name: "Michael Johnson",
    role: "Batsman",
    imageUrl: "/placeholder.svg",
    battingStyle: "Left-handed",
    matches: 20,
    runsScored: 780,
    battingAverage: 42.5,
    wickets: 0,
    bowlingAverage: 0,
    bio: "Michael is our leading run-scorer and a reliable top-order batsman. His technique against both pace and spin makes him a valuable player."
  },
  {
    id: "3",
    name: "David Wilson",
    role: "Bowler",
    imageUrl: "/placeholder.svg",
    bowlingStyle: "Right-arm fast",
    matches: 18,
    runsScored: 120,
    battingAverage: 12.0,
    wickets: 35,
    bowlingAverage: 18.2,
    bio: "David is our strike bowler who consistently takes wickets with his pace and accuracy. He's known for his lethal yorkers in death overs."
  },
  {
    id: "4",
    name: "Rahul Patel",
    role: "All-rounder",
    imageUrl: "/placeholder.svg",
    battingStyle: "Right-handed",
    bowlingStyle: "Right-arm off-spin",
    matches: 22,
    runsScored: 540,
    battingAverage: 30.0,
    wickets: 28,
    bowlingAverage: 24.1,
    bio: "Rahul contributes in all departments of the game. His off-spin bowling and middle-order batting have won many matches for UCC."
  },
  {
    id: "5",
    name: "James Anderson",
    role: "Wicket-keeper",
    imageUrl: "/placeholder.svg",
    battingStyle: "Right-handed",
    matches: 19,
    runsScored: 350,
    battingAverage: 25.0,
    wickets: 0,
    bowlingAverage: 0,
    bio: "James is our primary wicket-keeper with quick reflexes behind the stumps. He's also a capable middle-order batsman who can accelerate when needed."
  },
  {
    id: "6",
    name: "Ahmed Hassan",
    role: "Bowler",
    imageUrl: "/placeholder.svg",
    bowlingStyle: "Left-arm orthodox spin",
    matches: 16,
    runsScored: 85,
    battingAverage: 8.5,
    wickets: 30,
    bowlingAverage: 19.8,
    bio: "Ahmed is our specialist spin bowler who can take wickets consistently in the middle overs. His control and variations make him difficult to score against."
  }
];

const mockMatches: Match[] = [
  {
    id: "1",
    date: "2025-04-18",
    opponent: "Boston CC",
    venue: "UCC Home Ground",
    time: "10:00 AM",
    isCompleted: false
  },
  {
    id: "2",
    date: "2025-04-25",
    opponent: "Cambridge XI",
    venue: "Cambridge Oval",
    time: "2:00 PM",
    isCompleted: false
  },
  {
    id: "3",
    date: "2025-03-30",
    opponent: "Waltham Warriors",
    venue: "UCC Home Ground",
    time: "10:00 AM",
    result: "Won",
    isCompleted: true,
    uccScore: "180/5",
    opponentScore: "160/8"
  },
  {
    id: "4",
    date: "2025-03-23",
    opponent: "Lowell Lions",
    venue: "Lowell Cricket Ground",
    time: "1:00 PM",
    result: "Lost",
    isCompleted: true,
    uccScore: "145/9",
    opponentScore: "146/3"
  },
  {
    id: "5",
    date: "2025-03-16",
    opponent: "Acton Aces",
    venue: "UCC Home Ground",
    time: "11:00 AM",
    result: "Won",
    isCompleted: true,
    uccScore: "220/6",
    opponentScore: "180/10"
  }
];

const mockStandings: TeamStanding[] = [
  {
    position: 1,
    teamName: "Cambridge XI",
    matches: 5,
    won: 4,
    lost: 1,
    tied: 0,
    points: 8,
    netRunRate: 1.25
  },
  {
    position: 2,
    teamName: "UCC",
    matches: 5,
    won: 3,
    lost: 2,
    tied: 0,
    points: 6,
    netRunRate: 0.85
  },
  {
    position: 3,
    teamName: "Boston CC",
    matches: 5,
    won: 3,
    lost: 2,
    tied: 0,
    points: 6,
    netRunRate: 0.45
  },
  {
    position: 4,
    teamName: "Waltham Warriors",
    matches: 5,
    won: 2,
    lost: 3,
    tied: 0,
    points: 4,
    netRunRate: -0.15
  },
  {
    position: 5,
    teamName: "Lowell Lions",
    matches: 5,
    won: 2,
    lost: 3,
    tied: 0,
    points: 4,
    netRunRate: -0.35
  },
  {
    position: 6,
    teamName: "Acton Aces",
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
