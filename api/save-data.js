export const config = {
  api: { bodyParser: true },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    res.status(500).json({ error: "Missing KV env vars" });
    return;
  }

  try {
    const { finalMap, others } = req.body;
    const saves = [];

    // Upstash REST API: POST /pipeline with array of commands
    const commands = [];
    if (finalMap !== undefined) {
      commands.push(["SET", "sats_final_map", JSON.stringify(finalMap)]);
    }
    if (others !== undefined) {
      commands.push(["SET", "sats_others", JSON.stringify(others)]);
    }

    if (commands.length > 0) {
      const r = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commands),
      });
      const text = await r.text();
      console.log("Upstash pipeline response:", text);
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    console.error("save-data error:", e);
    res.status(500).json({ error: e.message });
  }
}
