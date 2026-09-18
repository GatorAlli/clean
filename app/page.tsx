import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-mono">
      <Button className="text-2xl px-5 py-5">
        <Link href="/pages/login-signup">Credentials</Link>
      </Button>
    </div>
  );
}
