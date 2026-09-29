import { routeVisual } from "../packages/core/index.js";
const queries = [
  "mapa real con coordenadas",
  "selfie manteniendo el mismo rostro",
  "infografia con grafico de barras",
  "plano tecnico con medidas exactas",
  "afiche feria cientifica",
  "diagrama de flujo de compras"
];
const iterations = Number(process.argv[2] ?? 10000);
const start = performance.now();
for (let i=0;i<iterations;i++) routeVisual(queries[i % queries.length]);
const elapsed = performance.now() - start;
console.log(JSON.stringify({iterations, ms:Number(elapsed.toFixed(2)), per_route_ms:Number((elapsed/iterations).toFixed(5))}, null, 2));
