import { toast as sonnerToast } from "sonner"

export function useToast({ title, description, action, cancel, important, variant = "default" }) {
  return sonnerToast(title || "", {
    description,
    action,
    cancel,
    important,
    className: variant === "destructive" ? "bg-destructive text-destructive-foreground" : "",
  })
}

//export { useToast } from "sonner"