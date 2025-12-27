export function getArgumentType(arg: unknown): "string" | "regex" {
    if (typeof arg === "string") return "string";
    if (arg instanceof RegExp) return "regex";
}