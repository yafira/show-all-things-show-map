export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

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

    res.status(200).json({
      finalMap: mapJson.result ? JSON.parse(mapJson.result) : null,
      others: othersJson.result ? JSON.parse(othersJson.result) : [],
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
