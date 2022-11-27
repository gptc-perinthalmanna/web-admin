import { toast } from "tailwind-toast";

export const toastSuccess = (message: string) =>
  toast()
    .success("Great!", message)
    .with({ color: "bg-green-800" })
    .from("bottom", "end")
    .as("pill")
    .show(); //show pill shaped toast
