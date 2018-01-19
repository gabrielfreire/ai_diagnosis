import { Injectable } from "@angular/core";

// errors
const ERROR_NO_PARAMETER = "Event parameter or type is missing";
const ERROR_NO_MATCH_ACTION = "This action does not match any possible action";
//events
const EVENTS_EVENT_VISIBILITY = "visibility";

//actions
const EVENTS_VISIBILITY_ACTION_VISIBLE = "visible";
const EVENTS_VISIBILITY_ACTION_HIDDEN = "hidden";

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
        if(event == EVENTS_EVENT_VISIBILITY) {

            if(question[event] == EVENTS_VISIBILITY_ACTION_HIDDEN) {
                question[event] = EVENTS_VISIBILITY_ACTION_VISIBLE;
            } else if(question[event] == EVENTS_VISIBILITY_ACTION_VISIBLE){
                question[event] = EVENTS_VISIBILITY_ACTION_HIDDEN;
            } else {
                throw ERROR_NO_MATCH_ACTION;
            }

        }

        //TODO other events

        return question;
    }
}