export default `{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "moduleResolution": "node",
    "noImplicitAny": true,
    "declaration": true,
    "outDir": "dist/",
    "strict": true,
    "baseUrl": "src",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "removeComments": true,
    "noUnusedLocals": true,
    "types": ["node", "jest"],
    "paths": {
      "@/*": ["/*"],
      "@shared/*": ["shared/*"],
      "@util/*": ["util/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist/**/*"]
}
`
