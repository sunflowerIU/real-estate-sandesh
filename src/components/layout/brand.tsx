import Link from "next/link";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className="brand" data-inverse={inverse} href="/" aria-label="GharJagga home">
      <span className="brand-mark" aria-hidden="true">
        घ
      </span>
      <span>
        <strong>GharJagga</strong>
        <small>घरबाट जग्गासम्म</small>
      </span>
    </Link>
  );
}
