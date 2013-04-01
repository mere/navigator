define([], function () {

    var hasListener = window.addEventListener<<0;
    var hasPopState = window.onpopstate<<1;

    var listener =  ['addEventListener','attachEvent'][hasListener]
      , loadEvent = ["onload", "load"][hasListener]
      , stateChangeEvent = ["onhashchange", "popstate"][hasPopState]
      , registry = {}

    function on(event, callback){
        if (!registry[event]) {
            var hash = event
                .replace(/:\w+/g, '([^\\/]+)')
                .replace(/\//g, '\\/')
              , hashRegExp = new RegExp('^' + hash + '$')
            
            registry[event] = {
                name: event,
                regexp : hashRegExp,
                listeners : []
            }
            //console.log("adding", registry[event])
        }
        registry[event].listeners.push(callback);
    }

    function off(event, callback){
        if ( event == "*" ) { registry = {}; return this; }
        if ( event in registry == false  ) { return this; }
        
        var eventObj = registry[event]
          , index = eventObj.listeners.indexOf(callback)
        if (!~index) {return this;}
        eventObj.listeners.splice(index, 1);
        if (!eventObj.listeners.length) {
            delete eventObj;
        }
    }
    
    function trigger(eventObj, args){
        var listeners = eventObj.listeners
          , length = listeners.length

        for(var i = 0; i < length; i++){
            listeners[i].apply(this, args);
        }
    }

    function go(url) {
        if (url!=null) {
            location.hash = url
        }

        var hash = location.hash.split('#')[1]
        for (var key in registry){

            var map = registry[key]
              , match = hash.match(map.regexp)
              , numDynamicParams = map.name.split(":").length-1;

            if (match) {
                var args = numDynamicParams
                           ? match
                                .splice(1,numDynamicParams)
                                .concat(match[0])
                           : [match[0]]
                trigger(map, args)
            }
        }

        
    }

    // set up listeners:
    window[listener](loadEvent, go)
    window[listener](stateChangeEvent, go)

    return {
        on: on,
        off: off,
        go: go
    }
});