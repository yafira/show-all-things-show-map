import DEFAULT_DATA from "../data.json" assert { type: "json" };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    res.status(500).json({ error: "Missing KV env vars" });
    return;
  }
  try {
    const [mapRes, othersRes] = await Promise.all([
      fetch(`${url}/get/sats_final_map`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch(`${url}/get/sats_others`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);
    const mapJson = await mapRes.json();
    const othersJson = await othersRes.json();

    const finalMap =
      mapJson.result && Object.keys(JSON.parse(mapJson.result)).length > 0
        ? JSON.parse(mapJson.result)
        : DEFAULT_DATA.finalMap;

    const others =
      othersJson.result && JSON.parse(othersJson.result).length > 0
        ? JSON.parse(othersJson.result)
        : DEFAULT_DATA.others;

    res.status(200).json({ finalMap, others });
  } catch (e) {
    console.error("get-data error:", e);
    // Full fallback to data.json if KV is down
    res.status(200).json(DEFAULT_DATA);
  }
}
