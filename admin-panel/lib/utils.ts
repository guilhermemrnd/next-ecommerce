export function mergeClass(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
