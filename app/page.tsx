import prisma from "@/lib/prismadb";
import SaveLexicalContent from "./save-laxical-content";

export default async function Page() {
  const text = await prisma.text.findUnique({
    where: { id: "1" },
  });

  return (
    <main className="container">
      <SaveLexicalContent root={text!.text} />
    </main>
  );
}
