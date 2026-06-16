import FluidCanvas from "@/components/FluidCanvas";
import Story from "@/components/Story";
import LanguageProvider from "@/components/LanguageProvider";

export default function Home() {
  return (
    <main>
      <FluidCanvas />
      <LanguageProvider>
        <Story />
      </LanguageProvider>
    </main>
  );
}
