// Advanced Carousel functionality

export interface CarouselOptions {
  autoplay: boolean;
  autoplayDelay: number;
  loop: boolean;
  showIndicators: boolean;
  showNavigation: boolean;
  swipeEnabled: boolean;
  keyboardEnabled: boolean;
  pauseOnHover: boolean;
  lazyLoad: boolean;
}

export const defaultCarouselOptions: CarouselOptions = {
  autoplay: true,
  autoplayDelay: 5000,
  loop: true,
  showIndicators: true,
  showNavigation: true,
  swipeEnabled: true,
  keyboardEnabled: true,
  pauseOnHover: true,
  lazyLoad: true
};

export class AdvancedCarousel {
  private container: HTMLElement;
  private track: HTMLElement;
  private slides: HTMLElement[] = [];
  private indicators: HTMLElement[] = [];
  private prevButton?: HTMLElement;
  private nextButton?: HTMLElement;
  private currentIndex = 0;
  private autoplayTimer?: number;
  private options: CarouselOptions;
  private isTransitioning = false;

  // Touch/swipe properties
  private touchStartX = 0;
  private touchStartY = 0;
  private touchCurrentX = 0;
  private isDragging = false;
  private dragThreshold = 50;

  constructor(containerSelector: string, options: Partial<CarouselOptions> = {}) {
    const container = document.querySelector(containerSelector) as HTMLElement;
    if (!container) {
      throw new Error(`Carousel container not found: ${containerSelector}`);
    }

    this.container = container;
    this.options = { ...defaultCarouselOptions, ...options };

    this.init();
  }

  private init(): void {
    this.setupDOM();
    this.bindEvents();

    if (this.options.autoplay) {
      this.startAutoplay();
    }

    // Initialize with first slide
    this.goToSlide(0, false);
  }

  private setupDOM(): void {
    // Create track if it doesn't exist
    this.track = this.container.querySelector('.carousel-track') || this.createTrack();

    // Get all slides
    this.slides = Array.from(this.track.children) as HTMLElement[];

    if (this.slides.length === 0) {
      console.warn('No slides found in carousel');
      return;
    }

    // Setup navigation buttons
    if (this.options.showNavigation) {
      this.setupNavigation();
    }

    // Setup indicators
    if (this.options.showIndicators) {
      this.setupIndicators();
    }

    // Setup accessibility
    this.setupAccessibility();

    // Setup lazy loading
    if (this.options.lazyLoad) {
      this.setupLazyLoading();
    }
  }

  private createTrack(): HTMLElement {
    const track = document.createElement('div');
    track.className = 'carousel-track flex transition-transform duration-500 ease-in-out';

    // Move existing children to track
    while (this.container.firstChild) {
      track.appendChild(this.container.firstChild);
    }

    this.container.appendChild(track);
    return track;
  }

  private setupNavigation(): void {
    this.prevButton = this.container.querySelector('.carousel-prev') || this.createButton('prev');
    this.nextButton = this.container.querySelector('.carousel-next') || this.createButton('next');
  }

  private createButton(type: 'prev' | 'next'): HTMLElement {
    const button = document.createElement('button');
    button.className = `carousel-${type} absolute top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors ${
      type === 'prev' ? 'left-4' : 'right-4'
    }`;
    button.setAttribute('aria-label', type === 'prev' ? 'Previous slide' : 'Next slide');

    const icon = document.createElement('svg');
    icon.className = 'w-6 h-6 text-gray-600 dark:text-gray-300';
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'currentColor');
    icon.setAttribute('viewBox', '0 0 24 24');

    const path = document.createElement('path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('d', type === 'prev' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7');

    icon.appendChild(path);
    button.appendChild(icon);
    this.container.appendChild(button);

    return button;
  }

  private setupIndicators(): void {
    const indicatorContainer = this.container.querySelector('.carousel-indicators') || this.createIndicatorContainer();

    this.indicators = this.slides.map((_, index) => {
      const indicator = document.createElement('button');
      indicator.className = `carousel-indicator w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
        index === 0 ? 'bg-primary-500 scale-125' : 'bg-gray-300 dark:bg-gray-600'
      }`;
      indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
      indicator.addEventListener('click', () => this.goToSlide(index));

      indicatorContainer.appendChild(indicator);
      return indicator;
    });
  }

  private createIndicatorContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'carousel-indicators flex justify-center mt-8 space-x-2';
    this.container.appendChild(container);
    return container;
  }

  private setupAccessibility(): void {
    this.container.setAttribute('role', 'region');
    this.container.setAttribute('aria-label', 'Image carousel');

    this.slides.forEach((slide, index) => {
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${index + 1} of ${this.slides.length}`);
    });
  }

  private setupLazyLoading(): void {
    const images = this.container.querySelectorAll('img[data-src]');

    if (images.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('loading-skeleton');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  private bindEvents(): void {
    // Navigation buttons
    this.prevButton?.addEventListener('click', () => this.previousSlide());
    this.nextButton?.addEventListener('click', () => this.nextSlide());

    // Keyboard navigation
    if (this.options.keyboardEnabled) {
      this.container.addEventListener('keydown', (e) => this.handleKeydown(e));
      this.container.setAttribute('tabindex', '0');
    }

    // Touch/swipe events
    if (this.options.swipeEnabled) {
      this.setupSwipeEvents();
    }

    // Pause on hover
    if (this.options.pauseOnHover && this.options.autoplay) {
      this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
      this.container.addEventListener('mouseleave', () => this.resumeAutoplay());
    }

    // Intersection observer for autoplay management
    this.setupVisibilityObserver();
  }

  private setupSwipeEvents(): void {
    // Touch events
    this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
    this.container.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
    this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

    // Mouse events for desktop drag
    this.container.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.container.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.container.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    this.container.addEventListener('mouseleave', () => this.handleMouseUp());
  }

  private handleTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.isDragging = true;
    this.pauseAutoplay();
  }

  private handleTouchMove(e: TouchEvent): void {
    if (!this.isDragging) return;
    this.touchCurrentX = e.touches[0].clientX;
  }

  private handleTouchEnd(e: TouchEvent): void {
    if (!this.isDragging) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = this.touchStartX - touchEndX;
    const diffY = Math.abs(this.touchStartY - touchEndY);

    // Only trigger swipe if horizontal movement is greater than vertical and exceeds threshold
    if (Math.abs(diffX) > this.dragThreshold && diffY < Math.abs(diffX)) {
      if (diffX > 0) {
        this.nextSlide();
      } else {
        this.previousSlide();
      }
    }

    this.isDragging = false;
    this.resumeAutoplay();
  }

  private handleMouseDown(e: MouseEvent): void {
    e.preventDefault();
    this.touchStartX = e.clientX;
    this.isDragging = true;
    this.pauseAutoplay();
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.isDragging) return;
    e.preventDefault();
    this.touchCurrentX = e.clientX;
  }

  private handleMouseUp(e?: MouseEvent): void {
    if (!this.isDragging) return;

    if (e) {
      const diffX = this.touchStartX - e.clientX;

      if (Math.abs(diffX) > this.dragThreshold) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }
    }

    this.isDragging = false;
    this.resumeAutoplay();
  }

  private handleKeydown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        this.previousSlide();
        break;
      case 'ArrowRight':
        e.preventDefault();
        this.nextSlide();
        break;
      case 'Home':
        e.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        this.goToSlide(this.slides.length - 1);
        break;
    }
  }

  private setupVisibilityObserver(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.resumeAutoplay();
        } else {
          this.pauseAutoplay();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.container);
  }

  public goToSlide(index: number, animate = true): void {
    if (this.isTransitioning || index < 0 || index >= this.slides.length) return;

    if (animate) {
      this.isTransitioning = true;
    }

    this.currentIndex = index;

    // Update track position
    const translateX = -index * 100;
    this.track.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    this.updateIndicators();

    // Update accessibility
    this.updateAccessibility();

    if (animate) {
      setTimeout(() => {
        this.isTransitioning = false;
      }, 500); // Match CSS transition duration
    }
  }

  public nextSlide(): void {
    if (this.currentIndex < this.slides.length - 1) {
      this.goToSlide(this.currentIndex + 1);
    } else if (this.options.loop) {
      this.goToSlide(0);
    }
  }

  public previousSlide(): void {
    if (this.currentIndex > 0) {
      this.goToSlide(this.currentIndex - 1);
    } else if (this.options.loop) {
      this.goToSlide(this.slides.length - 1);
    }
  }

  private updateIndicators(): void {
    this.indicators.forEach((indicator, index) => {
      if (index === this.currentIndex) {
        indicator.classList.add('bg-primary-500', 'scale-125');
        indicator.classList.remove('bg-gray-300', 'dark:bg-gray-600');
      } else {
        indicator.classList.remove('bg-primary-500', 'scale-125');
        indicator.classList.add('bg-gray-300', 'dark:bg-gray-600');
      }
    });
  }

  private updateAccessibility(): void {
    this.slides.forEach((slide, index) => {
      if (index === this.currentIndex) {
        slide.setAttribute('aria-current', 'true');
      } else {
        slide.removeAttribute('aria-current');
      }
    });
  }

  public startAutoplay(): void {
    if (!this.options.autoplay) return;

    this.autoplayTimer = window.setInterval(() => {
      this.nextSlide();
    }, this.options.autoplayDelay);
  }

  public pauseAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
  }

  public resumeAutoplay(): void {
    if (this.options.autoplay && !this.autoplayTimer) {
      this.startAutoplay();
    }
  }

  public destroy(): void {
    this.pauseAutoplay();

    // Remove event listeners
    this.prevButton?.removeEventListener('click', () => this.previousSlide());
    this.nextButton?.removeEventListener('click', () => this.nextSlide());

    // Clean up DOM
    this.indicators.forEach(indicator => indicator.remove());
    this.prevButton?.remove();
    this.nextButton?.remove();
  }

  // Public API methods
  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getSlideCount(): number {
    return this.slides.length;
  }

  public updateOptions(newOptions: Partial<CarouselOptions>): void {
    this.options = { ...this.options, ...newOptions };

    if (this.options.autoplay && !this.autoplayTimer) {
      this.startAutoplay();
    } else if (!this.options.autoplay && this.autoplayTimer) {
      this.pauseAutoplay();
    }
  }
}

// Initialize carousel utility function
export function initializeCarousel(selector: string, options: Partial<CarouselOptions> = {}): AdvancedCarousel {
  return new AdvancedCarousel(selector, options);
}