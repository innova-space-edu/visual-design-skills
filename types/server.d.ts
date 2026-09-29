import type { VisualPlan } from "./index";
export interface VisualExecutor {
  execute(args:{request:Record<string,unknown>; plan:VisualPlan; context:unknown; signal:AbortSignal}): Promise<unknown>;
}
export declare function createVisualGateway(options?:{
  executors?:Record<string, VisualExecutor | VisualExecutor["execute"]>;
  authorize?:(args:unknown)=>boolean | Response | Promise<boolean | Response>;
  rateLimit?:(args:unknown)=>boolean | Response | Promise<boolean | Response>;
  cache?:{get(key:string):unknown | Promise<unknown>; set(key:string,value:unknown):unknown | Promise<unknown>};
  cors?:boolean | "*" | string[];
  maxBodyChars?:number;
  visualConfig?:Record<string,unknown>;
}): { handleRequest(request:Request, context?:unknown):Promise<Response> };
