# Fractile

### Table of Contents

1. [Requirements](#requirements)
2. [Running the app locally](#running-the-app-locally)
3. [Building for production](#building-for-production)
4. [Deployment](#deployment)

<br>

## Requirements

- [Node.js](https://nodejs.org/en) (>= 14.x)
- [npm]() (installed automatically with node)
- [git](https://git-scm.com/downloads)

<br>

## Running the app locally

**1. Clone the repository**

```bash
git clone https://github.com/FractileMVP/fractile_frontend.git
cd fractile_frontend
```

<br>

**2. Setup Environment Variables**

Make a copy of `.env.example` in the root directory of the project called `.env`. Then fill out any missing variables.
<br>
<br>

**3. Install the dependencies:**

```
npm install
```

<br>

**4. Development server**

Start the development server on http://localhost:3000

```bash
npm run dev
```

<br>

## Building for production

```bash
npm run prod

# this will output the build to /.output/public
```

Locally preview production build:

```bash
npm run preview
```

## Docker

```
docker build -t fractile_frontend .
```

```
docker run -it -p 8080:80 --rm --name fractile_frontend fractile_frontend
```

```
# App should be available at:
http://127.0.0.1:8080/
```
