import { ElementRef, Pipe, PipeTransform } from '@angular/core';

type CurrencyType = 'percent' | 'cash'

@Pipe({
  name: 'current'
})
export class CurrentPipe implements PipeTransform {

  transform(value: string, currencyType: CurrencyType, elRef?: HTMLElement ): unknown {
      if(currencyType === 'percent') {
        if(parseFloat(value) >= 0){
          elRef!.style.color = '#03A66D';
          return `+${Number(parseFloat(value).toFixed(2))}%`;
        } else {
          elRef!.style.color = '#DC2626';
          return `${Number(parseFloat(value).toFixed(2))}%`;
        }
      } else {
        return `$${Number(parseFloat(value).toFixed(2))}`
      }
  }
}
