import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  dataie: string = `{
    "metadata": null,
    "questionset": [{
        "additional_information": {
            "title": "Patient Health Questionnaire (PHQ-9)",
            "created_at": null,
            "updated_at": null,
            "question_id": null,
            "subheader": "Validity has been assessed against an independent structured mental health professional (MHP) interview. PHQ-9 score ≥10 had a sensitivity of 88% and a specificity of 88% for major depression. It can even be used over the telephone."
        },
        "questions": [{
                "key": "question1",
                "label": "Little interest or pleasure in doing things?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 0,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question2",
                "label": "Feeling down, depressed, or hopeless?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 1,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question3",
                "label": "Trouble falling or staying asleep, or sleeping too much?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 2,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question4",
                "label": "Feeling tired or having little energy?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 3,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question5",
                "label": "Poor appetite or overeating?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 4,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question6",
                "label": "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 5,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question7",
                "label": "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 6,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question8",
                "label": "Thoughts that you would be better off dead, or of hurting yourself in some way?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 7,
                "visibility": "visible",
                "controlType": "dropdown"
            },
            {
                "key": "question9",
                "label": "Trouble concentrating on things, such as reading the newspaper or watching television?",
                "value": "",
                "required": true,
                "options": [{
                        "key": 0,
                        "value": "Not at all"
                    },
                    {
                        "key": 1,
                        "value": "Several days"
                    },
                    {
                        "key": 2,
                        "value": "More than half the days"
                    },
                    {
                        "key": 3,
                        "value": "Nearly every day"
                    }
                ],
                "order": 8,
                "visibility": "visible",
                "controlType": "dropdown"
            }
        ],
        "evaluation": [{
                "maxscore": 27,
                "event": {
                    "type": "score_id",
                    "message": "Severe"
                },
                "fact": "mental_health_condition",
                "path": ".score"
            },
            {
                "maxscore": 19,
                "event": {
                    "type": "score_id",
                    "message": "Moderately Severe"
                },
                "fact": "mental_health_condition",
                "path": ".score"
            },
            {
                "maxscore": 14,
                "event": {
                    "type": "score_id",
                    "message": "Moderate"
                },
                "fact": "mental_health_condition",
                "path": ".score"
            },
            {
                "maxscore": 9,
                "event": {
                    "type": "score_id",
                    "message": "Mild"
                },
                "fact": "mental_health_condition",
                "path": ".score"
            },
            {
                "maxscore": 4,
                "event": {
                    "type": "score_id",
                    "message": "None"
                },
                "fact": "mental_health_condition",
                "path": ".score"
            }
        ]
    }]
}`
  
  ruleie = `{
      conditions: {
          all: [{
                  fact: 'sore-throat',
                  operator: 'lessThanInclusive',
                  value: 10,
                  path: '.soreThroatLevel'
              },
              {
                  fact: 'sore-throat',
                  operator: 'greaterThanInclusive',
                  value: 5,
                  path: '.soreThroatLevel'
              },
              {
                  fact: 'stuffy-nose',
                  operator: 'greaterThanInclusive',
                  value: 5,
                  path: '.stuffyNoseLevel'
              },
              {
                  fact: 'headache',
                  operator: 'greaterThanInclusive',
                  value: 6,
                  path: '.headacheLevel'
              },
              {
                  fact: 'has-fever',
                  operator: 'greaterThanInclusive',
                  value: 7,
                  path: '.feverLevel'
              }
          ]
      },
      event: {
          type: 'has-flu',
          params: {
              message: 'The current Patient has flu',
              recommendations: ['Drink a lot of water', 'Consume Vitamin C', 'Patient should Rest']
          }
      }
  }`
  constructor(public navCtrl: NavController) {

  }

}
