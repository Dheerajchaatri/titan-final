import { redirect } from "next/navigation";

export default function InternshipsPage() {
  redirect("/jobs?type=internship");
}
