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
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

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
"[project]/app/api/auth/logout/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$admin$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/admin-auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/security.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$admin$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteAdminSession"])(request);
        const response = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
            status: 204
        });
        const secure = new URL(request.url).protocol === "https:";
        const cookieOptions = {
            httpOnly: true,
            secure,
            sameSite: "strict",
            path: "/",
            maxAge: 0,
            expires: new Date(0),
            priority: "high"
        };
        response.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$admin$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_COOKIE_NAME"], "", cookieOptions);
        response.cookies.set(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$admin$2d$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CSRF_COOKIE_NAME"], "", cookieOptions);
        response.headers.set("Cache-Control", "private, no-store");
        return response;
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiError"])(error);
    }
}
}),
"[project]/lib/admin-auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADMIN_USERNAME",
    ()=>ADMIN_USERNAME,
    "CSRF_COOKIE_NAME",
    ()=>CSRF_COOKIE_NAME,
    "SESSION_COOKIE_NAME",
    ()=>SESSION_COOKIE_NAME,
    "SESSION_TTL_SECONDS",
    ()=>SESSION_TTL_SECONDS,
    "createAdminSession",
    ()=>createAdminSession,
    "deleteAdminSession",
    ()=>deleteAdminSession,
    "requireAdminSession",
    ()=>requireAdminSession
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/security.ts [app-route] (ecmascript)");
;
;
;
const ADMIN_USERNAME = "maru.pink.pixel";
const SESSION_COOKIE_NAME = "pinkpixel_admin_session";
const CSRF_COOKIE_NAME = "pinkpixel_admin_csrf";
const SESSION_TTL_SECONDS = 8 * 60 * 60;
const PASSWORD_ALGORITHM = "pbkdf2-sha256";
const PASSWORD_ITERATIONS = 600_000;
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_SECONDS = 15 * 60;
const encoder = new TextEncoder();
function bytesToBase64(bytes) {
    let binary = "";
    for (const byte of bytes)binary += String.fromCharCode(byte);
    return btoa(binary);
}
function base64ToBytes(value) {
    const binary = atob(value);
    return Uint8Array.from(binary, (character)=>character.charCodeAt(0));
}
function randomToken(byteLength = 32) {
    const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
    return bytesToBase64(bytes).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}
async function sha256Base64(value) {
    const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
    return bytesToBase64(new Uint8Array(digest));
}
async function derivePasswordHash(password, saltBase64, iterations) {
    const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
        "deriveBits"
    ]);
    const saltBytes = base64ToBytes(saltBase64);
    const salt = new ArrayBuffer(saltBytes.byteLength);
    new Uint8Array(salt).set(saltBytes);
    const result = await crypto.subtle.deriveBits({
        name: "PBKDF2",
        hash: "SHA-256",
        salt,
        iterations
    }, key, 256);
    return new Uint8Array(result);
}
function timingSafeEqual(left, right) {
    if (left.length !== right.length) return false;
    let difference = 0;
    for(let index = 0; index < left.length; index += 1)difference |= left[index] ^ right[index];
    return difference === 0;
}
function readCookie(request, name) {
    const cookies = request.headers.get("cookie");
    if (!cookies) return null;
    for (const item of cookies.split(";")){
        const separator = item.indexOf("=");
        if (separator < 0) continue;
        if (item.slice(0, separator).trim() === name) return item.slice(separator + 1).trim();
    }
    return null;
}
async function verifyPassword(password, user) {
    const hasUsableHash = Boolean(user?.password_hash && user.password_salt && user.password_algorithm === PASSWORD_ALGORITHM && user.password_iterations && user.password_iterations >= PASSWORD_ITERATIONS);
    const salt = hasUsableHash ? user.password_salt : "AAAAAAAAAAAAAAAAAAAAAA==";
    const iterations = hasUsableHash ? user.password_iterations : PASSWORD_ITERATIONS;
    const expected = hasUsableHash ? base64ToBytes(user.password_hash) : new Uint8Array(32);
    const actual = await derivePasswordHash(password, salt, iterations);
    return hasUsableHash && timingSafeEqual(actual, expected);
}
async function createAdminSession(usernameInput, password) {
    const username = usernameInput.trim().toLowerCase();
    const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])();
    const now = Math.floor(Date.now() / 1000);
    const user = await db.prepare(`SELECT id, username, password_hash, password_salt, password_iterations, password_algorithm,
              active, failed_attempts, locked_until
       FROM admin_users
       WHERE username = ? COLLATE NOCASE
       LIMIT 1`).bind(username).first();
    const isLocked = Boolean(user?.locked_until && user.locked_until > now);
    if (!user || user.active !== 1 || isLocked) return null;
    const passwordMatches = await verifyPassword(password, user);
    if (!passwordMatches) {
        const previousAttempts = user.locked_until && user.locked_until <= now ? 0 : user.failed_attempts;
        const failedAttempts = previousAttempts + 1;
        const lockedUntil = failedAttempts >= MAX_FAILED_ATTEMPTS ? now + LOCK_SECONDS : null;
        await db.prepare(`UPDATE admin_users
         SET failed_attempts = ?, locked_until = ?, updated_at = ?
         WHERE id = ?`).bind(failedAttempts, lockedUntil, now, user.id).run();
        return null;
    }
    const sessionToken = randomToken();
    const csrfToken = randomToken();
    const [sessionTokenHash, csrfTokenHash] = await Promise.all([
        sha256Base64(sessionToken),
        sha256Base64(csrfToken)
    ]);
    const expiresAt = now + SESSION_TTL_SECONDS;
    await db.batch([
        db.prepare(`UPDATE admin_users
       SET failed_attempts = 0, locked_until = NULL, last_login_at = ?, updated_at = ?
       WHERE id = ?`).bind(now, now, user.id),
        db.prepare("DELETE FROM admin_sessions WHERE expires_at <= ?").bind(now),
        db.prepare(`INSERT INTO admin_sessions
       (token_hash, csrf_token_hash, user_id, expires_at, created_at)
       VALUES (?, ?, ?, ?, ?)`).bind(sessionTokenHash, csrfTokenHash, user.id, expiresAt, now)
    ]);
    return {
        userId: user.id,
        username: user.username,
        sessionToken,
        csrfToken,
        expiresAt
    };
}
async function requireAdminSession(request, options = {}) {
    const sessionToken = readCookie(request, SESSION_COOKIE_NAME);
    const csrfToken = readCookie(request, CSRF_COOKIE_NAME);
    if (!sessionToken || !csrfToken) throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"](401, "No autorizado");
    const sessionTokenHash = await sha256Base64(sessionToken);
    const now = Math.floor(Date.now() / 1000);
    const row = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().prepare(`SELECT s.user_id, u.username, s.csrf_token_hash, s.expires_at
       FROM admin_sessions s
       INNER JOIN admin_users u ON u.id = s.user_id
       WHERE s.token_hash = ? AND s.expires_at > ? AND u.active = 1
       LIMIT 1`).bind(sessionTokenHash, now).first();
    if (!row) throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"](401, "No autorizado");
    const suppliedCsrfHash = await sha256Base64(csrfToken);
    if (!timingSafeEqual(base64ToBytes(suppliedCsrfHash), base64ToBytes(row.csrf_token_hash))) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"](401, "No autorizado");
    }
    if (options.csrf) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireSameOrigin"])(request);
        const csrfHeader = request.headers.get("x-csrf-token") ?? "";
        if (!csrfHeader || !timingSafeEqual(encoder.encode(csrfHeader), encoder.encode(csrfToken))) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"](403, "Solicitud rechazada");
        }
    }
    return {
        userId: row.user_id,
        username: row.username,
        csrfToken,
        expiresAt: row.expires_at
    };
}
async function deleteAdminSession(request) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requireSameOrigin"])(request);
    const sessionToken = readCookie(request, SESSION_COOKIE_NAME);
    const csrfToken = readCookie(request, CSRF_COOKIE_NAME);
    const csrfHeader = request.headers.get("x-csrf-token") ?? "";
    if (csrfToken && (!csrfHeader || !timingSafeEqual(encoder.encode(csrfHeader), encoder.encode(csrfToken)))) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$security$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpError"](403, "Solicitud rechazada");
    }
    if (sessionToken) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().prepare("DELETE FROM admin_sessions WHERE token_hash = ?").bind(await sha256Base64(sessionToken)).run();
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
    "requireSameOrigin",
    ()=>requireSameOrigin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
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
class HttpError extends Error {
    status;
    constructor(status, message){
        super(message), this.status = status;
    }
}
function apiError(error) {
    const headers = {
        "Cache-Control": "private, no-store"
    };
    if (error instanceof HttpError) {
        return Response.json({
            error: error.message
        }, {
            status: error.status,
            headers
        });
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodError) {
        return Response.json({
            error: "Invalid request",
            issues: error.issues
        }, {
            status: 400,
            headers
        });
    }
    return Response.json({
        error: "Unexpected server error"
    }, {
        status: 500,
        headers
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__155r1y8._.js.map