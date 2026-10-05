module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/app/api/metrics/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/security.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireSameOrigin"])(request);
        const input = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricSchema"].parse(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readJsonBody"])(request, 1_024));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().prepare("INSERT INTO metric_events (id, event, target, path) VALUES (?, ?, ?, ?)").bind(crypto.randomUUID(), input.event, input.target ?? null, input.path).run();
        return new Response(null, {
            status: 204,
            headers: {
                "Cache-Control": "no-store"
            }
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiError"])(error);
    }
}
async function GET(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireAdmin"])(request);
        const { results } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().prepare(`SELECT event, target, COUNT(*) AS total
         FROM metric_events
         WHERE created_at >= datetime('now', '-30 days')
         GROUP BY event, target
         ORDER BY total DESC`).all();
        return Response.json({
            periodDays: 30,
            metrics: results
        }, {
            headers: {
                "Cache-Control": "private, no-store"
            }
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiError"])(error);
    }
}
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCloudflareEnv",
    ()=>getCloudflareEnv,
    "getDb",
    ()=>getDb
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opennextjs$2f$cloudflare$2f$dist$2f$api$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@opennextjs/cloudflare/dist/api/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opennextjs$2f$cloudflare$2f$dist$2f$api$2f$cloudflare$2d$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@opennextjs/cloudflare/dist/api/cloudflare-context.js [app-route] (ecmascript)");
;
;
function getCloudflareEnv() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$opennextjs$2f$cloudflare$2f$dist$2f$api$2f$cloudflare$2d$context$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCloudflareContext"])().env;
}
function getDb() {
    const env = getCloudflareEnv();
    if (!env.DB) throw new Error("D1 binding DB is unavailable");
    return env.DB;
}
}),
"[project]/lib/security.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HttpError",
    ()=>HttpError,
    "apiError",
    ()=>apiError,
    "metricSchema",
    ()=>metricSchema,
    "productCreateSchema",
    ()=>productCreateSchema,
    "productUpdateSchema",
    ()=>productUpdateSchema,
    "readJsonBody",
    ()=>readJsonBody,
    "rejectMismatchedOrigin",
    ()=>rejectMismatchedOrigin,
    "requireAdmin",
    ()=>requireAdmin,
    "requireSameOrigin",
    ()=>requireSameOrigin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
;
;
const imagePathPattern = /^\/assets\/trabajos\/[a-z0-9-]+\/(?:cover|full-[1-9][0-9]*)\.webp$/;
const productCreateSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    slug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(3).max(80).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(2).max(100),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(2).max(50),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(10).max(300),
    imageSrc: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().max(180).regex(imagePathPattern),
    sortOrder: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().min(0).max(10_000)
});
const productUpdateSchema = productCreateSchema.partial().refine((value)=>Object.keys(value).length > 0, "At least one field is required");
const metricSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    event: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "page_view",
        "gallery_open",
        "product_whatsapp",
        "contact_email"
    ]),
    target: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().max(80).regex(/^[a-z0-9-]*$/).optional(),
    path: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().trim().min(1).max(120).regex(/^\/[a-zA-Z0-9/_-]*$/)
});
async function readJsonBody(request, maxBytes = 4_096) {
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
        throw new HttpError(415, "Content-Type must be application/json");
    }
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (Number.isFinite(contentLength) && contentLength > maxBytes) {
        throw new HttpError(413, "Request body is too large");
    }
    const text = await request.text();
    if (new TextEncoder().encode(text).byteLength > maxBytes) {
        throw new HttpError(413, "Request body is too large");
    }
    try {
        return JSON.parse(text);
    } catch  {
        throw new HttpError(400, "Invalid JSON");
    }
}
function requireSameOrigin(request) {
    const origin = request.headers.get("origin");
    const requestUrl = new URL(request.url);
    let originUrl = null;
    try {
        originUrl = origin ? new URL(origin) : null;
    } catch  {
        originUrl = null;
    }
    const loopbackAliases = new Set([
        "localhost",
        "127.0.0.1",
        "[::1]"
    ]);
    const isLocalAlias = Boolean(originUrl && requestUrl.protocol === "http:" && originUrl.protocol === "http:" && requestUrl.port === originUrl.port && loopbackAliases.has(requestUrl.hostname) && loopbackAliases.has(originUrl.hostname));
    if (!originUrl || originUrl.origin !== requestUrl.origin && !isLocalAlias) {
        throw new HttpError(403, "Cross-origin request rejected");
    }
}
function rejectMismatchedOrigin(request) {
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) {
        throw new HttpError(403, "Cross-origin request rejected");
    }
}
async function digest(value) {
    const bytes = new TextEncoder().encode(value);
    return new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
}
async function requireAdmin(request) {
    const expected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCloudflareEnv"])().ADMIN_API_TOKEN;
    const authorization = request.headers.get("authorization");
    const provided = authorization?.startsWith("Bearer ") ? authorization.slice(7) : "";
    if (!expected || expected.length < 32 || !provided) {
        throw new HttpError(401, "Unauthorized");
    }
    const [expectedHash, providedHash] = await Promise.all([
        digest(expected),
        digest(provided)
    ]);
    let difference = 0;
    for(let index = 0; index < expectedHash.length; index += 1){
        difference |= expectedHash[index] ^ providedHash[index];
    }
    if (difference !== 0) throw new HttpError(401, "Unauthorized");
}
class HttpError extends Error {
    status;
    constructor(status, message){
        super(message), this.status = status;
    }
}
function apiError(error) {
    if (error instanceof HttpError) {
        return Response.json({
            error: error.message
        }, {
            status: error.status
        });
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
        return Response.json({
            error: "Invalid request",
            issues: error.issues
        }, {
            status: 400
        });
    }
    return Response.json({
        error: "Unexpected server error"
    }, {
        status: 500
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__04xj0pa._.js.map