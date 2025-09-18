// Theme management system
import '../styles/main.css';

export type Theme = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  storageKey: string;
  toggleSelector: string;
  autoDetect: boolean;
  respectSystemPreference: boolean;
  transition: boolean;
  transitionDuration: number;
}

export const defaultThemeConfig: ThemeConfig = {
  storageKey: 'boss-theme',
  toggleSelector: '#theme-toggle',
  autoDetect: true,
  respectSystemPreference: true,
  transition: true,
  transitionDuration: 300
};

export class ThemeManager {
  private config: ThemeConfig;
  private currentTheme: Theme = 'auto';
  private systemPrefersDark = false;
  private toggleButton?: HTMLElement;
  private mediaQuery?: MediaQueryList;

  constructor(config: Partial<ThemeConfig> = {}) {
    this.config = { ...defaultThemeConfig, ...config };
    this.init();
  }

  private init(): void {
    // Set up system preference detection
    if (this.config.respectSystemPreference) {
      this.setupSystemPreferenceDetection();
    }

    // Get saved theme or detect system preference
    this.currentTheme = this.getSavedTheme();

    // Apply initial theme
    this.applyTheme(this.currentTheme);

    // Set up toggle button
    this.setupToggleButton();

    // Add transition class if enabled
    if (this.config.transition) {
      this.enableTransitions();
    }

    console.log(`🎨 Theme initialized: ${this.currentTheme}`);
  }

  private setupSystemPreferenceDetection(): void {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.systemPrefersDark = this.mediaQuery.matches;

    // Listen for system theme changes
    this.mediaQuery.addEventListener('change', (e) => {
      this.systemPrefersDark = e.matches;

      // If theme is set to auto, update accordingly
      if (this.currentTheme === 'auto') {
        this.applyTheme('auto');
      }

      // Announce change to screen readers
      this.announceThemeChange();
    });
  }

  private getSavedTheme(): Theme {
    if (!this.config.autoDetect) {
      return 'light';
    }

    const saved = localStorage.getItem(this.config.storageKey) as Theme;

    if (saved && ['light', 'dark', 'auto'].includes(saved)) {
      return saved;
    }

    // Default to auto if system preference detection is enabled
    return this.config.respectSystemPreference ? 'auto' : 'light';
  }

  private setupToggleButton(): void {
    this.toggleButton = document.querySelector(this.config.toggleSelector) as HTMLElement;

    if (!this.toggleButton) {
      console.warn(`Theme toggle button not found: ${this.config.toggleSelector}`);
      return;
    }

    this.toggleButton.addEventListener('click', () => {
      this.toggleTheme();
    });

    // Add keyboard support
    this.toggleButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTheme();
      }
    });

    // Update button appearance
    this.updateToggleButton();
  }

  private enableTransitions(): void {
    const style = document.createElement('style');
    style.textContent = `
      * {
        transition: background-color ${this.config.transitionDuration}ms ease,
                   border-color ${this.config.transitionDuration}ms ease,
                   color ${this.config.transitionDuration}ms ease,
                   fill ${this.config.transitionDuration}ms ease,
                   stroke ${this.config.transitionDuration}ms ease,
                   box-shadow ${this.config.transitionDuration}ms ease !important;
      }
    `;
    document.head.appendChild(style);

    // Remove transitions after initial load to prevent FOUC
    setTimeout(() => {
      style.remove();
    }, this.config.transitionDuration);
  }

  public toggleTheme(): void {
    const themes: Theme[] = ['light', 'dark'];

    if (this.config.respectSystemPreference) {
      themes.push('auto');
    }

    const currentIndex = themes.indexOf(this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];

    this.setTheme(nextTheme);
  }

  public setTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.saveTheme(theme);
    this.updateToggleButton();
    this.announceThemeChange();

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme, resolvedTheme: this.getResolvedTheme() }
    }));
  }

  private applyTheme(theme: Theme): void {
    const resolvedTheme = this.resolveTheme(theme);

    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Update meta theme-color for mobile browsers
    this.updateMetaThemeColor(resolvedTheme);

    // Update any theme-dependent elements
    this.updateThemeElements(resolvedTheme);
  }

  private resolveTheme(theme: Theme): 'light' | 'dark' {
    if (theme === 'auto') {
      return this.systemPrefersDark ? 'dark' : 'light';
    }
    return theme;
  }

  private saveTheme(theme: Theme): void {
    try {
      localStorage.setItem(this.config.storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }

  private updateToggleButton(): void {
    if (!this.toggleButton) return;

    const resolvedTheme = this.getResolvedTheme();

    // Update ARIA label
    const label = resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    this.toggleButton.setAttribute('aria-label', label);

    // Update icon visibility
    const lightIcon = this.toggleButton.querySelector('.dark\\:hidden');
    const darkIcon = this.toggleButton.querySelector('.hidden.dark\\:block');

    if (lightIcon && darkIcon) {
      if (resolvedTheme === 'dark') {
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
      } else {
        lightIcon.classList.remove('hidden');
        darkIcon.classList.add('hidden');
      }
    }
  }

  private updateMetaThemeColor(theme: 'light' | 'dark'): void {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;

    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      document.head.appendChild(metaThemeColor);
    }

    metaThemeColor.content = theme === 'dark' ? '#111827' : '#ffffff';
  }

  private updateThemeElements(theme: 'light' | 'dark'): void {
    // Update any elements that need special handling
    const elementsToUpdate = document.querySelectorAll('[data-theme-element]');

    elementsToUpdate.forEach((element) => {
      const themeElement = element as HTMLElement;
      const lightSrc = themeElement.dataset.lightSrc;
      const darkSrc = themeElement.dataset.darkSrc;

      if (lightSrc && darkSrc) {
        if (element instanceof HTMLImageElement) {
          element.src = theme === 'dark' ? darkSrc : lightSrc;
        }
      }
    });
  }

  private announceThemeChange(): void {
    const announcer = document.getElementById('theme-announcer') || this.createAnnouncer();
    const resolvedTheme = this.getResolvedTheme();

    announcer.textContent = `Theme switched to ${resolvedTheme} mode`;

    // Clear announcement after delay
    setTimeout(() => {
      announcer.textContent = '';
    }, 1000);
  }

  private createAnnouncer(): HTMLElement {
    const announcer = document.createElement('div');
    announcer.id = 'theme-announcer';
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
    return announcer;
  }

  // Public API methods
  public getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  public getResolvedTheme(): 'light' | 'dark' {
    return this.resolveTheme(this.currentTheme);
  }

  public isDark(): boolean {
    return this.getResolvedTheme() === 'dark';
  }

  public isLight(): boolean {
    return this.getResolvedTheme() === 'light';
  }

  public onThemeChange(callback: (theme: Theme, resolvedTheme: 'light' | 'dark') => void): () => void {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent;
      callback(customEvent.detail.theme, customEvent.detail.resolvedTheme);
    };

    window.addEventListener('themechange', handler);

    // Return cleanup function
    return () => {
      window.removeEventListener('themechange', handler);
    };
  }

  public destroy(): void {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener('change', () => {});
    }

    if (this.toggleButton) {
      this.toggleButton.removeEventListener('click', () => {});
      this.toggleButton.removeEventListener('keydown', () => {});
    }
  }
}

// Color scheme utilities
export class ColorSchemeUtils {
  static getSystemPreference(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  static supportsColorScheme(): boolean {
    return window.matchMedia('(prefers-color-scheme)').media !== 'not all';
  }

  static onSystemPreferenceChange(callback: (theme: 'light' | 'dark') => void): () => void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (e: MediaQueryListEvent) => {
      callback(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }

  static generateColorPalette(baseColor: string, theme: 'light' | 'dark'): Record<string, string> {
    // This would generate a full color palette based on a base color
    // Implementation would depend on color manipulation library
    const palette: Record<string, string> = {};

    if (theme === 'dark') {
      palette.background = '#111827';
      palette.foreground = '#f9fafb';
      palette.muted = '#374151';
    } else {
      palette.background = '#ffffff';
      palette.foreground = '#111827';
      palette.muted = '#f3f4f6';
    }

    return palette;
  }
}

// Initialize theme system
export function initializeTheme(config: Partial<ThemeConfig> = {}): ThemeManager {
  return new ThemeManager(config);
}

// Export singleton instance
let themeManagerInstance: ThemeManager | null = null;

export function getThemeManager(): ThemeManager {
  if (!themeManagerInstance) {
    themeManagerInstance = new ThemeManager();
  }
  return themeManagerInstance;
}