# Eloy Poison Mode

A distribution-bundled WebExtension (not a source patch) that periodically
fires unrelated searches from a rotating persona, to add noise to a
tracking/profiling picture built from search history.

## Why an extension instead of a `.patch` file

Firefox's toolbar (CustomizableUI defaults, `unified-extensions-button`,
etc.) lives deep in generated/versioned source that we don't have a real,
extracted copy of to diff against safely here — a hand-written context
diff against it would be a coin flip on whether `patch -p1` even applies
cleanly. A WebExtension avoids all of that: it's plain JS/HTML/JSON we
fully control, and Firefox's own "distribution add-on" mechanism installs
it automatically, the same way `settings/distribution/policies.json`
already force-installs uBlock Origin.

## How it gets built in

`scripts/librewolf-patches.py` zips this folder into
`lw/extensions/eloy-poison-mode@eloybrowser.org.xpi` during `make dir`.
`lw/` is the same staging folder that already ships `policies.json` and
`librewolf.cfg` into the packaged app's `distribution/` directory, so this
rides along on a path we already know works.

Requires the `zip` CLI tool on the build machine.

## Current state (placeholder)

- `personas.js` — six personas, a handful of search terms each. Grow this.
- `background.js` — on a fixed 6-minute alarm, if enabled, runs one random
  (or pinned) persona's term through `browser.search.search()` into a
  single hidden background tab.
- `popup.html/js/css` — on/off toggle + persona picker + last-search status.

## Known gap: toolbar position

The request was to place the button between Downloads and the Extensions
button specifically. WebExtension `action` buttons can't declare an exact
toolbar slot at install time — Firefox either pins new distribution
extensions automatically (position not guaranteed) or drops them in the
extensions overflow panel, depending on version/policy.

Two ways to actually pin it exactly:

1. **Manual, immediate**: right-click the icon → Pin to Toolbar, then drag
   it next to Downloads. One-time, per profile.
2. **Scripted default**: customize the toolbar once by hand, then read
   `browser.uiCustomization.state` from `about:config` — it's a JSON blob
   with a `"nav-bar"` array of widget ids. Ship that exact array (with
   `"eloy-poison-mode@eloybrowser.org-browser-action"` inserted between
   `"downloads-button"` and `"unified-extensions-button"`) as a *default*
   pref in `settings/defaults/pref/local-settings.js`. Left undone here on
   purpose — the array is dependent on which other patches are applied and
   only means anything if you inspect it in your own built browser.

## Obvious next steps

- Jitter the alarm interval (fixed 6-minute cadence is itself a signal).
- More personas / bigger term lists, maybe loaded from a remote JSON so
  they can be updated without a rebuild.
- Icon color/animation to reflect on/off state.
