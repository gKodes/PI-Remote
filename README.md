# PI-Remote
Cast Save Play NAS Remote TV Raspberry PI

# To run the application
```node
node --experimental-specifier-resolution=node packages/bin/bin/rmd 
```

# TODO
## Mirror
- [ ] Auto Complete
- [ ] Blob Protocol Support/Workaround
- [ ] Domain level Proxy (some sort of Proxy or DNS)

## Core
- [ ] Extensions architecture
  - [ ] Configuration (package.json or rc file) and what should the structure be `Maybe one domain per package is good enough to reduce clutter`
  - [ ] Domain Match (domains && regex per file to match)
- [ ] Video Player controller and API https://mpv.io
- [ ] Lib Manager (Use 3rd Party If Possible)
- [ ] Storage Manager (to help store on disk or nas or any where else)