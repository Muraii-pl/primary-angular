import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTrapFocus]',
  standalone: true
})
export class TrapFocusDirective implements AfterViewInit {

  constructor(
    private readonly _elementRef: ElementRef
  ) { }

  public ngAfterViewInit():void {
    console.log(this._elementRef.nativeElement)
    this.trapFocus(this._elementRef.nativeElement)
  }

  private trapFocus(elem): void {

    const focusableEls1 = elem.querySelectorAll(
      'a[href], button, textarea, input[type="text"],' +
      'input[type="radio"], input[type="checkbox"], select'
    );
    const focusableEls = Array.from(focusableEls1)
    .filter( (el: any) => !el.disabled);
    const firstFocusableEl: any = focusableEls[0];
    const lastFocusableEl: any = focusableEls[focusableEls.length - 1];

    elem.addEventListener('keydown', function(e) {
      const isTabPressed = e.keyCode === 9;
      if (!isTabPressed) return;

      if ( e.shiftKey ) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    });
  }

}
