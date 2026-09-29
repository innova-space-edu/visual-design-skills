export declare function createOpenAIImageExecutor(options:{
  apiKey:string; fetchImpl?:typeof fetch; model?:string; quality?:string; size?:string; outputFormat?:"png"|"jpeg"|"webp"; baseUrl?:string;
}): (args:any)=>Promise<any>;
export declare function createBFLImageExecutor(options:{
  apiKey:string; fetchImpl?:typeof fetch; model?:string; baseUrl?:string; pollIntervalMs?:number; maxWaitMs?:number;
}): (args:any)=>Promise<any>;
export declare function createSvgExecutor(): (args:any)=>Promise<any>;
export declare function renderSvgPreview(brief:any): any;
export declare function providerStatus(env?:Record<string,string|undefined>): Record<string,boolean>;
