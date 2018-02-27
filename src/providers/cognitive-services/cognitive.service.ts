import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import keys from '../../utils/keys';
import {server} from '../../app/server.connection';
import 'rxjs/add/operator/map';

@Injectable()
export class CognitiveService {

    private fileTransfer: FileTransferObject;

    constructor(private http: Http, private transfer: FileTransfer) {
        this.fileTransfer = this.transfer.create();
    }

    analyzeImage(imageFilePath) {
        const uriBase = server.vision_url;
        const headers = new Headers();
        headers.append('Content-Type', 'application/octet-stream');
        headers.append('Ocp-Apim-Subscription-Key', keys.VISION_API_KEY);
    
        const options: FileUploadOptions = {
            fileKey: 'file',
            httpMethod: 'POST',
            mimeType: 'image/jpeg',
            headers
        };
        return this.fileTransfer.upload(imageFilePath, uriBase, options)
            .then(data => data.response)
            .then(res => {
            const resParse = JSON.parse(res);    
            return resParse.description.captions[0].text;
        }, error => {
            console.error(`ANALIZE IMAGE ERROR -> ${JSON.stringify(error)}`);
        });
    }
}