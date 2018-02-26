import { Injectable } from "@angular/core";

// errors
const ERROR_NO_PARAMETER = "Event parameter or type is missing";
const ERROR_NO_MATCH_ACTION = "This action does not match any possible action";

@Injectable()
export class QuestionEventMapper {

    constructor() {}

    /**
     * Apply events to questions
     * @param event event type
     * @param action action to take
     * @param question target question where to apply the event
     */
    applyAction(event, action, question) {
        if(!event) throw ERROR_NO_PARAMETER;
        // Visibility Event
        if(event == Events.Visibility) {

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

enum Events {
    Visibility = 'visibility'
}
enum Actions {
    Visible = 'visible',
    Hidden = 'hidden'
}