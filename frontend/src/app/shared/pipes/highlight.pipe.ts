import { Pipe, type PipeTransform } from '@angular/core';
type Filterable = string | number;
const highlightFilter = (value: Filterable, filter: string) =>
  filter
    ? String(value).replaceAll(
        new RegExp(filter, 'gi'),
        (match) => `<span class="bg-amber-300">${match}</span>`
      )
    : value;

@Pipe({
  name: 'highlight',
  standalone: true,
  pure: true,
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, filter: string) {
    return highlightFilter(value, filter);
  }
}
