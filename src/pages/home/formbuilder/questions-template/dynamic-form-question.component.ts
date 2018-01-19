import { Component, Input, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../questions/question.model';
import { EventBody } from './../../../../app/models/eventbody.model';
 
@Component({
  selector: 'df-question',
  templateUrl: './dynamic-form-question.component.html',
  styles:['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent {
  //questions
  @Input() question: Question;
  //FormGroup where to put the questions
  @Input() form: FormGroup;
  //event link from the form
  @Input() changeEvent: EventEmitter<any>;
  
  constructor(){}
  /**
   * Verify input validity
   */
  get isValid(): Boolean {
    return this.form.controls[this.question.key] ? this.form.controls[this.question.key].valid : true;
  }
  
  /**
   * Method to handle form value changes and realtime responses
   * @param: event sent from the component
   * @param: question the question that contains the metadata for the action
   */
  onChangeAnswer(event: EventEmitter<any>, question: Question): void {
    if(question.event){
      let action: EventBody = { event, question };
      this.changeEvent.emit(action);
    }
  }
}