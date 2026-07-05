const enabledToggle = document.getElementById("enabled-toggle");
const personaSelect = document.getElementById("persona-select");
const statusLine = document.getElementById("status-line");

function populatePersonas() {
  for (const [key, persona] of Object.entries(PERSONAS)) {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = persona.label;
    personaSelect.appendChild(opt);
  }
}

async function refreshStatus() {
  const { poisonEnabled, poisonPersona, poisonLastTerm, poisonLastRun } =
    await browser.storage.local.get([
      "poisonEnabled",
      "poisonPersona",
      "poisonLastTerm",
      "poisonLastRun",
    ]);

  enabledToggle.checked = !!poisonEnabled;
  personaSelect.value = poisonPersona || "random";

  if (!poisonEnabled) {
    statusLine.textContent = "Off";
  } else if (poisonLastTerm) {
    const when = poisonLastRun
      ? new Date(poisonLastRun).toLocaleTimeString()
      : "—";
    statusLine.textContent = `Last search: "${poisonLastTerm}" (${when})`;
  } else {
    statusLine.textContent = "On — waiting for first tick";
  }
}

enabledToggle.addEventListener("change", () => {
  browser.storage.local.set({ poisonEnabled: enabledToggle.checked });
});

personaSelect.addEventListener("change", () => {
  browser.storage.local.set({ poisonPersona: personaSelect.value });
});

populatePersonas();
refreshStatus();
