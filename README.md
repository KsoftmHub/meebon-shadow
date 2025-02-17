# getting-started

## Template Command
```bash
npx meebon shadow --help
```
### Initialize the project for Shadow
```bash
npx meebon shadow --init
```

## Template Directory

```
📁 project-name
 ├── 📁 src
 │   ├── 📁 entity
 │   │   └── 📄 User.ts
 │   ├── 📁 modules
 │   │   └── 📁 user
 │   │       ├── 📁 controllers
 │   │       │   └── 📄 UserController.ts
 │   │       ├── 📁 interfaces
 │   │       │   └── 📄 IUserService.ts
 │   │       └── 📁 services
 │   │           └── 📄 UserService.ts
 │   ├── 📄 app.ts
 │   ├── 📄 server.ts
 ├── 📁 template
 │   └── 📁 shadow
 │       ├── 📁 entity
 │       │   └── 📄 entity.template
 │       └── 📁 module-template
 │           ├── 📁 controllers
 │           │   └── 📄 moduleController.template
 │           ├── 📁 interfaces
 │           │   └── 📄 ImoduleService.template
 │           └── 📁 services
 │               └── 📄 moduleService.template
 ├── 📄 shadow.config.json
 ├── 📄 package.json
 ├── 📄 ...
```
