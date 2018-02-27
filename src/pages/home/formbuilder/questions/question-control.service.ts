import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Question } from './question.model';

/**
 * Convert metadata to FormGroup object
 */
@Injectable()
export class QuestionControlService {
  constructor() { }

  /**
   * Transform an Array of Questions into a FormGroup
   * @param questions Array of Questions
   * @return A FormGroup
   */
  toFormGroup(questions: Question[] ): FormGroup {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = this.toFormControl(question);
    });
    
    return new FormGroup(group);
  }

  /**
   * Transform one Question into a FormControl
   * @param question Question object
   * @return A FormControl
   */
  toFormControl(question: Question): FormControl {
    return question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
  }
}