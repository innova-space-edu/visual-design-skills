export function createNextRouteHandlers(gateway) {
  if (!gateway?.handleRequest) throw new Error("A visual gateway is required");
  return {
    POST(request) { return gateway.handleRequest(request); },
    OPTIONS(request) { return gateway.handleRequest(request); }
  };
}
