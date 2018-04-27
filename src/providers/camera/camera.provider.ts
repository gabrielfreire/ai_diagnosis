import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraProvider {

  constructor(private camera: Camera) {}

  getPictureFromCamera(): Promise<any> {
    return this.getImage(this.camera.PictureSourceType.CAMERA);
  }

  private getImage(pictureSourceType, quality = 50, saveToPhotoAlbum = false): Promise<any> {
    const options: CameraOptions = {
      quality,
      saveToPhotoAlbum,
      sourceType: pictureSourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG
    };
    return this.camera.getPicture(options);
  }

}
