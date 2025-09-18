// Main Application Script
import '../styles/main.css';
import { initializeAOS } from './animations';
import { initializeCarousel } from './carousel';
import { initializeTheme } from './theme';
import { initializeInteractions } from './interactions';

// App State
interface AppState {
  currentScreenshot: number;
  theme: 'light' | 'dark';
  isMenuOpen: boolean;
}

class BehaviorObservationApp {
  private state: AppState = {
    currentScreenshot: 0,
    theme: 'light',
    isMenuOpen: false
  };

  private screenshots: Array<{src: string, alt: string, title: string}> = [
    {
      src: '/src/assets/img/v3.0.0-screenshots/400x800bb.png',
      alt: 'BOSS App Main Screen - Observation List',
      title: 'Start tracking student behavior by creating your first observation'
    },
    {
      src: '/src/assets/img/v3.0.0-screenshots/400x800bb-2.png',
      alt: 'BOSS App Student Setup - Create New Observation',
      title: 'Enter student information and configure observation settings'
    },
    {
      src: '/src/assets/img/v3.0.0-screenshots/400x800bb-3.png',
      alt: 'BOSS App Live Session - Client Tracking',
      title: 'Track client behavior with intuitive interface during observation'
    },
    {
      src: '/src/assets/img/v3.0.0-screenshots/400x800bb-4.png',
      alt: 'BOSS App Haptic Settings - Feedback Configuration',
      title: 'Customize haptic feedback and notification preferences'
    },
    {
      src: '/src/assets/img/v3.0.0-screenshots/400x800bb-5.png',
      alt: 'BOSS App Live Session - Peer Tracking',
      title: 'Switch to peer tracking mode for baseline comparisons'
    },
    {
      src: '/src/assets/img/v3.0.0-screenshots/400x800bb-6.png',
      alt: 'BOSS App Session Notes - Add Observations',
      title: 'Add detailed notes during or after observation sessions'
    },
    {
      src: '/src/assets/img/v3.0.0-screenshots/400x800bb-7.png',
      alt: 'BOSS App Session Summary - Detailed Results',
      title: 'View comprehensive session results and student progress'
    },
    {
      src: '/src/assets/img/v3.0.0-screenshots/400x800bb-8.png',
      alt: 'BOSS App Export Options - Share Data',
      title: 'Export observations as CSV or HTML for reports and analysis'
    },
    {
      src: '/src/assets/img/v3.0.0-screenshots/400x800bb-9.png',
      alt: 'BOSS App Analytics - Behavior Charts and Statistics',
      title: 'Analyze behavior patterns with detailed graphs and statistics'
    }
  ];

  constructor() {
    this.init();
  }

  private async init(): Promise<void> {
    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setupApp());
      } else {
        this.setupApp();
      }
    } catch (error) {
      console.error('Failed to initialize app:', error);
    }
  }

  private setupApp(): void {
    console.log('🚀 Initializing Behavior Observation BOSS Website...');

    // Initialize all modules
    this.initializeNavigation();
    this.initializeScreenshotCarousel();
    this.initializeThemeSystem();
    this.initializeScrollEffects();
    this.initializeAnimations();
    this.initializeAccessibility();

    // Add performance monitoring
    this.initializePerformanceMonitoring();

    console.log('✅ App initialized successfully');
  }

  private initializeNavigation(): void {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener('click', () => {
        this.state.isMenuOpen = !this.state.isMenuOpen;

        if (this.state.isMenuOpen) {
          mobileMenu.classList.remove('hidden');
          mobileMenu.classList.add('mobile-menu-enter');
          setTimeout(() => {
            mobileMenu.classList.add('mobile-menu-enter-active');
          }, 10);
        } else {
          mobileMenu.classList.add('mobile-menu-exit-active');
          setTimeout(() => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('mobile-menu-enter', 'mobile-menu-enter-active', 'mobile-menu-exit-active');
          }, 300);
        }
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (this.state.isMenuOpen && !mobileMenu.contains(e.target as Node) && !mobileMenuButton.contains(e.target as Node)) {
          this.state.isMenuOpen = false;
          mobileMenu.classList.add('hidden');
        }
      });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector((anchor as HTMLAnchorElement).getAttribute('href')!);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  private initializeScreenshotCarousel(): void {
    const container = document.getElementById('screenshot-container');
    const indicators = document.getElementById('screenshot-indicators');
    const prevButton = document.getElementById('prev-screenshot');
    const nextButton = document.getElementById('next-screenshot');

    if (!container || !indicators) return;

    // Create carousel slides
    this.screenshots.forEach((screenshot, index) => {
      // Create slide
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.innerHTML = `
        <div class="phone-mockup">
          <div class="phone-frame">
            <div class="phone-screen">
              <img src="${screenshot.src}" alt="${screenshot.alt}" title="${screenshot.title}" loading="lazy">
            </div>
          </div>
          <div class="mt-6 text-center">
            <p class="text-sm text-white/90 max-w-xs mx-auto font-medium">${screenshot.title}</p>
          </div>
        </div>
      `;
      container.appendChild(slide);

      // Create indicator
      const indicator = document.createElement('button');
      indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
      indicator.setAttribute('aria-label', `${screenshot.alt}`);
      indicator.addEventListener('click', () => this.goToScreenshot(index));
      indicators.appendChild(indicator);
    });

    // Navigation buttons
    prevButton?.addEventListener('click', () => this.previousScreenshot());
    nextButton?.addEventListener('click', () => this.nextScreenshot());

    // Auto-play carousel
    this.startCarouselAutoplay();

    // Touch/swipe support
    this.initializeSwipeSupport(container);
  }

  private goToScreenshot(index: number): void {
    this.state.currentScreenshot = index;
    const container = document.getElementById('screenshot-container');
    const indicators = document.querySelectorAll('.carousel-indicator');

    if (container) {
      container.style.transform = `translateX(-${index * 100}%)`;
    }

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }

  private previousScreenshot(): void {
    const newIndex = this.state.currentScreenshot > 0
      ? this.state.currentScreenshot - 1
      : this.screenshots.length - 1;
    this.goToScreenshot(newIndex);
  }

  private nextScreenshot(): void {
    const newIndex = this.state.currentScreenshot < this.screenshots.length - 1
      ? this.state.currentScreenshot + 1
      : 0;
    this.goToScreenshot(newIndex);
  }

  private startCarouselAutoplay(): void {
    setInterval(() => {
      // Only autoplay if user isn't actively interacting
      if (!document.querySelector('#screenshot-carousel:hover')) {
        this.nextScreenshot();
      }
    }, 5000);
  }

  private initializeSwipeSupport(element: HTMLElement): void {
    let startX = 0;
    let startY = 0;
    let threshold = 50;

    element.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = startX - endX;
      const diffY = Math.abs(startY - endY);

      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(diffX) > threshold && diffY < threshold) {
        if (diffX > 0) {
          this.nextScreenshot();
        } else {
          this.previousScreenshot();
        }
      }
    }, { passive: true });
  }

  private initializeThemeSystem(): void {
    const themeToggle = document.getElementById('theme-toggle');

    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    this.state.theme = (savedTheme as 'light' | 'dark') || (systemPrefersDark ? 'dark' : 'light');
    this.applyTheme(this.state.theme);

    themeToggle?.addEventListener('click', () => {
      this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
      this.applyTheme(this.state.theme);
      localStorage.setItem('theme', this.state.theme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.state.theme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.state.theme);
      }
    });
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  private initializeScrollEffects(): void {
    // Parallax scrolling for hero elements
    const parallaxElements = document.querySelectorAll('.parallax');

    const handleScroll = () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach((element) => {
        const rate = scrolled * -0.5;
        (element as HTMLElement).style.transform = `translateY(${rate}px)`;
      });

      // Show/hide navigation background based on scroll
      const nav = document.querySelector('nav');
      if (nav) {
        if (scrolled > 100) {
          nav.classList.add('bg-white/95', 'dark:bg-gray-900/95');
          nav.classList.remove('bg-white/80', 'dark:bg-gray-900/80');
        } else {
          nav.classList.remove('bg-white/95', 'dark:bg-gray-900/95');
          nav.classList.add('bg-white/80', 'dark:bg-gray-900/80');
        }
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  private initializeAnimations(): void {
    // Initialize Animate On Scroll
    initializeAOS();

    // Add intersection observer for custom animations
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');

          // Add stagger effect to child elements
          const children = entry.target.querySelectorAll('.stagger-child');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-slide-up');
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });
  }

  private initializeAccessibility(): void {
    // Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
      if (e.target && (e.target as HTMLElement).closest('#screenshot-carousel')) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            this.previousScreenshot();
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.nextScreenshot();
            break;
          case 'Home':
            e.preventDefault();
            this.goToScreenshot(0);
            break;
          case 'End':
            e.preventDefault();
            this.goToScreenshot(this.screenshots.length - 1);
            break;
        }
      }
    });

    // Focus management for modals and overlays
    this.initializeFocusManagement();

    // Announce theme changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
  }

  private initializeFocusManagement(): void {
    // Trap focus in mobile menu when open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
      const focusableElements = mobileMenu.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );

      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        mobileMenu.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        });
      }
    }
  }

  private initializePerformanceMonitoring(): void {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      // This would integrate with a real performance monitoring service
      console.log('Performance monitoring initialized');
    }

    // Lazy load images
    if ('IntersectionObserver' in window) {
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

      document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
      });
    }

    // Service Worker for caching (in production)
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration failed, continue without it
      });
    }
  }
}

// Initialize the application
new BehaviorObservationApp();

// Export for potential external usage
export default BehaviorObservationApp;