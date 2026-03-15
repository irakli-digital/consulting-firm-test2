// components/ui/SectionWrapper.tsx
interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  bgColor?: "white" | "gray" | "navy";
}

const bgClasses = {
  white: "bg-white",
  gray: "bg-slate-50",
  navy: "bg-navy text-white",
};

export default function SectionWrapper({
  children,
  id,
  className = "",
  bgColor = "white",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${bgClasses[bgColor]} ${className}`}>
      {children}
    </section>
  );
}
