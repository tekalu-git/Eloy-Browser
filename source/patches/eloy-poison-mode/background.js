// Eloy Poison Mode — background script
//
// PLACEHOLDER / MVP implementation. It does one thing: on a timer, if
// enabled, it fires a search term from the selected (or a random) persona
// through the user's default search engine, loaded into a single dedicated
// background tab so it doesn't disrupt whatever the user is actually doing.
//
// This intentionally does NOT try to be a full TrackMeNot-style system yet.
// See the TODOs below for the obvious next steps.

const ALARM_NAME = "eloy-poison-tick";
const DEFAULT_INTERVAL_MINUTES = 6; // TODO: jitter this instead of a fixed cadence

const KEY_ENABLED = "poisonEnabled";
const KEY_PERSONA = "poisonPersona";
const KEY_TAB_ID = "poisonTabId";

async function getSettings() {
  return browser.storage.local.get({
    [KEY_ENABLED]: false,
    [KEY_PERSONA]: "random",
    [KEY_TAB_ID]: null,
  });
}

function pickPersonaKey(selected) {
  if (selected && selected !== "random" && PERSONAS[selected]) {
    return selected;
  }
  const keys = Object.keys(PERSONAS);
  return keys[Math.floor(Math.random() * keys.length)];
}

function pickTerm(personaKey) {
  const terms = PERSONAS[personaKey].terms;
  return terms[Math.floor(Math.random() * terms.length)];
}

// Reuse one hidden tab for every search instead of opening a new one each
// time, so Poison Mode doesn't visibly clutter the tab strip.
async function ensureBackgroundTab(existingTabId) {
  if (existingTabId != null) {
    try {
      const tab = await browser.tabs.get(existingTabId);
      if (tab) return tab.id;
    } catch (e) {
      // Tab was closed by the user (or the browser restarted) — fall
      // through and make a new one.
    }
  }
  const tab = await browser.tabs.create({ url: "about:blank", active: false });
  await browser.storage.local.set({ [KEY_TAB_ID]: tab.id });
  return tab.id;
}

async function fireSearch() {
  const settings = await getSettings();
  if (!settings[KEY_ENABLED]) return;

  const personaKey = pickPersonaKey(settings[KEY_PERSONA]);
  const term = pickTerm(personaKey);
  const tabId = await ensureBackgroundTab(settings[KEY_TAB_ID]);

  try {
    // browser.search.search() runs the query through whatever search
    // engine the user has actually configured as default, so we don't
    // have to hardcode a URL template here.
    await browser.search.search({ query: term, tabId });
  } catch (e) {
    console.error("Eloy Poison Mode: search failed", e);
    return;
  }

  await browser.storage.local.set({
    poisonLastTerm: term,
    poisonLastPersona: personaKey,
    poisonLastRun: Date.now(),
  });

  // TODO: this is the natural place to add more noise sources later —
  // e.g. occasionally visiting a plausible result page instead of just
  // hitting the search results, or spacing multiple searches per tick.
}

browser.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === ALARM_NAME) fireSearch();
});

async function syncAlarm() {
  const settings = await getSettings();
  await browser.alarms.clear(ALARM_NAME);
  if (settings[KEY_ENABLED]) {
    browser.alarms.create(ALARM_NAME, {
      periodInMinutes: DEFAULT_INTERVAL_MINUTES,
    });
  }
}

browser.storage.onChanged.addListener(changes => {
  if (KEY_ENABLED in changes || KEY_PERSONA in changes) {
    syncAlarm();
  }
});

browser.runtime.onInstalled.addListener(syncAlarm);
browser.runtime.onStartup.addListener(syncAlarm);
