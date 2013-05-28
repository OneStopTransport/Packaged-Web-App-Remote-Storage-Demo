
remoteStorage.defineModule('locations', function(privateClient, publicClient) {
  return {
    exports: {
      
      onChange: function (cb) {
             privateClient.on('change', cb);
           },
                   
      setLocation: function (coords) {
        console.log(coords);

        //rfc4122 version 4 compliant unique id generator
        // from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
         var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
        "3bce4931-6c75-41ab-afe0-2ec108a30860"  
     
        console.log(id);
        var store = {
          lat: coords.lat,
          lon: coords.lon,
        };
        console.log(JSON.stringify(store));

        return privateClient.storeObject('location', id, store);
      },
      getLocation: function () {
        return privateClient.getFile('locations.txt').then(function(obj) {
          return obj.data;
        });
      },
      
      listLocations: function () {
        return privateClient.getAll('');
      },

      removeLocation: privateClient.remove, 
      
    }
  };
});