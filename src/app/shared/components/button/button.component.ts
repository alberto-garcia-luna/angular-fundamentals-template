import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, IconDefinition, IconPrefix, IconName, faTrash, faPencil, faQuestion, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  buttonIcon: IconDefinition = faQuestion;

  constructor(private library: FaIconLibrary) {
    library.addIconPacks(fas);
  }  

  // Use the names for the inputs `buttonText` and `iconName`.
  @Input() buttonText: string = '';

  @Input() iconName: string = '';

  //@Output() newButtonClick = new EventEmitter();
  
  ngOnInit() {
    this.buttonIcon = this.getIcon(this.iconName)
  }

  //buttonClick() {
  //  this.newButtonClick.emit();
  //}

  getIcon(id: string): IconDefinition {
    let myIcon: IconDefinition = faQuestion;

    switch(id) {
      case "delete":
        myIcon = faTrash;
        break;
      case "edit":
        myIcon = faPencil;
        break;
      case "add":
        myIcon = faPlus;
        break;
      default: 
        break;
    }

    return myIcon;
  }

  getIconDef(prefix: IconPrefix, name: IconName): IconDefinition | null{
    return this.library.getIconDefinition(prefix, name)
  }
}
