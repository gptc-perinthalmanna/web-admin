import { toast } from "tailwind-toast";

export const toastSuccess = (message: string) =>
  toast()
    .success("Great!", message)
    .with({ color: "bg-green-800" })
    .from("bottom", "end")
    .as("pill")
    .show(); //show pill shaped toast

export const toastError = (message: string) =>
  toast()
    .danger("Oops!", message)
    .with({ color: "bg-rose-800" })
    .from("bottom", "end")
    .as("pill")
    .show(); //show pill shaped toast

export const toastWarning = (message: string) =>
  toast()
    .warning("Note!", message)
    .with({ color: "bg-amber-800" })
    .from("bottom", "end")
    .as("pill")
    .show(); //show pill shaped toast
