navigator
=========

javascript hash routing library for requirejs

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
