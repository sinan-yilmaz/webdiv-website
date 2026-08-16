import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  allowedDevOrigins: ['192.168.178.*'],
  /* Sonst raet Turbopack den Workspace-Root anhand einer fremden Lockfile im
     Home-Verzeichnis und warnt bei jedem Build. */
  turbopack: { root: path.join(__dirname) },
  /* Kein Auto-Generieren von AGENTS.md/CLAUDE.md durch next dev –
     .claude/CLAUDE.md ist die kuratierte Projektquelle. */
  agentRules: false
};

export default nextConfig;
