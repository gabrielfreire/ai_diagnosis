import { Question } from './question.model';

export class DropdownQuestion extends Question {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(question: {}) {
    super(question);
    this.options = question['options'] || [];
  }
}