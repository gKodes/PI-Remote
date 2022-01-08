# PI-Remote

Cast Save Play NAS Remote TV Raspberry PI

# To run the application

```node
node --experimental-specifier-resolution=node packages/bin/bin/rmd
```

actor - automation script
crew - handle downloads and intercept request and response handlers
director - manage file storage and other stuff
manager - manage file storage and other stuff

```json
{
  "type": "show",
  "origin": "*.example.com",
  "otherOrigins": [], // Dependency Domains (may be link them with peer dependencies)
  "actor": {
    "type": "actor",
  },
  "crew": [{
    "type": "crew",
    "mimeTypes": [], // mime types
    "fileTypes": [], // extensions
    "origin": "*.example.com",
    "route": "", // String Single Route
    "route": [] // handle multiple routes
  }],
}

{
  "type": "actor",
  "origin": "*.example.com",
  "otherOrigins": [], // Dependency Domains (may be link them with peer dependencies)
}

{
  "type": "crew",
  "mimeTypes": [], // mime types
  "fileTypes": [], // extensions
}

{ // Local Disk Storage Manager
  "type": "manager",
  "of": "storage",
  "for": "media", // media | banking | accounts
}

{ // Auth control for a domain
  "type": "manager",
  "of": "access",
  "origin": "*.example.com"
}
```

# TODO

## Mirror

- [ ] Auto Complete
- [ ] Blob Protocol Support/Workaround
- [ ] Domain level Proxy (some sort of Proxy or DNS)

## Core

- [ ] Extensions architecture **WIP**
  - [X] Configuration (package.json or rc file) and what should the structure be `Maybe one domain per package is good enough to reduce clutter`
  - [ ] Domain Match (domains && regex per file to match) **WIP**
- [ ] Core
  - [ ] got integration to fetch an request
  - [ ] HTTP Request Object
  - [ ] HTTP Response Object
- [ ] Stage
  - [ ] add Audience **WIP**
    - [ ] Events Bi-directional pipe to Socket.io
    - [ ] HID Support
    - [ ] multiple audience support
  - [ ] Access manager support (to help check auth status)
  - [ ] Blow Resource Found Event
- [ ] Director
  - [ ] Actor match logic
  - [ ] Crew match and run logic
  - [ ] run a Show [Show Extension's Support]
  - [ ] Storage Manager integration
- [ ] Video Player controller and API https://mpv.io
- [ ] Lib Manager (Use 3rd Party If Possible)
- [ ] Storage Manager (to help store on disk or nas or any where else)
