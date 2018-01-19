import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  dataie: string = `{
      "Questions": {
          "flu": [{
                  "key": "firstName",
                  "label": "First name",
                  "value": "",
                  "type": "text",
                  "required": true,
                  "order": 1,
                  "visibility": "visible",
                  "controlType": "textbox"
              },
              {
                  "key": "lastName",
                  "label": "Last name",
                  "value": "",
                  "type": "text",
                  "required": false,
                  "order": 2,
                  "visibility": "visible",
                  "controlType": "textbox"
              },
              {
                  "key": "age",
                  "label": "Age",
                  "value": "",
                  "type": "number",
                  "required": false,
                  "order": 3,
                  "visibility": "visible",
                  "controlType": "textbox"
              },
              {
                  "key": "soreThroatLevel",
                  "label": "Sore Throat [from 1 to 10]",
                  "value": "",
                  "type": "number",
                  "required": false,
                  "order": 4,
                  "visibility": "visible",
                  "controlType": "textbox"
              },
              {
                  "key": "stuffyNoseLevel",
                  "label": "Stuffy Nose [from 1 to 10]",
                  "value": "",
                  "type": "number",
                  "required": false,
                  "order": 5,
                  "visibility": "visible",
                  "controlType": "textbox"
              },
              {
                  "key": "headacheLevel",
                  "label": "Headache strenght [from 1 to 10]",
                  "value": "",
                  "type": "number",
                  "required": false,
                  "order": 6,
                  "visibility": "visible",
                  "controlType": "textbox"
              },
              {
                  "key": "feverLevel",
                  "label": "How strong is your Fever? [from 1 to 10]",
                  "value": "",
                  "type": "number",
                  "required": false,
                  "order": 8,
                  "visibility": "hidden",
                  "controlType": "textbox"
              },
              {
                  "key": "hasfever",
                  "label": "Do you feel fever?",
                  "value": false,
                  "type": "toggle",
                  "required": false,
                  "visibility": "visible",
                  "order": 7,
                  "event": {
                      "target": "feverLevel"
                  },
                  "controlType": "toggle"
              }
          ]
      }
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
