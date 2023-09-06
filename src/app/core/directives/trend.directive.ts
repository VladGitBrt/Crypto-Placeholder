import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Directive({
  selector: '[trend]'
})
export class TrendDirective implements OnInit {

  constructor(private eleRef: ElementRef) { }

  @Input() trendValue: string = '0';

  ngOnInit(): void {
      if(parseInt(this.trendValue) >= 0) {
        this.eleRef.nativeElement.innerHTML = 'trending_up';
        this.eleRef.nativeElement.style.color = '#03A66D'
      } else {
        this.eleRef.nativeElement.innerHTML = 'trending_down';
        this.eleRef.nativeElement.style.color = '#DC2626'
      }
  }
}
