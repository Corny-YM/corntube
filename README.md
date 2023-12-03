## Setup OAuth 2.0 Google

- Go in link: https://console.cloud.google.com/apis/credentials
- Create a project
- Create credentials => OAuth client ID. Setting value:
  + Authorized JavaScript origins: http://localhost:5173
  + Authorized redirect URIs: https://<project-id>.supabase.co/auth/v1/callback
    Take URIs from https://supabase.com/dashboard/project/<project-id>/auth/providers

## Setup Provider Google Supabase

- Go to link: https://supabase.com/dashboard/project/<project-id>/auth/providers
- Set Client ID (for OAuth): 01234567890-abcdefghijklmnopqrstuvwxyz012345.apps.googleusercontent.com
  + Take Client ID from: https://console.cloud.google.com/apis/credentials
- Set Client Secret (for OAuth): 
  + Take Client secrets key from there too
