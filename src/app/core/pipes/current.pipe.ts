import { Pipe, PipeTransform } from '@angular/core';

type CurrencyType = 'percent' | 'cash'

@Pipe({
  name: 'current'
})
export class CurrentPipe implements PipeTransform {

  transform(value: string, currencyType: CurrencyType ): unknown {
    if(parseFloat(value) >= 0) {
      return currencyType === 'cash' ? `$${value}` : `+${value}%`
    }
    else {
      return currencyType === 'cash' ? `$${value}` : `${value}%`
    }
  }

}
