import { Injectable } from "@angular/core";
import { Question, ActionOptions } from './../models';
// errors
const ERROR_NO_PARAMETER = "Event parameter or type is missing";
const ERROR_NO_MATCH_ACTION = "This action does not match any possible action";

enum Events {
    Visibility = 'visibility'
}
enum Actions {
    Visible = 'visible',
    Hidden = 'hidden'
}

@Injectable()
export class QuestionEventMapper {

    constructor() {}

    /**
     * Apply events to questions
     * @param options <ActionOptions> Action options with meta information about the event, the action and the target
     */
    applyAction(options: ActionOptions): Question {
        if(!options.event) throw ERROR_NO_PARAMETER;
        let event = options.event;
        let question = options.target;
        // Visibility Event
        if(options.event == Events.Visibility) {
            if(question[event] == Actions.Hidden) {
                question[event] = Actions.Visible;
            } else if(question[event] == Actions.Visible){
                question[event] = Actions.Hidden;
            } else {
                throw ERROR_NO_MATCH_ACTION;
            }
        }

        //TODO other events

        return question;
    }
}