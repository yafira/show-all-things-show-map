import DEFAULT_DATA from "../data.json" assert { type: "json" };

export default async function handler(req, res) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) {
    res.status(500).json({ error: "Missing KV env vars" });
    return;
  }
  try {
    const r = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["SET", "sats_final_map", JSON.stringify(DEFAULT_DATA.finalMap)],
        ["SET", "sats_others", JSON.stringify(DEFAULT_DATA.others)],
      ]),
    });
    const text = await r.text();
    console.log("flush response:", text);
    res.status(200).json({ ok: true, message: "KV flushed from data.json" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
