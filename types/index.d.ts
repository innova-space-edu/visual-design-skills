export type RenderStrategy = "deterministic" | "hybrid" | "generative";
export interface RouteResult {
  primary_intent: string;
  primary_skill: string;
  selected_skills: string[];
  candidates: Array<{skill:string; score:number; matches:string[]}>;
  confidence: number;
  needs_semantic_router: boolean;
  inferred_strategy: RenderStrategy;
  signals: Record<string, boolean>;
}
export interface VisualBrief {
  purpose: string;
  visual_type: string;
  render_strategy: RenderStrategy;
  selected_skills: string[];
  composition: Record<string, unknown>;
  output: { format:string; editable?:boolean; [key:string]:unknown };
  [key:string]: unknown;
}
export interface VisualPlan {
  suite_version: string;
  prompt: string;
  routing: RouteResult;
  visual_brief: VisualBrief;
  validation: {valid:boolean; errors:string[]; warnings:string[]};
  backend: Record<string, unknown> | null;
  requests: Array<Record<string, unknown>>;
  cost: {planning_external_calls:number; generation_external_calls:number; local_first:boolean};
}
export interface VisualDesign {
  version: string;
  route(input:string | {prompt:string}, options?:Record<string,unknown>): RouteResult;
  plan(input:string | {prompt:string}, options?:Record<string,unknown>): VisualPlan;
  planAsync(input:string | {prompt:string}, options?:Record<string,unknown>): Promise<VisualPlan>;
  createBrief(input:string | {prompt:string}, routing:RouteResult, options?:Record<string,unknown>): VisualBrief;
  validateBrief(brief:VisualBrief): {valid:boolean; errors:string[]; warnings:string[]};
  selectBackend(brief:VisualBrief, policy?:Record<string,unknown>): Record<string,unknown>;
  compile(brief:VisualBrief, backend:string): Record<string,unknown>;
  cacheKey(value:unknown, prefix?:string): string;
}
export declare function createVisualDesign(config?:Record<string,unknown>): VisualDesign;
export declare const visual: VisualDesign;

export interface SkillGuidance {
  skill: string;
  description: string;
  rules: string[];
  qa: string[];
}
export declare const SKILL_GUIDANCE: Readonly<Record<string, {
  category?: string;
  strategy?: string;
  description?: string;
  triggers?: string[];
  rules?: string[];
  qa?: string[];
}>>;
export declare function getSkillGuidance(
  skillNames?: string[],
  options?: {
    maxSkills?: number;
    maxRulesPerSkill?: number;
    maxQaPerSkill?: number;
    mode?: "generative" | "deterministic";
  }
): SkillGuidance[];
export declare function compactSkillGuidance(
  skillNames?: string[],
  options?: {
    maxSkills?: number;
    maxRulesPerSkill?: number;
    maxQaPerSkill?: number;
    mode?: "generative" | "deterministic";
  }
): string;
