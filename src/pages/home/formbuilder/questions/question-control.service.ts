import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Question } from './question.model';

/**
 * Convert metadata to FormGroup object
 */
@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: Question[] ): FormGroup {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = this.toFormControl(question);
    });
    
    return new FormGroup(group);
  }

  toFormControl(question): FormControl {
    return question.required ? new FormControl(question.value || '', Validators.required) : new FormControl(question.value || '');
  }
}