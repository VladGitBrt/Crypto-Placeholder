import { Pipe, PipeTransform } from '@angular/core';

type CurrencyType = 'percent' | 'cash'

@Pipe({
  name: 'current'
})
export class CurrentPipe implements PipeTransform {

  transform(value: string, currencyType: CurrencyType ): unknown {
      return currencyType === 'cash' ? `$${this.round(parseFloat(value),2)}` : `${this.round(parseFloat(value),2)}%`
  }

  private round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return ((Math.round(value * multiplier) / multiplier)).toString();
  }

}
