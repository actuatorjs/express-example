# Example project for `actuatorjs` in express

You can find a simple express API with an actuator instantiated in the [index.ts](./index.ts) file.

## Actuator

### HealthChecks

This shows how to use both `SimpleHealthIndicator` and how to extend `AbstractHealthIndicator` for a simple `postgres` health check.

Try running `docker compose up -d --build express-actuatorjs-app` to run the backend without a running database.
Then try to curl or open your browser on `http://localhost:3000/actuator/health`
You should get:

```json
{"status":"DOWN","components":{"abstract-postgres":{"status":"DOWN","details":{"error":"connect ECONNREFUSED ::1:5432; connect ECONNREFUSED 127.0.0.1:5432"}},"simple-postgres":{"status":"DOWN","details":{"error":"connect ECONNREFUSED ::1:5432; connect ECONNREFUSED 127.0.0.1:5432"}}}}
```

Then try it after running `docker compose up -d`, and check the url again, you should get:

```json
{"status":"UP","components":{"simple-postgres":{"status":"UP"},"abstract-postgres":{"status":"UP"}}}
```

### InfoCheck

A json file is generated upon running `bunx generate-info`. This will create a file under your `outDir` if specified in your `package.json`, or in `dist` by default. The file is named `actuato.info.json`.

The `.git` repository is read to generate it. Make sure to include it in the Containerfile you use to build your image or the git information will be null.

In the example `Containerfile`, this script is run inside the `build` script, and the package.json isn't necessary in the last image as `dist` is the default dir checked for the actuator info file.
If you have a different `outDir`, please keep the package.json file in your final image step.

Once the app is running, check `http://localhost:3000/actuator/info` to see information on your os, process, git and build from your package.json file.

You should see something like this:

```json
{
  "git": {
    "branch": "main",
    "commit": {
      "id": "1867031",
      "time": "2025-07-09T23:44:57+02:00"
    }
  },
  "build": {
    "name": "express-actuatorjs-app",
    "version": "0.0.1"
  },
  "os": {
    "name": "Linux",
    "version": "5.15.167.4-microsoft-standard-WSL2",
    "arch": "x64"
  },
  "process": {
    "pid": 1,
    "memory": {
      "heapTotal": 4344832,
      "heapUsed": 4516782,
      "rss": 69554176
    },
    "cpus": 4
  }
}
```
