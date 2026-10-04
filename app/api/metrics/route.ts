import { requireAdminSession } from "@/lib/admin-auth"
import { getDb } from "@/lib/db"
import {
  apiError,
  metricSchema,
  readJsonBody,
  requireSameOrigin,
} from "@/lib/security"

type MetricSummaryRow = {
  event: string
  target: string | null
  total: number
}

export async function POST(request: Request) {
  try {
    requireSameOrigin(request)
    const input = metricSchema.parse(await readJsonBody(request, 1_024))

    await getDb()
      .prepare("INSERT INTO metric_events (id, event, target, path) VALUES (?, ?, ?, ?)")
      .bind(crypto.randomUUID(), input.event, input.target ?? null, input.path)
      .run()

    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    return apiError(error)
  }
}

export async function GET(request: Request) {
  try {
    await requireAdminSession(request)
    const { results } = await getDb()
      .prepare(
        `SELECT event, target, COUNT(*) AS total
         FROM metric_events
         WHERE created_at >= datetime('now', '-30 days')
         GROUP BY event, target
         ORDER BY total DESC`,
      )
      .all<MetricSummaryRow>()

    return Response.json(
      { periodDays: 30, metrics: results },
      { headers: { "Cache-Control": "private, no-store" } },
    )
  } catch (error) {
    return apiError(error)
  }
}
