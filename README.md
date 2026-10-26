# JS Blood Bank website demo

A responsive static website concept made with HTML, CSS and vanilla JavaScript.

## Run locally
Open `index.html` in a browser. For local development, you can also run a simple static server from this folder.

## Before publishing — important
1. Open `script.js` and update `SITE_CONFIG` with the blood bank's verified WhatsApp number, phone number, address, and Google Maps URL.
2. Replace the sample inventory cards with a secure, verified data source before showing live stock or requirements. Current group cards are **sample UI only**, and do not show actual availability.
3. Update the SEO description, contact details, operating hours, policies and any medical/service claims to match the real facility.
4. Connect the appointment form to an approved secure backend if you need to store submissions. The current demo only hands the form details to WhatsApp after the visitor reviews and submits the message.
5. Obtain permission to use the organization's name, logo, photos and any donor/patient imagery. Never publish identifiable patient details without proper consent.
6. The map is a visual preview until a verified location is configured.

## Features
- Responsive mobile-first layout
- Blood-group filters and search
- Donor / availability enquiry form with validation
- WhatsApp handoff (requires configuration)
- Phone and directions links (require configuration)
- Accessible labels, keyboard focus, skip link and reduced-motion support
- Basic metadata and MedicalOrganization structured data
- No framework or build step

## Files
- `index.html` — page structure and SEO metadata
- `styles.css` — layout, typography, responsive styles and animations
- `script.js` — filters, mobile menu and form interactions
