# Pragun Sharma Portfolio

Static Vite + React portfolio for Pragun Sharma. The frontend does not call the FastAPI backend; the `backend/` folder is retained for reference but is not deployed. Contact uses EmailJS when the three `VITE_EMAILJS_*` variables are configured.

## Content setup

- Add the final resume at `public/Pragun_Sharma_Resume.pdf` for the Resume links to resolve.
- The homepage profile photo uses `public/assets/pragun-professional.webp`. Replace that asset or update `profile.photo` when you want to change the portrait.
- Verified project repositories are linked in `src/data/profile.js`. NASA Turbofan and AI-Enabled Quiz repository URLs were not present in the available GitHub repositories, so those cards intentionally do not render unverified links.
- The site uses no 3D model or AI-generated avatar.

## Commands

```bash
npm ci
npm run build
```
