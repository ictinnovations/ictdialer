# Running ICTDialer in Docker

This image is the ICTCore base plus the ICTDialer dashboard: Apache, PHP,
FreeSWITCH, MariaDB and the Angular front end in one container.

Two different products share this name. This one is the open source voice and
fax broadcasting dialer built on FreeSWITCH and ICTCore. The commercial service
at ictdialer.com is the hosted version of ICTContact and runs on Asterisk, so
nothing here applies to it.

## Quick start

```bash
docker run -d --name ictdialer \
  -p 8080:80 \
  -p 5060:5060/tcp -p 5060:5060/udp \
  -p 16384-16484:16384-16484/udp \
  ictinnovations/ictdialer:latest
```

Give it about two minutes on first boot while the database is created and the
schema loads. Then open `http://localhost:8080/`.

Default login: `admin@ictcore.org` / `helloAdmin`. Change it immediately.

Publish the RTP range or your broadcast calls will connect and play silence.

## How the two halves fit together

The dashboard is a static Angular build served from `/usr/ictdialer`, and it
calls the REST API at `/api` on the same origin. The base image aliases `/api`
to the ICTCore entry point, so one Apache has to serve both. That's why this is
a single container rather than a GUI talking to an API over the network.

Angular does its own routing, so Apache falls back to `index.html` for any path
that isn't a real file. Without it, reloading on a deep link gives you a 404.

## Configuration

Every environment variable from the base image works here:

| Variable | Default | What it does |
|---|---|---|
| `DB_HOST` | `127.0.0.1` | Point it at a real server and the bundled MariaDB never starts |
| `DB_PASS` | generated | Required when `DB_HOST` is external |
| `ICTCORE_HOST` | `localhost` | The hostname the API advertises |
| `FS_ESL_PASSWORD` | `ClueCon` | FreeSWITCH event socket password. Change it |

Full list in the [ICTCore docker
notes](https://github.com/ictinnovations/ictcore/blob/ictcore/docker/README.md).

## Volumes

- `/usr/ictcore/data` for recordings, uploaded documents and received faxes
- `/usr/ictcore/log` for application logs
- `/var/lib/mysql` for the bundled database

Mount the data volume at all times. Campaign recordings live there and go away
with the container otherwise.

## A word on scale

Broadcasting is bursty by nature. One container running its own MariaDB is fine
for testing and small campaigns, but for anything with real concurrency point
`DB_HOST` at a proper database server and give FreeSWITCH room to breathe. The
bundled database is a convenience, not a deployment plan.

## Building it yourself

```bash
docker build -f docker/Dockerfile -t ictdialer:dev .
```

Node 16 builds the Angular app in the first stage, then the output is copied
onto the ICTCore image. Node 16 specifically, because this is Angular 13 and
the OpenSSL 3 in Node 18 breaks the hashing the older webpack depends on.
