import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comma'
})
export class CommaPipe implements PipeTransform {

  transform(input: string): string {
    let nums = input.replace(/,/g, '');
    if (!nums) return;
    return parseInt(nums).toLocaleString();
  }

}
