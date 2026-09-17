import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-mono">
      <Button className="text-2xl px-5 py-5">
        <Link href="/pages/login">Login</Link>
      </Button>
      <Button className="text-2xl px-5 py-5">
        <Link href="/pages/signup">Sign Up</Link>
      </Button>
    </div>
  );
}
