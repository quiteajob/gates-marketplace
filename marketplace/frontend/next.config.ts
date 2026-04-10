import type { NextConfig } from "next";

/** Обычная серверная сборка (`next build` + `next start`). Статический `output: "export"` несовместим с `dynamic = "force-dynamic"` на /catalog. */
const nextConfig: NextConfig = {};

export default nextConfig;
