import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[trend]'
})
export class TrendDirective implements OnChanges {

  constructor(private eleRef: ElementRef) { }

  @Input() trendValue!: string;

    setUpTrend():void{
      console.log(this.trendValue)
      if(parseInt(this.trendValue) >= 0) {
        this.eleRef.nativeElement.innerHTML = 'trending_up';
        this.eleRef.nativeElement.style.color = '#03A66D'
      } else {
        this.eleRef.nativeElement.innerHTML = 'trending_down';
        this.eleRef.nativeElement.style.color = '#DC2626'
      }
    }
    
  ngOnChanges(changes: SimpleChanges): void {
      if(changes['trendValue']) {
        this.setUpTrend()
      }
  }
}
