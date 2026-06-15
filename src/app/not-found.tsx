import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ink text-paper">
      <Container className="py-32 text-center">
        <p className="text-eyebrow justify-center text-gold">Error 404</p>
        <h1 className="text-hero mt-5 text-paper">Page not found</h1>
        <p className="mx-auto mt-5 max-w-md text-lead text-paper/70">
          The page you’re looking for may have moved or no longer exists.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button href="/" variant="onDark">
            Back to home
          </Button>
          <Link
            href="/services"
            className="inline-flex items-center border border-paper/30 px-6 py-3.5 font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            Explore services
          </Link>
        </div>
      </Container>
    </section>
  );
}
