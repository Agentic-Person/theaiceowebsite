export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (!element) return;

  // Account for fixed navbar height (16 * 4 = 64px + some padding)
  const navbarHeight = 80;
  const elementPosition = element.offsetTop - navbarHeight;

  window.scrollTo({
    top: elementPosition,
    behavior: 'smooth'
  });
};

export const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  scrollToSection(sectionId);
};