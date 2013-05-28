(function() {


  var form = document.getElementById('add-location-form');
  //location list placeholder
  var locations_dom = document.getElementById('location-list');

  function init() {

    remoteStorage.claimAccess('locations', 'rw').then(function() {
      remoteStorage.displayWidget('remotestorage-connect')
      remoteStorage.locations.listLocations().then(fillLocations);

      console.log("connected");

      remoteStorage.on('disconnect', function() {
        console.log("disconnect");
      });

      //handling the delete click
      locations_dom.addEventListener('click', function(event) {
        
        //Deleting a location
        //It could be also have been handled within the onChange function, the same way the 'adding' was. 
        if (event.target.tagName === 'SPAN') {
          parentID = event.target.parentNode.id;
          deleteID = parentID.replace("location-row-", "");
          var item = document.getElementById(parentID);
          locations_dom.removeChild(item);
          remoteStorage.locations.removeLocation(deleteID);
        }
      });

      form.addEventListener('submit', function(event) {
        //preventing submit
        event.preventDefault();
        console.log("Adding new coords:" + JSON.stringify(coords));
        //assuring coords exists:
        if (coords) {
          remoteStorage.locations.setLocation(coords);
        }

        remoteStorage.locations.onChange(function(event) {

          // When there are changges in the remote storage, such as add or remove, the onChange event is triggered 
          // those events can be handled here. An example of how to handle a new value added to the storage is show bellow
          
          //adding a new location to the list
          if (event.newValue && (!event.oldValue)) {
            //adding a new row to the list

            var domID = "location-row-" + event.relativePath;
            console.log("add");
            var newRow = document.getElementById(domID);

            if (!newRow) {
              newRow = document.createElement('li');
              newRow.id = domID;
              locations_dom.appendChild(newRow);
              newRow.appendChild(document.createTextNode("Latitude:" + event.newValue.lat + " Longitude:" + event.newValue.lon)); //this will do some html escaping
              newRow.innerHTML += ' <span title="Delete" style="cursor:pointer"> X</span>';
            }
          }
          //deleting         
          else if ((!event.newValue) && event.oldValue) {
            //this comment was left here so it onChange behaviour can be easily checked when an item is deleted
            console.log("remove");
          }
        });
      });
    });
  }

  //Getting the previously stored locations 
  function fillLocations(location_list) {
    
    for (var id in location_list) {
      var domID = "location-row-" + id;
      var newRow = document.getElementById(domID);
      if (!newRow) {
        newRow = document.createElement('li');
        newRow.id = domID;
        locations_dom.appendChild(newRow);
      }
      newRow.appendChild(document.createTextNode("Latitude:" + location_list[id].lat + " Longitude:" + location_list[id].lon));
      newRow.innerHTML += ' <span title="Delete" style="cursor:pointer"> X</span>';

    }
  }
  document.addEventListener('DOMContentLoaded', init);

})();
