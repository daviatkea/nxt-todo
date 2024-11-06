import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen grid place-items-center">
      <Link href="/todo">To-Do App</Link>
    </div>
  );
}
