// Interactive elements and micro-interactions

export interface InteractionConfig {
  enableHoverEffects: boolean;
  enableClickEffects: boolean;
  enableFocusEffects: boolean;
  enableLoadingStates: boolean;
  enableTooltips: boolean;
  debounceDelay: number;
}

export const defaultInteractionConfig: InteractionConfig = {
  enableHoverEffects: true,
  enableClickEffects: true,
  enableFocusEffects: true,
  enableLoadingStates: true,
  enableTooltips: true,
  debounceDelay: 300
};

export class InteractionManager {
  private config: InteractionConfig;
  private observers: Map<string, IntersectionObserver> = new Map();
  private tooltips: Map<HTMLElement, HTMLElement> = new Map();

  constructor(config: Partial<InteractionConfig> = {}) {
    this.config = { ...defaultInteractionConfig, ...config };
    this.init();
  }

  private init(): void {
    this.initializeHoverEffects();
    this.initializeClickEffects();
    this.initializeFocusEffects();
    this.initializeLoadingStates();
    this.initializeTooltips();
    this.initializeScrollTriggers();
    this.initializeFormEnhancements();

    console.log('🎯 Interaction system initialized');
  }

  private initializeHoverEffects(): void {
    if (!this.config.enableHoverEffects) return;

    // Card hover effects
    const cards = document.querySelectorAll('.interactive-card, [data-hover="card"]');
    cards.forEach((card) => {
      this.addCardHoverEffect(card as HTMLElement);
    });

    // Button hover effects
    const buttons = document.querySelectorAll('button, .btn, [data-hover="button"]');
    buttons.forEach((button) => {
      this.addButtonHoverEffect(button as HTMLElement);
    });

    // Image hover effects
    const images = document.querySelectorAll('[data-hover="image"]');
    images.forEach((image) => {
      this.addImageHoverEffect(image as HTMLElement);
    });
  }

  private addCardHoverEffect(card: HTMLElement): void {
    let isHovering = false;

    const handleMouseEnter = () => {
      if (isHovering) return;
      isHovering = true;

      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';

      // Animate child elements
      const icon = card.querySelector('.card-icon');
      if (icon) {
        (icon as HTMLElement).style.transform = 'scale(1.1) rotate(5deg)';
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;

      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '';

      const icon = card.querySelector('.card-icon');
      if (icon) {
        (icon as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Store handlers for cleanup
    (card as any)._hoverHandlers = { handleMouseEnter, handleMouseLeave };
  }

  private addButtonHoverEffect(button: HTMLElement): void {
    const handleMouseEnter = () => {
      button.style.transform = 'translateY(-2px)';
      button.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = '';
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    (button as any)._hoverHandlers = { handleMouseEnter, handleMouseLeave };
  }

  private addImageHoverEffect(image: HTMLElement): void {
    const handleMouseEnter = () => {
      image.style.transform = 'scale(1.05)';
      image.style.filter = 'brightness(1.1)';
    };

    const handleMouseLeave = () => {
      image.style.transform = 'scale(1)';
      image.style.filter = '';
    };

    image.addEventListener('mouseenter', handleMouseEnter);
    image.addEventListener('mouseleave', handleMouseLeave);

    (image as any)._hoverHandlers = { handleMouseEnter, handleMouseLeave };
  }

  private initializeClickEffects(): void {
    if (!this.config.enableClickEffects) return;

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      // Ripple effect for buttons
      if (target.matches('button, .btn, [data-click="ripple"]')) {
        this.createRippleEffect(target, e);
      }

      // Scale effect for interactive elements
      if (target.matches('[data-click="scale"]')) {
        this.createScaleEffect(target);
      }
    });
  }

  private createRippleEffect(element: HTMLElement, event: MouseEvent): void {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
      z-index: 1000;
    `;

    // Ensure element has relative positioning
    const originalPosition = element.style.position;
    if (!originalPosition || originalPosition === 'static') {
      element.style.position = 'relative';
    }

    element.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
      if (!originalPosition) {
        element.style.position = '';
      }
    }, 600);
  }

  private createScaleEffect(element: HTMLElement): void {
    element.style.transform = 'scale(0.95)';

    setTimeout(() => {
      element.style.transform = '';
    }, 150);
  }

  private initializeFocusEffects(): void {
    if (!this.config.enableFocusEffects) return;

    // Enhanced focus styles for interactive elements
    const focusableElements = document.querySelectorAll(
      'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((element) => {
      element.addEventListener('focus', () => {
        (element as HTMLElement).style.outline = '2px solid #8b5cf6';
        (element as HTMLElement).style.outlineOffset = '2px';
        (element as HTMLElement).style.boxShadow = '0 0 0 4px rgba(139, 92, 246, 0.1)';
      });

      element.addEventListener('blur', () => {
        (element as HTMLElement).style.outline = '';
        (element as HTMLElement).style.outlineOffset = '';
        (element as HTMLElement).style.boxShadow = '';
      });
    });
  }

  private initializeLoadingStates(): void {
    if (!this.config.enableLoadingStates) return;

    // Auto-loading states for buttons with data-loading attribute
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const loadingButton = target.closest('[data-loading]') as HTMLElement;

      if (loadingButton) {
        this.setLoadingState(loadingButton, true);

        // Auto-remove loading state after delay (if not removed manually)
        setTimeout(() => {
          this.setLoadingState(loadingButton, false);
        }, 3000);
      }
    });
  }

  public setLoadingState(element: HTMLElement, loading: boolean): void {
    if (loading) {
      element.setAttribute('data-loading', 'true');
      element.style.pointerEvents = 'none';
      element.style.opacity = '0.7';

      // Add loading spinner
      const spinner = document.createElement('span');
      spinner.className = 'loading-spinner inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2';
      element.insertBefore(spinner, element.firstChild);
    } else {
      element.removeAttribute('data-loading');
      element.style.pointerEvents = '';
      element.style.opacity = '';

      // Remove loading spinner
      const spinner = element.querySelector('.loading-spinner');
      if (spinner) {
        spinner.remove();
      }
    }
  }

  private initializeTooltips(): void {
    if (!this.config.enableTooltips) return;

    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach((element) => {
      this.createTooltip(element as HTMLElement);
    });
  }

  private createTooltip(element: HTMLElement): void {
    const tooltipText = element.getAttribute('data-tooltip');
    if (!tooltipText) return;

    const tooltip = document.createElement('div');
    tooltip.className = 'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg opacity-0 pointer-events-none transition-opacity duration-200';
    tooltip.textContent = tooltipText;
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.left = '50%';
    tooltip.style.bottom = '100%';
    tooltip.style.marginBottom = '8px';

    const showTooltip = () => {
      document.body.appendChild(tooltip);

      const rect = element.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
      tooltip.style.opacity = '1';
    };

    const hideTooltip = () => {
      tooltip.style.opacity = '0';
      setTimeout(() => {
        if (tooltip.parentNode) {
          tooltip.parentNode.removeChild(tooltip);
        }
      }, 200);
    };

    element.addEventListener('mouseenter', showTooltip);
    element.addEventListener('mouseleave', hideTooltip);
    element.addEventListener('focus', showTooltip);
    element.addEventListener('blur', hideTooltip);

    this.tooltips.set(element, tooltip);
  }

  private initializeScrollTriggers(): void {
    // Parallax backgrounds
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    if (parallaxElements.length > 0) {
      this.setupParallaxScrolling(parallaxElements);
    }

    // Counter animations
    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length > 0) {
      this.setupCounterAnimations(counters);
    }

    // Progress bars
    const progressBars = document.querySelectorAll('[data-progress]');
    if (progressBars.length > 0) {
      this.setupProgressAnimations(progressBars);
    }
  }

  private setupParallaxScrolling(elements: NodeListOf<Element>): void {
    const handleScroll = this.debounce(() => {
      const scrollTop = window.pageYOffset;

      elements.forEach((element) => {
        const speed = parseFloat((element as HTMLElement).dataset.parallax || '0.5');
        const yPos = -(scrollTop * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private setupCounterAnimations(counters: NodeListOf<Element>): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target as HTMLElement;
          const target = parseInt(counter.dataset.counter || '0');
          this.animateCounter(counter, target);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach((counter) => observer.observe(counter));
  }

  private animateCounter(element: HTMLElement, target: number, duration = 2000): void {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toString();
    }, 16);
  }

  private setupProgressAnimations(progressBars: NodeListOf<Element>): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target as HTMLElement;
          const progress = parseInt(bar.dataset.progress || '0');
          this.animateProgress(bar, progress);
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach((bar) => observer.observe(bar));
  }

  private animateProgress(element: HTMLElement, targetProgress: number, duration = 1500): void {
    const progressBar = element.querySelector('.progress-fill') as HTMLElement;
    if (!progressBar) return;

    progressBar.style.width = '0%';
    progressBar.style.transition = `width ${duration}ms ease-out`;

    setTimeout(() => {
      progressBar.style.width = `${targetProgress}%`;
    }, 100);
  }

  private initializeFormEnhancements(): void {
    // Floating labels
    const floatingLabelInputs = document.querySelectorAll('.floating-label input, .floating-label textarea');

    floatingLabelInputs.forEach((input) => {
      const container = input.closest('.floating-label') as HTMLElement;
      const label = container?.querySelector('label');

      if (!label) return;

      const checkFloat = () => {
        if ((input as HTMLInputElement).value || input === document.activeElement) {
          label.classList.add('floated');
        } else {
          label.classList.remove('floated');
        }
      };

      input.addEventListener('focus', checkFloat);
      input.addEventListener('blur', checkFloat);
      input.addEventListener('input', checkFloat);

      // Initial check
      checkFloat();
    });

    // Form validation feedback
    const validatedInputs = document.querySelectorAll('input[data-validate], textarea[data-validate]');

    validatedInputs.forEach((input) => {
      input.addEventListener('blur', () => {
        this.validateInput(input as HTMLInputElement);
      });

      input.addEventListener('input', this.debounce(() => {
        this.validateInput(input as HTMLInputElement);
      }, this.config.debounceDelay));
    });
  }

  private validateInput(input: HTMLInputElement): void {
    const validationRule = input.dataset.validate;
    let isValid = true;
    let errorMessage = '';

    switch (validationRule) {
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        errorMessage = 'Please enter a valid email address';
        break;
      case 'required':
        isValid = input.value.trim() !== '';
        errorMessage = 'This field is required';
        break;
      case 'phone':
        isValid = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/.test(input.value);
        errorMessage = 'Please enter a valid phone number';
        break;
      default:
        return;
    }

    this.setInputValidationState(input, isValid, errorMessage);
  }

  private setInputValidationState(input: HTMLInputElement, isValid: boolean, errorMessage: string): void {
    const container = input.closest('.form-group, .input-group') as HTMLElement;
    let errorElement = container?.querySelector('.error-message') as HTMLElement;

    if (isValid) {
      input.classList.remove('error');
      input.classList.add('valid');
      if (errorElement) {
        errorElement.remove();
      }
    } else {
      input.classList.remove('valid');
      input.classList.add('error');

      if (!errorElement && container) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message text-sm text-red-600 mt-1';
        container.appendChild(errorElement);
      }

      if (errorElement) {
        errorElement.textContent = errorMessage;
      }
    }
  }

  // Utility methods
  private debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout;
    return ((...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    }) as T;
  }

  public addCustomInteraction(selector: string, handler: (element: HTMLElement, event: Event) => void): void {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(selector)) {
        handler(target, e);
      }
    });
  }

  public destroy(): void {
    // Clean up observers
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();

    // Clean up tooltips
    this.tooltips.forEach((tooltip) => {
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    });
    this.tooltips.clear();

    // Remove event listeners would require storing references
    console.log('🧹 Interaction system cleaned up');
  }
}

// CSS for animations
const interactionStyles = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .floating-label {
    position: relative;
  }

  .floating-label label {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.2s ease;
    pointer-events: none;
    color: #6b7280;
  }

  .floating-label label.floated {
    top: 0;
    font-size: 0.75rem;
    color: #8b5cf6;
    background: white;
    padding: 0 4px;
  }

  .floating-label input,
  .floating-label textarea {
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    transition: border-color 0.2s ease;
  }

  .floating-label input:focus,
  .floating-label textarea:focus {
    border-color: #8b5cf6;
    outline: none;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }

  .floating-label input.error,
  .floating-label textarea.error {
    border-color: #ef4444;
  }

  .floating-label input.valid,
  .floating-label textarea.valid {
    border-color: #10b981;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = interactionStyles;
  document.head.appendChild(styleSheet);
}

// Initialize interactions
export function initializeInteractions(config: Partial<InteractionConfig> = {}): InteractionManager {
  return new InteractionManager(config);
}