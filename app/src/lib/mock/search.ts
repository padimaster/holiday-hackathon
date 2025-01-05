import { SearchResult } from "@/types/search";

export const mockSearchData: SearchResult[] = [
  // User results
  {
    id: "1",
    type: "user",
    title: "Alex Padilla",
    handle: "padimaster",
    avatar: "/avatars/alex.jpg",
    techScore: 85,
    description: "Software Engineer | ETH Ecuador",
    createdAt: "2023-02-15",
    tags: ["blockchain", "ethereum", "community"],
  },
  {
    id: "2",
    type: "user",
    title: "Bob",
    handle: "bob-ito",
    avatar: "/avatars/bob.jpg",
    techScore: 25,
    description: "Product Designer",
    createdAt: "2011-09-01",
    tags: ["design", "web3", "product"],
  },

  // Tech Pills
  {
    id: "3",
    type: "pill",
    title: "Understanding EIP-4337: Account Abstraction",
    description:
      "A deep dive into Ethereum Account Abstraction and its implications",
    createdAt: "2024-01-15",
    author: {
      handle: "padimaster",
      name: "Alex Padilla",
      avatar: "/avatars/alex.jpg",
    },
    tags: ["ethereum", "blockchain", "development"],
  },
  {
    id: "4",
    type: "pill",
    title: "React Server Components Explained",
    description: "Learn how RSC works and when to use them",
    createdAt: "2024-01-10",
    author: {
      handle: "elena-tech",
      name: "Elena Rodriguez",
      avatar: "/avatars/elena.jpg",
    },
    tags: ["react", "frontend", "performance"],
  },

  // Learning Paths
  {
    id: "5",
    type: "path",
    title: "Web3 Development Path",
    description: "Complete guide to becoming a Web3 developer",
    createdAt: "2024-01-01",
    author: {
      handle: "satya",
      name: "Satya Dev",
      avatar: "/avatars/satya.jpg",
    },
    tags: ["web3", "blockchain", "smart-contracts"],
  },

  // Feeds
  {
    id: "6",
    type: "feed",
    title: "Latest in Ethereum Development",
    description: "Curated content about Ethereum development",
    createdAt: "2024-01-05",
    tags: ["ethereum", "development", "updates"],
  },

  // Articles
  {
    id: "7",
    type: "article",
    title: "Building Secure Smart Contracts",
    description: "Best practices for smart contract security",
    createdAt: "2024-01-12",
    author: {
      handle: "crypto-sarah",
      name: "Sarah Chen",
      avatar: "/avatars/sarah.jpg",
    },
    tags: ["security", "smart-contracts", "blockchain"],
  },
];
