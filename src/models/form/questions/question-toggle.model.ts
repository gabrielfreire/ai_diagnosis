import { Question } from './question.model';

export class ToggleQuestion extends Question {
  controlType = 'toggle';

  constructor(options: {}) {
    super(options);
  }
}