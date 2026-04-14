# Mehndi Aura

Luxury full-stack mehndi website with:

- public portfolio and booking form
- admin login and enquiry dashboard
- SQLite enquiry storage
- WhatsApp, email, and phone contact actions

## Local run

1. Create a `.env` file from `.env.example`
2. Set `ADMIN_PASSWORD`
3. Set `NOTIFY_EMAIL`
4. If you want booking emails to arrive automatically, set SMTP values too
5. For hosted deployments like Render, use Resend values instead of SMTP
6. Run:

```bash
npm start
```

Open:

- `http://localhost:3000`
- `http://localhost:3000/admin`

### Gmail SMTP example

```env
ADMIN_PASSWORD=your-strong-admin-password
NOTIFY_EMAIL=tanya19.2003@hotmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=tanyak17.2003@gmail.com
SMTP_PASS=your-google-app-password
SMTP_FROM=tanyak17.2003@gmail.com
PORT=3000
```

Use a Google App Password, not your normal Gmail password.

### Resend example for hosted environments

```env
ADMIN_PASSWORD=your-strong-admin-password
NOTIFY_EMAIL=tanya19.2003@hotmail.com
RESEND_API_KEY=your-resend-api-key
RESEND_FROM=Mehndi Aura <onboarding@resend.dev>
PORT=3000
```

## Deploy on Render

This project is prepared for Docker-based deployment on [Render](https://render.com/).

### What to do

1. Push this project to GitHub.
2. In Render, create a new Blueprint or Web Service from the repo.
3. Render will detect [render.yaml](/Users/tanyakumari/henna%20by%20tanya/render.yaml).
4. Set these environment variables:

```env
ADMIN_PASSWORD=your-strong-admin-password
NOTIFY_EMAIL=tanya19.2003@hotmail.com
RESEND_API_KEY=your-resend-api-key
RESEND_FROM=Mehndi Aura <onboarding@resend.dev>
PORT=3000
```

5. Keep the attached disk enabled so enquiry data survives redeploys.

### Important note

The website, admin, and enquiry storage will work online with this setup.

Booking email notifications support both SMTP and Resend. SMTP is useful for local development, while Resend is recommended for Render because it uses HTTPS instead of SMTP ports. If delivery fails, the app falls back to local `sendmail` when available, and all notification attempts are logged in `data/notifications.log`.

Client thank-you emails are also sent automatically when a new enquiry is submitted. In the admin dashboard you can now see both:

- the owner booking alert status
- the client reply status

## Recommended setup for Mehndi Aura

Use:

- Gmail `tanyak17.2003@gmail.com` as the sending account
- Outlook `tanya19.2003@hotmail.com` as the inbox that receives booking alerts
- Resend for live Render delivery

That means:

```env
NOTIFY_EMAIL=tanya19.2003@hotmail.com
SMTP_USER=tanyak17.2003@gmail.com
SMTP_FROM=tanyak17.2003@gmail.com
RESEND_FROM=Mehndi Aura <onboarding@resend.dev>
```

For live hosting, the main secret you still need is a `RESEND_API_KEY`.

## Custom domain on Render

When you are ready, you can connect your own domain to the website in Render:

1. Open your web service in Render.
2. Go to `Settings` -> `Custom Domains`.
3. Add your domain, for example `www.mehndiaura.com`.
4. Copy the DNS records Render gives you and add them where you bought your domain.
5. Wait for Render to verify the domain.

### Recommended next step for email

If you connect your own domain, also add that same domain in Resend and verify it there.
Then change:

```env
RESEND_FROM=Mehndi Aura <hello@yourdomain.com>
```

That gives you a much more professional sender email for both booking alerts and client thank-you emails.
