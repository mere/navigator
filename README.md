navigator
=========
javascript hash routing library for requirejs

![navigator](http://cdn1.iconfinder.com/data/icons/crystalproject/128x128/apps/starthere.png)


## usage
Set up listeners using `on()`:
```javascript
define(["navigator"], function(navigator) {
        navigator
            .on("person/:id", function(id){ ... }) // eg.: `http://yourSite/#person/5`
            .on("person/:id/news", function(id){ ... }) // eg.: `http://yourSite/#person/5/news`
            .on("people/:tag/:page", function(tag, page){ ... }) // eg.: `http://yourSite/#person/5/3`
            .on("/", function(){ ... }) // `http://yourSite/`
            .on("login", myLoginFunction) // `http://yourSite/login`
    })
```

Unregister listeners using `off()`:
```javascript
    navigator
        .off("login", myLoginFunction)
    })
```

change the url hash using `go()`
```javascript
    navigator
        .go("person/5") // will change the url to `http://yourSite/#person/5`
    })
```


## FAQ

 - __Q:__ Ok, I set up my routers, and they all get triggered fine when the URL changes.

  How do I trigger them on the current URL?
  
  __A:__: Simply call `go()` after you've set up the listeners:
```javascript
define(["navigator"], function(navigator) {
    navigator
        .on("person/:id", function(id){ ... }) 
        .on("person/:id/news", function(id){ ... })
        .go()
})
```

 - __Q:__ I am reusing a function for multiple routes.

  How do I know which route triggered my method?
  
  __A:__ your method is called with the hash route param, even if it's static:
  ```javascript
define(["navigator"], function(navigator) {
    
    navigator
        .on("login", handleRoute) 
        .on("logout", handleRoute)
        .go()
        
    function handleRoute(route) {
        switch (route) {
            case "login": ...
            case "logout": ...
        }
    }
})
```

