import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { InternetConnectionService } from '../../providers/internet-connection-service';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapInitialised: boolean = false;
  apiKey: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public internetconnectionservice: InternetConnectionService) {
    this.loadGoogleMaps();
    this.apiKey = 'AIzaSyCa8mfrfuXo8WXBiXYKFA9IF7pxbOZGwRk';
  }

  loadGoogleMaps () {
    this.addConnectionListener();

    if (typeof google == 'undefined' || typeof google.maps == 'undefined') {
      console.log('Google maps needs to be loaded.');
      this.disableMap();

      if (this.internetconnectionservice.isOnline()) {
          console.log('Online, loading map');

          //Load SDK
          window['mapInit'] = () => {
            this.initMap();
            this.enableMap();
          }

          let script = document.createElement('script');
          script.id = 'googleMaps';
          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey;
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit'
          }

          document.body.appendChild(script);
      }
    } else {
      if (this.internetconnectionservice.isOnline()) {
        console.log('Showing map');
        this.initMap();
        this.enableMap();
      } else {
        console.log('Disabling map');
        this.disableMap();
      }
    }
  }

  initMap () {
    this.mapInitialised = true;
    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });
  }

  disableMap () {
    console.log('disable map');
  }

  enableMap () {
    console.log('enable map');
  }

  addConnectionListener () {
    let onOnLine = () => {
      setTimeout(() => {
        if (typeof google == 'undefined' || typeof google.maps == 'undefined') {
          this.loadGoogleMaps();
        } else {
          if (!this.mapInitialised) {
            this.initMap();
          }
          this.enableMap();
        }
      }, 2000);

    };

    let onOffLine = () => {
      this.disableMap();
    };

    document.addEventListener('online', onOnLine, false);
    document.addEventListener('offline', onOffLine, false);
  }

  addMarker () {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this. map.getCenter()
    });

    let content = "<h4>Cought!</h4>";
    this.addInfoWindow(marker, content);
  }

  addInfoWindow (marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    })

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    })
  }

}
