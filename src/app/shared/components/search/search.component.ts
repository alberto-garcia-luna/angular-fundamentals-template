import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild("searchForm") public searchForm!: NgForm;
  // Use the name `placeholder` for the @Input.
  @Input() placeholder: string = '';
  // Use the name `search` for the @Output.
  @Output() search = new EventEmitter();

  searchButtonText: string = 'Search';
  searchTextField: FormControl = new FormControl('');

  searchButtonClick(event: Event) {
    this.search.emit();
    this.searchForm.onSubmit(event);
  }

  onSubmit(searchItem: any) {
    console.log(searchItem);
  }
}