# Connecting the visual editor (Sanity)

Once this is done, you edit the whole site from a friendly dashboard at
`your-site.com/studio`: officers, events, forms, contact info, stats, your logo,
and all page text. No code. Changes go live in about a minute.

You only do this once. It takes about 5 minutes.

---

## Step 1. Create a free Sanity project

1. Go to https://www.sanity.io and click Get started, then sign in with Google
   or GitHub (free).
2. Create a new project. Name it Health Leaders Initiative.
3. When asked for a dataset, use production and keep it public.
4. Open https://www.sanity.io/manage, click your project, and copy the Project ID
   (a short code like a1b2c3d4).

## Step 2. Give the site your Project ID

Easiest: send the Project ID to whoever manages the code and it gets added.

Or do it yourself in Vercel:
1. Go to https://vercel.com, open the health-leaders-initiative project, then
   Settings, then Environment Variables.
2. Add these two (Environment: Production, Preview, Development):
   - NEXT_PUBLIC_SANITY_PROJECT_ID = your project id
   - NEXT_PUBLIC_SANITY_DATASET = production
3. Go to Deployments, open the latest, and Redeploy.

## Step 3. Allow the dashboard to save (CORS)

1. At https://www.sanity.io/manage, open your project, then API, then CORS origins.
2. Click Add CORS origin and add each of these with Allow credentials checked:
   - https://health-leaders-initiative.vercel.app
   - http://localhost:3000

## Step 4. Start editing

1. Go to https://health-leaders-initiative.vercel.app/studio
2. Log in with the same Sanity account.
3. You will see: Site Settings, Page Text, Cards, Officers, Projects and Events,
   and Forms.
4. Upload your logo: Site Settings, then Logo, then upload your file and Publish.
5. Edit any text on the site under Page Text (grouped by page). Add officers,
   events, and forms. Fill in contact email, Instagram, Remind code, and meeting
   details. Hit Publish on each. The live site updates within about a minute.

Tip: invite other officers as editors in sanity.io/manage under Members (up to
3 people free) so the team can help keep it updated.

---

## How the content works

- If Sanity is not connected, the site shows the built-in content from
  src/lib/site.ts, so nothing breaks.
- Once connected, anything you enter in the dashboard overrides the defaults.
  Leave a field blank in Sanity and it falls back to the default.

## Local development

Create a file named .env.local in the project with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

Then run npm run dev and open http://localhost:3000/studio.
