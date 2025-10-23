# Gummy Landing Page with Remote Control

This landing page includes interactive controls that allow users to start and manage your Gummy Ollama chat host remotely.

## Setup for Remote Control

To allow users on the website to control your local Gummy server:

### 1. Make Your Dashboard API Publicly Accessible

Your dashboard API needs to be accessible from the internet. You can use ngrok or similar tunneling service:

```bash
# If your dashboard runs on port 5007
ngrok http 5007
```

### 2. Configure the Landing Page

Create a `.env.local` file in the project root:

```bash
# Replace with your public ngrok URL
NEXT_PUBLIC_GUMMY_API_URL=https://your-ngrok-url.ngrok.io/api
```

### 3. Deploy the Landing Page

Deploy this Next.js app to Vercel or similar platform. The environment variable will be used to connect to your public API.

## How It Works

1. **User visits the landing page** (e.g., https://www.mygum.my/)
2. **Clicks "Start Hosting"** → Scrolls to hosting controls
3. **Clicks "🚀 Start Everything"** → Calls your public API to start services
4. **Real-time status updates** → Shows when services are running
5. **Public URL appears** → When ngrok is active, shows shareable URL
6. **"Open Your Chat Room" button** → Links to the actual chat interface

## Security Considerations

- **Add authentication** to your dashboard API to prevent unauthorized access
- **Rate limiting** to prevent abuse
- **CORS configuration** to only allow your domain

## API Endpoints Used

- `GET /api/status` - Get service status
- `POST /api/start-all` - Start all services  
- `POST /api/start-app` - Start app only
- `POST /api/start-ngrok` - Start ngrok only
- `POST /api/stop-all` - Stop all services
- `POST /api/restart-app` - Restart app
