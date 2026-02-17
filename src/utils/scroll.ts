export const scrollToSection = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
};
