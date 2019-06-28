import { Question } from './question.model';

export class TextboxQuestion extends Question {
  // controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] !== "" ? options['type'] : 'text';
  }
}