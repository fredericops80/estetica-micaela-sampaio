import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ href = "/", light, className, size = 56 }: { href?: string; light?: boolean; className?: string; size?: number }) {
  const ratio = 2482 / 2016;
  return (
    <Link href={href} aria-label="Estética Micaela Sampaio" className={cn("inline-flex items-center", className)} data-cursor="hover">
      <Image
        src={light ? "/assets/brand/logo-light.png" : "/assets/brand/logo.png"}
        alt="Micaela Sampaio"
        width={Math.round(size * ratio)}
        height={size}
        priority
        className="h-auto"
        style={{ width: Math.round(size * ratio), height: size }}
      />
    </Link>
  );
}

export function Monogram({ light, className, size = 40 }: { light?: boolean; className?: string; size?: number }) {
  const ratio = 633 / 774;
  return (
    <Image
      src={light ? "/assets/brand/monogram-light.png" : "/assets/brand/monogram.png"}
      alt=""
      aria-hidden
      width={Math.round(size * ratio)}
      height={size}
      className={className}
      style={{ width: Math.round(size * ratio), height: size }}
    />
  );
}
