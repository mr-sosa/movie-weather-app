# Deployment Instructions

This guide will walk you through the process of deploying the Movie Weather App.

## Prerequisites

* Node.js and npm installed
* Angular CLI installed (`npm install -g @angular/cli`)

## 1. Obtain a TMDb API Key

To use this application, you need an API key from The Movie Database (TMDb). Follow these steps to get your key:

1.  **Create an account:** If you don't have a TMDb account, sign up for free at [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup).
2.  **Request an API key:** Go to your account settings, find the "API" section, and follow the instructions to request a new API key.
3.  **Copy your API key:** Once your request is approved, you will receive an API key (it's a long string of characters). Keep this key safe and do not share it publicly.

## 2. Configure the API Key

This project uses environment files to manage API keys, keeping them secure and out of version control. You will create local environment files based on the provided examples.

### For Development

1.  In the `src/environments/` directory, create a new file named `environment.ts`.
2.  Copy the content from `src/environments/environment.example.ts` into your new `environment.ts` file.
3.  Replace the placeholder value of `tmdbApiKey` with your actual TMDb API key.

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  tmdbApiKey: 'YOUR_TMDB_API_KEY' // <-- Paste your key here
};
```

### For Production

When you are ready to deploy your application to a live server, you will need to configure the production environment.

1.  In the `src/environments/` directory, create a new file named `environment.prod.ts`.
2.  Copy the content from `src/environments/environment.prod.example.ts` into your new `environment.prod.ts` file.
3.  Replace the placeholder value of `tmdbApiKey` with your production TMDb API key.

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  tmdbApiKey: 'YOUR_PRODUCTION_API_KEY' // <-- Paste your production key here
};
```

**Security Note:** The `.gitignore` file is configured to ignore `environment.ts` and `environment.prod.ts`. This is a crucial security measure to prevent your secret API keys from being accidentally committed to a public or private repository.

## 3. Build and Deploy

Once you have configured your API key, you are ready to build and deploy the application.

### Building for Production

Run the following command to build the application for production:

```bash
npm install
ng build --configuration=production
```

This will create a `dist/myapp` directory with the optimized production-ready files. You can then deploy the contents of this directory to your hosting provider.

### Running the Development Server

To run the application locally for development, use the following command:

```bash
npm install
ng serve
```

This will start a local development server, and you can access the application in your browser at `http://localhost:4200/`.
