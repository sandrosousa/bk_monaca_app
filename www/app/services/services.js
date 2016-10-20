angular.module('starter.services', [])


.factory('LoginService', function ($q, $http) {
    return {
        loginUser: function (form_logindata) {
            var deferred = $q.defer(),
                promise = deferred.promise;
        
            $http({
                method: "post",
                url: 'http://www.mapmygpx.com/mvc/json/mobile_login.php',
                data: JSON.stringify({
                     post_email: form_logindata.u_email.toLowerCase(),
                     post_password: form_logindata.u_password
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            .success(function (data) {
                window.localStorage = undefined;
                if (data.success == "1"){ 
                    window.localStorage.setItem("isLoggedIn", "true");
                    window.localStorage.setItem("mapmygpx_email", data.reply_email);
                    window.localStorage.setItem("mapmygpx_userName" , data.reply_username);
                    window.localStorage.setItem("mapmygpx_userID" , data.reply_userID);
                    window.localStorage.setItem("mapmygpx_token" , data.reply_token);
                    console.log("User login successful: " + JSON.stringify(data));
                    deferred.resolve(data);
                }
                else if (data.success == "0") {
                    window.localStorage.setItem("isLoggedIn", "false");
                    //window.localStorage.setItem("mapmygpx_email", "");
                    window.localStorage.setItem("mapmygpx_userName" , "");
                    window.localStorage.setItem("mapmygpx_userID" , "");
                    window.localStorage.setItem("mapmygpx_token" , "");
                    console.log("User login fail: " + JSON.stringify(data));
                    deferred.reject(data);
                }
            })
            .error(function (data, status, header, config) {            
                    var error = {msg: "Post error! Data: " + data +
                    " -Status: " + status};/* +
                    "<hr />headers: " + header +
                    "<hr />config: " + JSON.stringify(config);*/
                    console.log("Post error: " + error.msg); 
                    deferred.reject(error);
            });
                    
            promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
            };
            promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
            };
            return promise;
    
        }};
    
})

.factory('TracksSrv', function($q, $http) {
  // Might use a resource here that returns a JSON array

  var tracks = [{
    track_id: "", 
    userfo_id: "", 
    track_date_start: "", 
    track_name: "", 
    track_km: "", 
    track_dificulty: "", 
    track_country: "", 
    track_province: "", 
    track_city: ""  
  }];

  return {
    getAllTracks: function() {
         var deferred = $q.defer(),
             promise = deferred.promise;
        
            $http({
                method: "post",
                url: 'http://www.mapmygpx.com/mvc/json/mobile_get_tracks.php',
                data: JSON.stringify({
                     post_userID:  window.localStorage.getItem("mapmygpx_userID"),
                     post_token: window.localStorage.getItem("mapmygpx_token")
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            .success(function (data) {
                if (data.success == "1"){ 
                    //console.log("User Tracks: " + JSON.stringify(data.reply_tracks));
                    tracks = data.reply_tracks;
                    deferred.resolve(data.reply_tracks);
                }
                else if (data.success == "0") {
                    console.log("Error query tracks: " + JSON.stringify(data));
                    deferred.reject(data);
                }
                 
            })
            .error(function (data, status, header, config) {            
                    var error = {msg: "Post error! Data: " + data +
                    " -Status: " + status};/* +
                    "<hr />headers: " + header +
                    "<hr />config: " + JSON.stringify(config);*/
                    console.log("Post error: " + error.msg); 
                    deferred.reject(error);
            });    
            promise.success = function (fn) {
                    promise.then(fn);
                    return promise;
            };
            promise.error = function (fn) {
                    promise.then(null, fn);
                    return promise;
            };
            return promise;
    },
    remove: function(track) {
      tracks.splice(tracks.indexOf(track), 1);
    },
    getDetail: function(trackid) {
      for (var i = 0; i < tracks.length; i++) {
        if (tracks[i].track_id === trackid) {
          return tracks[i];
        }
      }
      return null;
    }
  };
})

;
