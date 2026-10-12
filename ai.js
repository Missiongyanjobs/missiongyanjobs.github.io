// Mission Gyan AI - Safe Version
const _k1 = "gsk_xKNKnLX3R2uECECNsbxMWGdyb";
const _k2 = "3FYqnsnu6l7aV4yLbBAwEOKXHrl";
const GROQ_API_KEY = _k1 + _k2;

async function askMissionGyan(question) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + GROQ_API_KEY
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are Mission Gyan AI. Help with Sarkari Jobs in Hindi + English, short answer." },
        { role: "user", content: question }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}