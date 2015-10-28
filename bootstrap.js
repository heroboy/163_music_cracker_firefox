var Cc = Components.classes;
var Ci = Components.interfaces;

function makeURI(aURL, aOriginCharset, aBaseURI) {
	var ioService = Components.classes["@mozilla.org/network/io-service;1"]
					.getService(Components.interfaces.nsIIOService);
	return ioService.newURI(aURL, aOriginCharset, aBaseURI);
}

var core_url = 'https://cdn.rawgit.com/Chion82/163_music_cracker/bc1154f085bbc39e2d028a499de4e7317dabcfa2/core.js';
var playlist_url = 'https://cdn.rawgit.com/Chion82/163_music_cracker/d3696029a4b6677cb978d097a59b6e12b86489b3/pt_content_playlist.js';
var http_obs = {
	observe: function(subject,topic,data){
		var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
		var uri = httpChannel.URI;
		var host = uri.host.toLowerCase();
		if (/^[0-9a-z]+\.music\.126\.net$/.test(host))
		{
			if (uri.path.indexOf("core.js") >= 0)
			{
				var new_uri = makeURI(core_url,null,null);
				httpChannel.redirectTo(new_uri);
			}
			else if (uri.path.indexOf("pt_content_playlist.js") >= 0)
			{
				var new_uri = makeURI(playlist_url,null,null);
				httpChannel.redirectTo(new_uri);
			}
		}
	}
};

function startup(data, reason) {
	var observerService = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
	observerService.addObserver(http_obs, "http-on-modify-request", false);
}
function shutdown(data, reason) {
	var observerService = Cc["@mozilla.org/observer-service;1"].getService(Ci.nsIObserverService);
	observerService.removeObserver(http_obs, "http-on-modify-request");
}
function install(data, reason) {
	
}
function uninstall(data, reason) {
   
}
