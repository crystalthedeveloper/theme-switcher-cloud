# Theme Switcher Cloud
Webflow Marketplace-ready package that ships the Theme Switcher script plus a Webflow Cloud configuration, making it easy to host the script on Webflow’s global object storage and connect it to any project.

## Features
- Auto-detects the visitor’s saved preference (localStorage) or OS setting.
- Supports toggle buttons, explicit dark/light buttons, icons, links, backgrounds, and images via semantic `data-cltd-*` attributes.
- Ships with `cloud.config.json` so the script can be deployed to Webflow Cloud with a single command.

## Files
| File | Purpose |
| --- | --- |
| `theme-switcher.js` | Main JavaScript that handles preference detection and DOM updates. |
| `cloud.config.json` | Webflow Cloud manifest that publishes `theme-switcher.js` to object storage at `/theme-switcher.js`. |

## Deploy to Webflow Cloud
1. Install/Authenticate the [Webflow CLI](https://developers.webflow.com/data/cloud).
2. Run `webflow cloud deploy` from this folder.
3. Webflow Cloud will upload `theme-switcher.js` and serve it from `https://assets.website-files.com/.../theme-switcher.js`.
4. Reference that URL inside your Webflow site (e.g., in an Embed or Custom Code block).

## Use in Webflow
Include the hosted script in your project’s `</body>` custom code, then add the attributes below to elements:

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
2. Re-run `webflow cloud deploy`.
3. Publish your Webflow site so it loads the latest asset.

## Support
For Marketplace listing notes or questions, reach out via the GitHub repository or your Webflow Expert profile.
