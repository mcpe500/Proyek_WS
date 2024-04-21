# Proyek WS

## Dependencies

- axios
- dotenv
- express
- TypeScript

## Prerequisites

- Node.js
- npm

## Installation

1. Clone git repository

```sh
git clone https://github.com/mcpe500/Proyek_WS.git
cd Proyek_WS
```

2. Install dependencies

```sh
npm install
```

3. Create .env file from .env.template

```env
PORT=

SECRET_KEY=
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_SECRET=
EMAIL_VERIFICATION_TOKEN_SECRET=
REFRESH_TOKEN_AGE=
ACCESS_TOKEN_AGE=
EMAIL_VERIFICATION_AGE=

REMEMBER_ME_REFRESH_TOKEN_AGE=
REMEMBER_ME_ACCESS_TOKEN_AGE=

MONGODB_URI=
```

4. Run the development server

```sh
npm run dev
```

## Testing

```sh
npm run test
```

## Deployment

1. Deploy the server(setelah selesai)

```sh
npm run build
npm run deploy
```
