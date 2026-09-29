import { createVisualGateway } from "../packages/server/index.js";
import {
  createOpenAIImageExecutor,
  createBFLImageExecutor,
  createSvgExecutor,
  providerStatus
} from "../packages/providers/index.js";

export const maxDuration = 120;

function configuredExecutors() {
  const executors = { svg:createSvgExecutor() };
  const protectedGeneration = Boolean(process.env.DEMO_ACCESS_TOKEN);
  const allowPublic = process.env.ALLOW_PUBLIC_GENERATION === "true";
  const allowGenerative = protectedGeneration || allowPublic;

  if (allowGenerative && process.env.OPENAI_API_KEY) {
    executors.openai = createOpenAIImageExecutor({
      apiKey:process.env.OPENAI_API_KEY,
      model:process.env.OPENAI_IMAGE_MODEL || "gpt-image-2.5-flare",
      quality:process.env.OPENAI_IMAGE_QUALITY || "low"
    });
  }
  if (allowGenerative && process.env.BFL_API_KEY) {
    executors.flux = createBFLImageExecutor({
      apiKey:process.env.BFL_API_KEY,
      model:process.env.BFL_IMAGE_MODEL || "flux-2-pro"
    });
  }
  return executors;
}

function authorized(request) {
  const expected=process.env.DEMO_ACCESS_TOKEN;
  if(!expected) return process.env.ALLOW_PUBLIC_GENERATION === "true";
  const auth=request.headers.get("authorization")||"";
  return auth === "Bearer "+expected;
}

function gateway() {
  return createVisualGateway({
    executors:configuredExecutors(),
    cors:true,
    maxBodyChars:400000
  });
}

export async function GET() {
  return Response.json({
    ok:true,
    service:"visual-design-skills-demo",
    version:"1.4.0",
    providers:providerStatus(process.env),
    safety:{
      generative_execution_enabled:Boolean(process.env.DEMO_ACCESS_TOKEN || process.env.ALLOW_PUBLIC_GENERATION === "true"),
      svg_execution_always_enabled:true
    }
  });
}

export async function OPTIONS(request) {
  return gateway().handleRequest(request);
}

export async function POST(request) {
  const clone=request.clone();
  let body={};
  try{body=await clone.json();}catch{}
  if(body?.action==="execute"){
    const requestedBackend=body?.backend || body?.plan?.backend?.primary || body?.plan?.backend?.image_backend;
    const generative=["openai","flux","qwen-image","ideogram","recraft","comfyui"].includes(requestedBackend);
    if(generative && !authorized(request)){
      return Response.json({
        error:"generation_locked",
        message:"Generative execution requires DEMO_ACCESS_TOKEN, or ALLOW_PUBLIC_GENERATION=true on the server."
      },{status:403});
    }
  }
  return gateway().handleRequest(request);
}
