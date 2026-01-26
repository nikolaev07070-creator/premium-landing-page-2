import { DentalHeader } from "@/components/dental-header";
import { DentalContact } from "@/components/dental-contact";
import { DentalFooter } from "@/components/dental-footer";

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-background">
      <DentalHeader />
      <div className="pt-24">
        <DentalContact />
      </div>
      <DentalFooter />
    </main>
  );
}
