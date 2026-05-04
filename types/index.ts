// ─── User / Auth ──────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  discord_id: string;
  username: string;
  avatar_url: string | null;
  email: string | null;
  credits: number;
  plan: "free" | "pro" | "unlimited";
  created_at: string;
}

// ─── Generation ───────────────────────────────────────────────────────────────

export type MapType =
  | "Tycoon"
  | "Parkour"
  | "Prop Hunt"
  | "Escape"
  | "Simulator"
  | "Other";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type OutputType =
  | "Code only"
  | "Code + Explanation"
  | "Full Setup Guide";

export interface GenerateVerseOptions {
  description: string;
  mapType: MapType;
  difficulty: Difficulty;
  outputType: OutputType;
}

export interface GenerateVerseResult {
  code: string;
  deviceSetup: string;
  explanation: string;
  commonErrors: string;
}

export interface Generation {
  id: string;
  user_id: string;
  description: string;
  map_type: MapType;
  difficulty: Difficulty;
  output_type: OutputType;
  verse_code: string;
  device_setup: string;
  explanation: string;
  common_errors: string;
  created_at: string;
}

// ─── Error Fixer ──────────────────────────────────────────────────────────────

export interface FixErrorOptions {
  errorMessage: string;
  code: string;
}

export interface FixErrorResult {
  problem: string;
  fixedCode: string;
  explanation: string;
  preventionTip: string;
}

// ─── Tutorial ─────────────────────────────────────────────────────────────────

export interface CodeAnnotation {
  section: string;
  code: string;
  explanation: string;
}

export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  estimatedTime: string;
  devices: string[];
  whatItDoes: string;
  verseCode: string;
  setupSteps: string[];
  commonMistakes: string[];
  tags: string[];
  codeAnnotations?: CodeAnnotation[];
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}
