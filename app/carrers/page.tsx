import { redirect } from "next/navigation";

export type { JobDetail } from "@/components/carrers/types";

export default function CarrersRedirect() {
  redirect("/careers/");
}
