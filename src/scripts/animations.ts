// Animation utilities and AOS integration

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
  offset: number;
}

export const defaultAnimationConfig: AnimationConfig = {
  duration: 600,
  delay: 0,
  easing: 'ease-out',
  offset: 120
};

// Initialize Animate On Scroll (AOS) functionality
export function initializeAOS(config: Partial<AnimationConfig> = {}): void {
  const finalConfig = { ...defaultAnimationConfig, ...config };

  // Custom AOS implementation since we're not using the library
  const observerOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: `0px 0px -${finalConfig.offset}px 0px`
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        const animationType = element.getAttribute('data-aos');
        const delay = parseInt(element.getAttribute('data-aos-delay') || '0');

        setTimeout(() => {
          element.classList.add('aos-animate');

          // Apply the specific animation
          switch (animationType) {
            case 'fade-up':
              element.style.opacity = '1';
              element.style.transform = 'translate3d(0, 0, 0)';
              break;
            case 'fade-left':
              element.style.opacity = '1';
              element.style.transform = 'translate3d(0, 0, 0)';
              break;
            case 'fade-right':
              element.style.opacity = '1';
              element.style.transform = 'translate3d(0, 0, 0)';
              break;
            case 'zoom-in':
              element.style.opacity = '1';
              element.style.transform = 'scale(1)';
              break;
            default:
              element.style.opacity = '1';
              element.style.transform = 'translate3d(0, 0, 0)';
          }
        }, delay);

        // Stop observing once animated
        animationObserver.unobserve(element);
      }
    });
  }, observerOptions);

  // Observe all elements with data-aos attributes
  document.querySelectorAll('[data-aos]').forEach((element) => {
    animationObserver.observe(element);
  });
}

// Custom animation utilities
export class AnimationUtils {
  static fadeIn(element: HTMLElement, duration = 600): Promise<void> {
    return new Promise((resolve) => {
      element.style.opacity = '0';
      element.style.transition = `opacity ${duration}ms ease-out`;

      // Trigger reflow
      element.offsetHeight;

      element.style.opacity = '1';

      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

  static slideUp(element: HTMLElement, duration = 600): Promise<void> {
    return new Promise((resolve) => {
      element.style.transform = 'translateY(40px)';
      element.style.opacity = '0';
      element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;

      // Trigger reflow
      element.offsetHeight;

      element.style.transform = 'translateY(0)';
      element.style.opacity = '1';

      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

  static slideLeft(element: HTMLElement, duration = 600): Promise<void> {
    return new Promise((resolve) => {
      element.style.transform = 'translateX(-40px)';
      element.style.opacity = '0';
      element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;

      // Trigger reflow
      element.offsetHeight;

      element.style.transform = 'translateX(0)';
      element.style.opacity = '1';

      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

  static slideRight(element: HTMLElement, duration = 600): Promise<void> {
    return new Promise((resolve) => {
      element.style.transform = 'translateX(40px)';
      element.style.opacity = '0';
      element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;

      // Trigger reflow
      element.offsetHeight;

      element.style.transform = 'translateX(0)';
      element.style.opacity = '1';

      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

  static scaleIn(element: HTMLElement, duration = 600): Promise<void> {
    return new Promise((resolve) => {
      element.style.transform = 'scale(0.8)';
      element.style.opacity = '0';
      element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;

      // Trigger reflow
      element.offsetHeight;

      element.style.transform = 'scale(1)';
      element.style.opacity = '1';

      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

  static staggerChildren(
    parent: HTMLElement,
    childSelector: string,
    animation: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' = 'fadeIn',
    staggerDelay = 100
  ): Promise<void[]> {
    const children = parent.querySelectorAll(childSelector) as NodeListOf<HTMLElement>;

    const animations = Array.from(children).map((child, index) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          this[animation](child).then(resolve);
        }, index * staggerDelay);
      });
    });

    return Promise.all(animations);
  }

  static createFloatingAnimation(element: HTMLElement, intensity = 20, duration = 6000): void {
    const animation = element.animate([
      { transform: 'translateY(0px)' },
      { transform: `translateY(-${intensity}px)` },
      { transform: 'translateY(0px)' }
    ], {
      duration,
      iterations: Infinity,
      easing: 'ease-in-out'
    });

    // Store animation reference for potential cleanup
    (element as any)._floatingAnimation = animation;
  }

  static createPulseGlow(element: HTMLElement, color = 'rgba(139, 92, 246, 0.4)', duration = 2000): void {
    const animation = element.animate([
      {
        boxShadow: `0 0 20px ${color}`,
        transform: 'scale(1)'
      },
      {
        boxShadow: `0 0 40px ${color.replace('0.4', '0.8')}`,
        transform: 'scale(1.05)'
      },
      {
        boxShadow: `0 0 20px ${color}`,
        transform: 'scale(1)'
      }
    ], {
      duration,
      iterations: Infinity,
      easing: 'ease-in-out'
    });

    // Store animation reference for potential cleanup
    (element as any)._pulseGlowAnimation = animation;
  }

  static createGradientShift(element: HTMLElement): void {
    element.style.background = 'linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe)';
    element.style.backgroundSize = '400% 400%';

    const animation = element.animate([
      { backgroundPosition: '0% 50%' },
      { backgroundPosition: '100% 50%' },
      { backgroundPosition: '0% 50%' }
    ], {
      duration: 15000,
      iterations: Infinity,
      easing: 'ease'
    });

    // Store animation reference for potential cleanup
    (element as any)._gradientShiftAnimation = animation;
  }

  static cleanupAnimations(element: HTMLElement): void {
    // Clean up any stored animations
    if ((element as any)._floatingAnimation) {
      (element as any)._floatingAnimation.cancel();
      delete (element as any)._floatingAnimation;
    }
    if ((element as any)._pulseGlowAnimation) {
      (element as any)._pulseGlowAnimation.cancel();
      delete (element as any)._pulseGlowAnimation;
    }
    if ((element as any)._gradientShiftAnimation) {
      (element as any)._gradientShiftAnimation.cancel();
      delete (element as any)._gradientShiftAnimation;
    }
  }
}

// Parallax scrolling utility
export class ParallaxController {
  private elements: { element: HTMLElement; speed: number }[] = [];
  private rafId: number | null = null;

  addElement(element: HTMLElement, speed = 0.5): void {
    this.elements.push({ element, speed });
  }

  removeElement(element: HTMLElement): void {
    this.elements = this.elements.filter(item => item.element !== element);
  }

  start(): void {
    if (this.rafId) return;

    const update = () => {
      const scrollTop = window.pageYOffset;

      this.elements.forEach(({ element, speed }) => {
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });

      this.rafId = requestAnimationFrame(update);
    };

    this.rafId = requestAnimationFrame(update);
  }

  stop(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  destroy(): void {
    this.stop();
    this.elements = [];
  }
}

// Export utilities
export const parallaxController = new ParallaxController();

// Performance-optimized scroll handler
export function createOptimizedScrollHandler(callback: () => void): () => void {
  let rafId: number | null = null;

  return () => {
    if (rafId) return;

    rafId = requestAnimationFrame(() => {
      callback();
      rafId = null;
    });
  };
}

// Reduced motion check
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Auto-disable animations for users who prefer reduced motion
export function initializeAccessibilityAnimations(): void {
  if (prefersReducedMotion()) {
    // Disable animations
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);
  }
}