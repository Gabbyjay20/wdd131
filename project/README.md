# LearnHub Academy — WDD131 Deployment

This directory already contains everything the WDD131 page audit expects at the root of the repository (HTML files, `styles.css`, `scripts/main.js`, and the `assets/` folder). Follow the steps below to publish it at `https://<username>.github.io/wdd131/`.

## 1. Create the `wdd131` repository
1. Sign in to GitHub and create a **public** repository named **`wdd131`**.
2. Leave it empty (no README/license) so you can push this local folder as-is.

## 2. Connect the folder to GitHub
From a terminal inside `C:/Users/Gabbyjay/Documents/wdd131` run:

```bash
git init -b main
git add .
git commit -m "Initial commit: WDD131 site"
git remote add origin https://github.com/<username>/wdd131.git
git push -u origin main
```

> Replace `<username>` with your GitHub username. If the repo already exists with commits, just add the remote and push.

## 3. Enable GitHub Pages
1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the **`main`** branch and the **`/ (root)`** folder, then **Save**.
5. Wait for the green deployment badge to confirm the build.

## 4. Verify the audit URL
Visit `https://<username>.github.io/wdd131/` in an incognito/private window. The home page (`index.html`) should load along with the other routes (e.g., `courses.html`, `resources.html`, `enroll.html`, `references.html`). Submit this exact URL to the page audit.

## 5. Troubleshooting checklist
- ✅ Repository name is exactly `wdd131` (all lowercase).
- ✅ The default branch contains this folder *at the repository root* (no extra nesting like `wdd131/project/index.html`).
- ✅ GitHub Pages is enabled for `main` → `/ (root)`.
- ✅ Each HTML file references `styles.css`, `scripts/main.js`, and items inside `assets/` using relative paths, so no extra configuration is required.
- ✅ After any change, re-run `git add .`, `git commit`, and `git push` so GitHub Pages receives the updates.

Once these steps are complete, the audit bot will be able to reach your site at the required URL.
