import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Steel Fabrication Shop in Dammam, Saudi Arabia | NexGen',
  description: 'ASME- and AWS-certified fabrication shop in Dammam. Structural steel, piping spools, tanks and vessels, and CNC machining. Saudi Aramco-approved vendor.',
};

export default function FabricationShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
