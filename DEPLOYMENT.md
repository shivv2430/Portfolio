# AWS Deployment Guide for Shivani Pal's Portfolio

This guide outlines two recommended ways to deploy this Vite-based React portfolio to AWS:
1. **AWS Amplify Hosting** (Recommended: fastest, automated CI/CD directly from GitHub)
2. **Amazon S3 + CloudFront** (Maximum control, edge caching via AWS CDN)

---

## Method 1: AWS Amplify Hosting (Recommended)

AWS Amplify Hosting provides continuous deployment (CI/CD) directly from your GitHub repository `https://github.com/shivv2430/Portfolio`. Every git push automatically rebuilds and redeploys your site.

### Step-by-Step Instructions:

1. **Sign in to AWS Console**:
   - Navigate to [AWS Amplify Console](https://console.aws.amazon.com/amplify/).

2. **Connect Repository**:
   - Click **"Host web app"** (or **"Get Started"** under Amplify Hosting).
   - Select **GitHub** as the Git repository provider and click **Next**.
   - Authorize AWS Amplify to access your GitHub account.
   - Choose repository: `shivv2430/Portfolio` and branch: `main`.

3. **Configure App Build Settings**:
   Amplify will automatically detect Vite. Confirm the build settings or use:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

4. **Single Page Application (SPA) Redirects**:
   In Amplify Console, under **App settings > Rewrites and redirects**, ensure SPA routing is enabled:
   - **Source address**: `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp|pdf)$)([^.]+$)/>`
   - **Target address**: `/index.html`
   - **Type**: `200 (Rewrite)`

5. **Deploy**:
   - Click **Save and deploy**.
   - Your site will be live at `https://main.<unique-id>.amplifyapp.com`.

6. **Custom Domain Setup**:
   - In Amplify Console, navigate to **Domain management**.
   - Click **Add domain**, enter your root or subdomain (e.g., `shivanipal.dev`).
   - Amplify automatically issues a free AWS Certificate Manager (ACM) SSL/TLS certificate for HTTPS.
   - Add the generated CNAME records into your DNS provider (Route 53, GoDaddy, Cloudflare, Namecheap, etc.).

---

## Method 2: Amazon S3 + CloudFront (CDN)

For full architectural control with low latency global edge caching.

### Step 1: Build the Project Locally
```bash
cd /Users/ShivaniPal/Portfolio
npm run build
```
This generates the optimized static files in the `dist/` directory.

### Step 2: Create S3 Bucket
1. Open [Amazon S3 Console](https://s3.console.aws.amazon.com/).
2. Click **Create bucket**.
3. Name it (e.g. `shivani-portfolio-site`).
4. Select your preferred AWS Region.
5. Keep **"Block all public access"** checked (CloudFront Origin Access Control will provide secure read access).
6. Click **Create bucket**.

### Step 3: Set up CloudFront Distribution
1. Open [Amazon CloudFront Console](https://console.aws.amazon.com/cloudfront/).
2. Click **Create distribution**.
3. **Origin domain**: Select your S3 bucket.
4. **Origin access**: Select **Origin access control settings (recommended)**, click **Create control setting**, and save.
5. **Viewer protocol policy**: Select **Redirect HTTP to HTTPS**.
6. **Allowed HTTP methods**: Select `GET, HEAD`.
7. **Default root object**: Enter `index.html`.
8. Under **Custom error response**:
   - HTTP error code: `403: Forbidden` -> Response page path: `/index.html`, HTTP Response code: `200: OK`
   - HTTP error code: `404: Not Found` -> Response page path: `/index.html`, HTTP Response code: `200: OK`
9. Click **Create distribution**.
10. Copy the S3 bucket policy provided by CloudFront and paste it into the S3 bucket's **Permissions > Bucket policy**.

### Step 4: Upload Static Files to S3
Using the AWS CLI:
```bash
aws s3 sync dist/ s3://shivani-portfolio-site --delete
```
Invalidate CloudFront cache when updating:
```bash
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

## Environment Variables
If you connect external services in the future (e.g., EmailJS, Formspree, Google Analytics):
- Prefix variable names with `VITE_` (e.g., `VITE_CONTACT_FORM_ENDPOINT`).
- In AWS Amplify: configure them in **App settings > Environment variables**.
- In local development: place them in `.env.local` (already included in `.gitignore`).

