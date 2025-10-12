/**
 * Hook personalizado para navegación con scroll automático al top
 */
import { useNavigate } from "react-router-dom";

export const useNavigateWithScroll = () => {
  const navigate = useNavigate();

  const navigateAndScroll = (to: string, options?: { replace?: boolean }) => {
    navigate(to, options);
    // Pequeño delay para asegurar que la navegación se complete
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  return navigateAndScroll;
};

/**
 * Función utilitaria para scroll al top
 */
export const scrollToTop = (behavior: ScrollBehavior = "smooth") => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior,
  });
};

/**
 * Función para scroll a un elemento específico
 */
export const scrollToElement = (
  elementId: string,
  behavior: ScrollBehavior = "smooth",
  offset: number = 0
) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: elementPosition - offset,
      behavior,
    });
  }
};
