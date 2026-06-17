import tzLookup from "tz-lookup";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return Response.json({ error: "Invalid lat/lng" }, { status: 400 });
  }

  const timeZone = tzLookup(lat, lng);
  return Response.json({ timeZone });
}
