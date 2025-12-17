# Theme Switcher Cloud
Webflow Cloud-ready package that ships the Theme Switcher script plus a tiny Astro app so the script can be deployed to Webflow’s infrastructure and referenced from any project.

## Features
- Auto-detects the visitor’s saved preference (localStorage) or OS setting.
- Installs the hosted Theme Switcher script automatically via Webflow’s Custom Code API during the app install flow—no manual copy/paste required.
- Supports toggle buttons, explicit dark/light buttons, icons, links, backgrounds, and images via semantic `data-cltd-*` attributes.
- Ships with `cloud.config.json` so the script can be deployed to Webflow Cloud with a single command.

## Files
| File | Purpose |
| --- | --- |
| `theme-switcher.js` | Main JavaScript that handles preference detection and DOM updates. |
| `astro.config.mjs` | Astro configuration wired up with the Cloudflare adapter used by Webflow Cloud. |
| `src/pages/theme-switcher.js.js` | Astro endpoint that streams the raw `theme-switcher.js` file so it is published as `/theme-switcher.js`. |
| `cloud.config.json` | Legacy object-storage manifest retained for reference. |

## Deploy to Webflow Cloud
1. Install/Authenticate the [Webflow CLI](https://developers.webflow.com/data/cloud).
2. Install dependencies once locally with `npm install`.
3. Run `webflow cloud deploy -m /theme-switcher` (or your preferred mount) from this folder.
4. Webflow Cloud runs `astro build`, publishes the output, and exposes the script at `https://<domain>/<mount>/theme-switcher.js`.

## Automatic Script Injection
- During the install redirect, Theme Switcher exchanges the authorization `code` for an access token via Webflow’s **Data Client (REST API)**.
- The access token is used to call the Webflow **Custom Code API** and append the hosted loader (`https://theme-switcher-app.webflow.io/theme-switcher/theme-switcher.js`) to the site’s global footer custom code as an app-installed script.
- Because the script is injected programmatically, every published page begins loading the Theme Switcher immediately after install while keeping credentials off the client.

## Use in Webflow
The install flow automatically adds the hosted script block to your site’s global `</body>` custom code. After the app finishes installing, you only need to add the `data-cltd-*` attributes below to the components you want to toggle. (If the script is removed manually, reinstall Theme Switcher from the Apps dashboard to re-inject it.)

| Attribute | Description |
| --- | --- |
| `data-cltd-theme-toggle` | Toggle button that switches between dark/light. |
| `data-cltd-set-theme="dark"` / `"light"` | Buttons that explicitly set a theme. |
| `data-cltd-theme-text` | Elements whose text color should change. Optional: `data-cltd-dark` / `data-cltd-light` overrides. |
| `data-cltd-theme-bg` | Background color switch with optional overrides. |
| `data-cltd-theme-link` | Link color switch with optional overrides. |
| `data-cltd-icon="dark"` / `"light"` | Icons visible only in the specified mode. |
| `data-cltd-theme-img="dark"` / `"light"` | Images visible only in the specified mode. |

The script stores the user’s choice in `localStorage` and re-applies it on future visits, while also listening for OS-level changes.

## Updating the Script
1. Edit `theme-switcher.js`.
2. (Optional) run `npm run dev` to preview locally.
3. Re-run `webflow cloud deploy`.
4. Publish your Webflow site so it loads the latest asset.

## Support
For Marketplace listing notes or questions, reach out via the GitHub repository or your Webflow Expert profile.
