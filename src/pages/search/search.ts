import { Component } from '@angular/core';
import { PostService } from '../../providers/post-service';
import { NavController, LoadingController, ActionSheetController, NavParams, ModalController } from 'ionic-angular';
import { File, Camera, Transfer } from 'ionic-native';
import { DetailsPage } from '../details/details'
import { ConfigService } from '../../providers/config-service';
import { ModalWikiPage } from '../modal-wiki/modal-wiki';

declare var cordova: any;

// import { NavController } from 'ionic-angular';

@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchPage {
    searchQuery: string = '';
    items: any;

    imageChosen: any = 0;
    imagePath: any;
    imageNewPath: any;
    uploadedFileResponse: any;
    lang: string;
    plantType: string;
    wikiImgs: any;
  constructor(public navCtrl: NavController,
              private postservice: PostService,
              public actionSheet: ActionSheetController,
              private loadingCtrl: LoadingController,
              private configService: ConfigService,
              public params: NavParams,
              public modalCtrl: ModalController) {

  }
  ngOnInit(){
    this.getPosts();
    this.lang = this.configService.getOption('lang');
    // this.lang = this.params.get('lang');
    this.plantType = 'flower';
    this.wikiImgs = [];
    }
  getPosts = function(){
    this.postservice.getPosts().subscribe(response => {
          this.items = response;
        });
  }

getItems(ev: any) {

  let val = ev.target.value;
  this.postservice.getPosts().subscribe(response => {
        this.items = Object.assign([], response);
        if (val && val.trim() != '') {
              this.items = this.items.filter((item) => {
                return (item.name[this.lang].toLowerCase().indexOf(val.toLowerCase()) > -1 || item.keywords.indexOf(val.toLowerCase()) > -1);
              })
        }
      });

  console.log('filtered-->', this.items);
}
duplicatesPass(arr) {
	let dublicates = [];
	let arrLength = arr.length;
	let i = 0;
	arr.sort();
	while(i<arrLength) {
		if (dublicates.indexOf(arr[i]) == -1) {
			dublicates.push(arr[i]);
		}
		i++;
	}
	return dublicates;
  }

getFromWiki(gen) {
  this.postservice.getWikiImg(gen).subscribe(response => {
        let idNum = response.query.pages;
        console.log(idNum[Object.keys(response.query.pages)[0]]);
        let imgSource = response.query.pages[Object.keys(response.query.pages)[0]] && response.query.pages[Object.keys(response.query.pages)[0]].thumbnail ? response.query.pages[Object.keys(response.query.pages)[0]].thumbnail.source : null;
        this.wikiImgs.push({title:response.query.pages[Object.keys(response.query.pages)[0]].title,source:imgSource});
      });
}
getItemsExist(itemsToSeek) {

  let genArray = itemsToSeek.map(item => {
    return item.gen.toLowerCase();
  })
  console.log('genArray=->>', genArray);
  let arrayWithoutDup = this.duplicatesPass(genArray);
  console.log('arrayWithoutDup=->>', arrayWithoutDup);
  this.postservice.getPosts().subscribe(response => {
        this.items = Object.assign([], response);
        if (itemsToSeek && itemsToSeek.length) {
              this.items = this.items.filter((item) => {
                return (arrayWithoutDup.indexOf(item.gen.toLowerCase()) > -1);
              })
              console.log('filtered2-->', this.items);
        }
        if (itemsToSeek && itemsToSeek.length && this.items.length === 0) {
          console.log('there is no match');
          arrayWithoutDup.forEach(gen => {
            this.getFromWiki(gen);
          })
          // this.openModal({imgArray: this.wikiImgs});
        }
      });


}

uploadPhoto() {
    if (this.imageChosen==1) {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();

      let filename = this.imagePath.split('/').pop();
      let options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "image/jpeg"
      };


      const fileTransfer = new Transfer();
      // this.postservice.uploadMock().then((entry) => {
      fileTransfer.upload(this.imageNewPath, 'http://identify.plantnet-project.org/api/mupload',
        options).then((entry) => {
          this.uploadedFileResponse = Object.assign({},entry);
          // this.uploadedFileResponse.response = JSON.stringify(this.uploadedFileResponse.response);
          this.uploadedFileResponse.response = JSON.parse(this.uploadedFileResponse.response);
          console.log(this.uploadedFileResponse);
          this.imagePath = '';
          this.imageChosen = 0;
          loader.dismiss();
          let mapProp = this.uploadedFileResponse.response.map;
          let propInMap;
          for (let key in mapProp) {
            propInMap = key;
          }
          let imageName = this.uploadedFileResponse.response.map[propInMap];
          this.postservice.getVariants('weurope', this.uploadedFileResponse.response.base, imageName, this.plantType).subscribe(response2 => {
            this.getItemsExist(response2.results);
          })
        }, (err) => {
          alert(JSON.stringify(err));
        });
    } else {
      alert('Choose image for recognition');
    }

  }

  chooseImage() {

    let actionSheet = this.actionSheet.create({
      title: 'Choose Picture Source',
      buttons: [
        {
          text: 'Gallery',
          icon: 'albums',
          handler: () => {
            this.actionHandler(1);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.actionHandler(2);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }


  //}

  actionHandler(selection: any) {
    let options: any;

    if (selection == 1) {
      options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        // targetWidth: 500,
        // targetHeight: 500,
        saveToPhotoAlbum: false
      };
    } else {
      options = {
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        // allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        // targetWidth: 500,
        // targetHeight: 500,
        saveToPhotoAlbum: false
      };
    }

    Camera.getPicture(options).then((imgUrl) => {

      let sourceDirectory = imgUrl.substring(0, imgUrl.lastIndexOf('/') + 1);
      let sourceFileName = imgUrl.substring(imgUrl.lastIndexOf('/') + 1, imgUrl.length);
      sourceFileName = sourceFileName.split('?').shift();
      File.copyFile(sourceDirectory, sourceFileName, cordova.file.externalApplicationStorageDirectory, sourceFileName).then((result: any) => {
        this.imagePath = imgUrl;
        this.imageChosen = 1;
        this.imageNewPath = result.nativeURL;

      }, (err) => {
        alert(JSON.stringify(err));
      })

    }, (err) => {
      alert(JSON.stringify(err))
    });

  }

  choosePlantType() {

    let actionSheet = this.actionSheet.create({
      title: 'Choose Plant Type',
      buttons: [
        {
          text: 'Flower',
          icon: 'flower',
          handler: () => {
            this.plantType = 'flower';
          }
        },
        {
          text: 'Fruit',
          icon: 'logo-apple',
          handler: () => {
            this.plantType = 'fruit';
          }
        },
        {
          text: 'Leaf',
          icon: 'leaf',
          handler: () => {
            this.plantType = 'leaf';
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  openModal(array) {

    let modal = this.modalCtrl.create(ModalWikiPage, array);
    modal.present();
  }

  viewItem(item) {
    this.navCtrl.push(DetailsPage, {
      item: item
    })
  }
  refresh() {
    this.getPosts();
    this.lang = this.configService.getOption('lang');
    this.wikiImgs=[];
  }

}
