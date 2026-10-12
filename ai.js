// Mission Gyan AI - Groq
const GROQ_API_KEY = "gsk_xKNKnLX3R2uECECNsbxMWGdyb3FYqnsnu6l7aV4yL;

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
        { role: "system", content: "You are Mission Gyan AI. You help users with Sarkari Jobs, Admit Cards, Results in Hindi + English. Answer short and helpful." },
        { role: "user", content: question }
      ]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}