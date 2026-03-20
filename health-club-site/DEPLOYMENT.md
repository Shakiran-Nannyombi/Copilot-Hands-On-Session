# 🚀 GitHub Pages Deployment Guide - Health Club Site

## What's Been Configured

✅ Vite config updated with correct base path  
✅ GitHub Actions workflow created  
✅ Build tested locally and successful  

## Deployment Steps

### Step 1: Commit and Push Changes

```bash
cd /home/dev-kiran/Desktop/Projects/Copilot-Hands-On-Session

# Check what's changed
git status

# Add the changes
git add health-club-site/vite.config.js
git add .github/workflows/deploy-health-club.yml

# Commit
git commit -m "Configure health-club-site for GitHub Pages deployment

- Add base path to vite.config.js
- Create GitHub Actions workflow for automated deployment
- Configure build and deploy pipeline"

# Push to GitHub
git push origin main
```

### Step 2: Enable GitHub Pages

1. Go to your repository on GitHub:
   **https://github.com/Shakiran-Nannyombi/Copilot-Hands-On-Session**

2. Click on **Settings** (top right)

3. In the left sidebar, click **Pages**

4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - (No need to select a branch - the workflow handles it)

5. Click **Save**

### Step 3: Trigger Deployment

The deployment will automatically trigger when you push to main. You can also:

- Go to **Actions** tab in your repository
- Click on "Deploy Health Club Site to GitHub Pages"
- Click "Run workflow" → "Run workflow"

### Step 4: Access Your Site

Once deployed (takes 2-3 minutes), your site will be available at:

**https://shakiran-nannyombi.github.io/Copilot-Hands-On-Session/**

## Workflow Features

The GitHub Actions workflow:
- ✅ Triggers on push to main (when health-club-site/ changes)
- ✅ Can be manually triggered (workflow_dispatch)
- ✅ Builds the React app with Vite
- ✅ Deploys to GitHub Pages
- ✅ Uses Node.js 20
- ✅ Caches dependencies for faster builds

## Troubleshooting

### Build Fails
- Check the Actions tab for detailed error logs
- Ensure all dependencies are in package.json
- Run `npm run build` locally first to catch errors

### 404 Errors on Page Routes
- Ensure `base` in vite.config.js matches your repo name
- Current setting: `/Copilot-Hands-On-Session/`

### Site Not Updating
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check Actions tab to confirm deployment succeeded
- Wait 1-2 minutes for CDN to update

## Local Testing with Production Build

Test the production build locally:

```bash
cd health-club-site
npm run build
npm run preview
```

This will serve the production build at `http://localhost:4173`

## Updating the Site

Any time you make changes to the health-club-site:

```bash
# Make your changes to files in health-club-site/

# Test locally
cd health-club-site
npm run dev

# Build and test production
npm run build
npm run preview

# Commit and push
cd ..
git add health-club-site/
git commit -m "Update health club site: [describe changes]"
git push origin main
```

The GitHub Actions workflow will automatically rebuild and redeploy! 🎉

## Configuration Files

### vite.config.js
```javascript
base: '/Copilot-Hands-On-Session/'  // Matches repo name
```

### .github/workflows/deploy-health-club.yml
- Builds from `health-club-site/` directory
- Deploys `dist/` folder to GitHub Pages
- Triggered by changes to health-club-site/**

## Next Steps

After deployment:
1. ✅ Visit the live site
2. ✅ Test all pages and functionality
3. ✅ Share the URL with your team
4. 🎨 Customize content and styling as needed

---

**Ready to deploy!** Just follow the steps above. 🚀
