// Provide both the default export and a named export `cn` so callers
// can use either `import cn from "@shared/lib"` or
// `import { cn } from "@shared/lib"`.
export { default as cn } from "./cn";
export { default } from "./cn";