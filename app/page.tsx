import FluidCanvas from "@/components/FluidCanvas";
import Story from "@/components/Story";
import SiteNav from "@/components/SiteNav";
import LanguageProvider from "@/components/LanguageProvider";

export default function Home() {
  return (
    <main>
      <FluidCanvas />
      <LanguageProvider nav={<SiteNav />}>
        <Story />
      </LanguageProvider>
    </main>
  );
}
