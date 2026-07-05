// Eloy Poison Mode — persona definitions
//
// PLACEHOLDER data set. This is the part you'll want to grow over time:
// add more personas, or add more terms to the existing ones. background.js
// picks a random persona (or a persona pinned from the popup) and a random
// term from that persona's list on every alarm tick.
//
// Ideas for later:
//   - vary phrasing/capitalization so terms don't look templated
//   - pull terms from a remote, editable list instead of hardcoding them
//   - weight persona selection instead of uniform random
//   - time-of-day-aware terms (e.g. "recipes" in the evening)

const PERSONAS = {
  "soccer-parent": {
    label: "Soccer parent",
    terms: [
      "best cleats for youth soccer",
      "u10 soccer drills for beginners",
      "healthy snacks after practice",
      "weekend tournament schedule",
      "carpool schedule template",
      "shin guard sizing chart",
    ],
  },
  gamer: {
    label: "Gamer",
    terms: [
      "best graphics settings for competitive fps",
      "new game releases this month",
      "graphics card benchmark comparison",
      "speedrun tricks platformer",
      "discord server setup tips",
      "controller vs mouse aim comparison",
    ],
  },
  "home-cook": {
    label: "Home cook",
    terms: [
      "easy weeknight dinner ideas",
      "how to substitute buttermilk",
      "sourdough starter troubleshooting",
      "best knife sharpening technique",
      "meal prep containers comparison",
    ],
  },
  student: {
    label: "Student",
    terms: [
      "how to cite a website apa",
      "study techniques for finals",
      "cheap textbook rental sites",
      "internship application tips",
      "best note taking apps for college",
    ],
  },
  "remote-worker": {
    label: "Remote worker",
    terms: [
      "ergonomic desk setup on a budget",
      "best noise cancelling headphones for calls",
      "how to stay focused working from home",
      "standing desk converter reviews",
      "time zone meeting scheduler",
    ],
  },
  gardener: {
    label: "Gardener",
    terms: [
      "when to plant tomatoes zone 6",
      "natural aphid control",
      "raised bed soil mix recipe",
      "companion planting chart",
      "composting for beginners",
    ],
  },
};
