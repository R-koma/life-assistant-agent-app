# syntax=docker/dockerfile:1

FROM node:20-slim AS base

FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

FROM base AS dev
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --gid 1001 --home /home/nextjs nextjs && \
    mkdir -p /app/.next /app/node_modules && \
    chown -R nextjs:nodejs /app /home/nextjs

COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

COPY --chown=nextjs:nodejs . .

USER nextjs

EXPOSE 3000

ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

CMD ["npm", "run", "dev"]
