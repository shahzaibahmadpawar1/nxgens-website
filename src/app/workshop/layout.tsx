import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CNC Laser Cutting & Welding Services | NexGen Build Dammam',
  description: 'Professional CNC laser cutting, CNC machining, AWS welding, and online leak repair services. Fiber laser technology, micron-level accuracy, 24/7 support.',
};

export default function WorkshopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
