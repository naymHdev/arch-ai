# arch-ai
arch-ai/
│
├── src/
│
│   ├── cli/                    # CLI entry & commands
│   │   ├── index.ts
│   │   └── commands/
│   │       └── init.command.ts
│
│   ├── core/                   # Main business logic
│   │   ├── init.ts
│   │   ├── generator.ts
│   │   ├── template.engine.ts
│   │   └── feature.engine.ts
│
│   ├── ai/                     # AI related logic
│   │   ├── ai.service.ts
│   │   ├── ai.prompts.ts
│   │   └── ai.parser.ts
│
│   ├── templates/              # All project templates
│   │   ├── backend-mvp/
│   │   ├── nextjs-basic/
│   │   └── nextjs-ddd/
│
│   ├── config/                 # Config files
│   │   ├── templates.config.ts
│   │   └── features.config.ts
│
│   ├── types/                  # Global types
│   │   └── index.ts
│
│   ├── utils/                  # Helper functions
│   │   ├── logger.ts
│   │   ├── file.ts
│   │   └── spinner.ts
│
│   └── constants/              # Constants
│       └── index.ts
│
│
├── dist/                       # Compiled output
│
├── package.json
├── tsconfig.json
├── .gitignore
├── README.md