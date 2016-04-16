import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.startup(function() {
  GoogleMaps.load();
  Markers = new Mongo.Collection('markers');
  Db1 = new Mongo.Collection('db1');
  console.log("I'm loading!");
});

Template.body.helpers({
  mapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      console.log("I'm loaded!");
      return {
        center: new google.maps.LatLng(22.3163116,87.3040887),
        zoom: 17
      };
    }
  }

});

//var db = new Mongo().getDB("someDatabase");
//db.mycollection.drop()

Template.body.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('map', function(map) {
    // Add a marker to the map once it's ready
    console.log("I'm ready!");


//    google.maps.event.addListener(map.instance, 'click', function(event) {
    //var kumber = Math.random()*(330-50)+50;
    //var number = Math.random()*10;
  //  var i;
  //  if (number > 5){
    //  i = "true";
  //  }
//    else{
  //    i = "false";
  //  }
  //  Markers.insert({ _id:kumber.toString() , sensorid: kumber, groupno: 5 ,lat: event.latLng.lat(), lng: event.latLng.lng(), entered: true, title: kumber.toString() });
//    });

//    var marker = new google.maps.Marker({
//      position: map.options.center,
//      map: map.instance,
//      title: '16 mins more',
//      icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
//  });

    var markers = {};

    Markers.find().observe({
      added: function(document) {
        // Create a marker for this document
        if (document.entered!=true){
        var marker = new google.maps.Marker({
          draggable: false,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(document.lat, document.lng),
          map: map.instance,
          title:document.title,
          id: document._id,
          icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          // We store the document _id on the marker in order
          // to update the document within the 'dragend' event below.
        });
      }
      else {
        var marker = new google.maps.Marker({
          draggable: false,
          animation: google.maps.Animation.DROP,
          position: new google.maps.LatLng(document.lat, document.lng),
          map: map.instance,
          title:document.title,
          id: document._id,
          icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          // We store the document _id on the marker in order
          // to update the document within the 'dragend' event below.
        });
      }

        //Markers.update(marker.id, { $set: { entered : false }});

        // This listener lets us drag markers on the map and update their corresponding document.
        google.maps.event.addListener(marker, 'click', function(event) {
            console.log("event entered");
          if(document.entered!=false){
          console.log("false entered!");
          Markers.update(document._id, { $set: { entered : false }});
          this.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function(){ marker.setAnimation(null); }, 750);
          this.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
          }
          else {
            console.log("true entered!");
            Markers.update(marker.id, { $set: { entered : true }});
            this.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){ marker.setAnimation(null); }, 750);
            this.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')

            }
        });

        // Store this marker instance within the markers object.
//        markers[document._id] = marker;
  //    },
//      changed: function(newDocument, oldDocument) {/
  ///      markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
//      },
  //    removed: function(oldDocument) {
        // Remove the marker from the map
    //    markers[oldDocument._id].setMap(null);

       // Clear the event listener
  //      google.maps.event.clearInstanceListeners(
    //      markers[oldDocument._id]);
        // Remove the reference to this marker instance
      //  delete markers[oldDocument._id];
      }
    });

  });
});
