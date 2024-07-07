import { Metadata } from "next";
import Hero from "./components/home/Hero";
import AboutKam from "./components/home/AboutKam";
import Testimonial from "./components/home/Testimonial";
import Upgrades from "./components/home/Upgrades";

export const metadata: Metadata = {
  title: 'Home | KAM',
};

export default function Home() {
  return (
    <main>
      <div>
        <Hero />
        <AboutKam />
        <Testimonial />
        <Upgrades />
      </div>
    </main>
  );
}
