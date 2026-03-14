export const protectedPrefixes = [
  "/dashboard",
  "/products",
  "/inventory",
  "/orders",
  "/purchase-orders",
  "/suppliers",
  "/warehouses",
  "/returns",
  "/reports",
  "/settings"
] as const;

export const authPaths = ["/login", "/signup", "/forgot-password"] as const;

export function isProtectedPath(pathname: string) {
  return protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function isAuthPath(pathname: string) {
  return authPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}