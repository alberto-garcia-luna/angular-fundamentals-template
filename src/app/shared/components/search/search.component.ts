import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  @Input() placeholder: string = '';
  // Use the name `search` for the @Output.
  @Output() search = new EventEmitter();

  searchButtonText: string = 'Search';
  searchTextField: FormControl = new FormControl('');
  placeholderText: string = 'Enter your search query';

  searchButtonClick() {
    this.search.emit();
  }

  onSubmit(searchItem: any) {
    console.log(searchItem);
  }
}