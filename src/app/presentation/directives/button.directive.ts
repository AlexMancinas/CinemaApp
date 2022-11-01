import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

type buttonAppearance = 'success' | 'default' | 'delete';

@Directive({
  selector: '[customButton]',
})
export class ButtonDirective implements OnInit {
  @Input() appearance: buttonAppearance = 'default';

  private defaultTheme: ReadonlyArray<string> = [
    'mr-auto',
    'text-white',
    'bg-orange-600',
    'hover:bg-orange-700',
    'focus:ring-4',
    'focus:outline-none',
    'focus:ring-orange-800',
    'font-medium',
    'rounded-lg',
    'text-sm',
    'px-5',
    'py-2.5',
    'text-center',
    'inline-flex',
    'items-center',
  ] as const;

  private successTheme: ReadonlyArray<string> = [
    'mr-auto',
    'text-white',
    'bg-green-600',
    'hover:bg-green-700',
    'focus:ring-4',
    'focus:outline-none',
    'focus:ring-green-800',
    'font-medium',
    'rounded-lg',
    'text-sm',
    'px-5',
    'py-2.5',
    'text-center',
    'inline-flex',
    'items-center',
  ] as const;

  private deleteTheme: ReadonlyArray<string> = [
    'mr-auto',
    'text-white',
    'bg-red-600',
    'hover:bg-red-700',
    'focus:ring-4',
    'focus:outline-none',
    'focus:ring-red-800',
    'font-medium',
    'rounded-lg',
    'text-sm',
    'px-5',
    'py-2.5',
    'text-center',
    'inline-flex',
    'items-center',
  ] as const;

  constructor(
    private readonly domRenderer: Renderer2,
    private readonly hostElementRef: ElementRef
  ) {}

  public ngOnInit(): void {
    this.setClasses();
  }

  private setClasses(): void {
    const classesForButton = this.setAppearance(this.appearance);
    classesForButton.forEach((classToAdd) => {
      this.domRenderer.addClass(this.hostElementRef.nativeElement, classToAdd);
    });
  }

  private setAppearance(
    appearanceConfig: buttonAppearance
  ): ReadonlyArray<string> {
    switch (appearanceConfig) {
      case 'default':
        return this.defaultTheme;
      case 'success':
        return this.successTheme;
      case 'delete':
        return this.deleteTheme;
      default:
        return [];
    }
  }
}
