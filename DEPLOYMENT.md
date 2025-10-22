# Deployment Guide

## Deploying to Fly.io

### Prerequisites

1. Install the Fly CLI: https://fly.io/docs/hands-on/install-flyctl/
2. Sign up/login: `fly auth signup` or `fly auth login`

### Initial Setup

1. **Set your app name as an environment variable:**
   ```bash
   export FLY_APP_NAME=your-app-name
   ```

2. **Create your Fly app:**
   ```bash
   fly apps create $FLY_APP_NAME
   ```

3. **Set up required secrets:**
   ```bash
   # Rails master key (from config/master.key or generate new one)
   fly secrets set RAILS_MASTER_KEY=your-master-key --app $FLY_APP_NAME

   # Tigris storage (for file uploads)
   fly secrets set AWS_ACCESS_KEY_ID=your-key --app $FLY_APP_NAME
   fly secrets set AWS_SECRET_ACCESS_KEY=your-secret --app $FLY_APP_NAME
   fly secrets set AWS_ENDPOINT_URL_S3=https://fly.storage.tigris.dev --app $FLY_APP_NAME
   fly secrets set AWS_REGION=auto --app $FLY_APP_NAME
   fly secrets set BUCKET_NAME=your-bucket-name --app $FLY_APP_NAME
   ```

4. **Create a persistent volume for the database:**
   ```bash
   fly volumes create data --size 1 --region dfw --app $FLY_APP_NAME
   ```

### Deploy

```bash
fly deploy --app $FLY_APP_NAME
```

### Post-Deployment

- View your app: `fly open --app $FLY_APP_NAME`
- Check logs: `fly logs --app $FLY_APP_NAME`
- SSH into machine: `fly ssh console --app $FLY_APP_NAME`
- Run Rails console: `fly ssh console --app $FLY_APP_NAME -C "/rails/bin/rails console"`

### Database

The app uses SQLite with Litestream for automatic replication to S3 (Tigris). Your data is:
- Stored on a persistent volume at `/data`
- Continuously backed up to S3
- Automatically restored if the machine is recreated

### Updating

To deploy updates:
```bash
fly deploy --app your-app-name
```

The `db:prepare` release command will run automatically to migrate the database.
