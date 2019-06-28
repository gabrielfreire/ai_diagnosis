import { Component, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../../../models/form/questions/question.model';
import { EventBody } from '../../../models/eventbody.model';
 
@Component({
  selector: 'df-question',
  templateUrl: './DynamicQuestion.component.html',
  styles:['./DynamicQuestion.component.css']
})
export class DynamicQuestionComponent {
  //questions
  @Input() question: Question;
  //FormGroup where to put the questions
  @Input() form: FormGroup;
  //event link from the form
  @Input() changeEvent: EventEmitter<any>;
  
  constructor(){}
  /**
   * Verify if is valid input field
   * @return True or False
   */
  get isValid(): Boolean {
    return this.form.controls[this.question.key] ? this.form.controls[this.question.key].valid : true;
  }
  
  /**
   * Method to handle form value changes and realtime responses
   * @param: event EventEmitter sent from the component
   * @param: question Question that must contains the metadata for the action
   */
  onChangeAnswer(event: EventEmitter<any>, question: Question): void {
    if(question.event){
      let action: EventBody = { event, question };
      this.changeEvent.emit(action);
    }
  }
}