import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import { CoursesStoreService } from '@app/services/courses-store.service';

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

  constructor (private fb: FormBuilder,
    private coursesStoreService: CoursesStoreService) {}

  searchButtonClick(event: Event) {
    this.searchForm.onSubmit(event);
  }

  onSubmit(searchItem: any) {
    console.log(searchItem);

    if (this.searchForm.controls['searchTextField'].value === ''){
      this.coursesStoreService.getAll()
        .subscribe(() => this.search.emit());
    }
    else {
      this.coursesStoreService.filterCourses(this.searchForm.controls['searchTextField'].value)
        .subscribe(() => this.search.emit());
    }
  }
}