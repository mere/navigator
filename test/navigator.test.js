define(["navigator"], 
    function(navigator){
        
        describe('Navigator', function(){       
            describe('should handle static paths', function(){
                
                beforeEach(function(){
                    navigator.off("*")
                })

                it('should register foo', function(done){
                    navigator.on("foo", function(){
                        done()
                    })
                    window.location.hash="foo"
                    navigator.go()
                })

                it('should register foo/bar', function(done){
                    navigator.on("foo/bar", function(){
                        done()
                    })
                    window.location.hash="foo/bar"
                    navigator.go()
                })

                it('foo/bar should not trigger foo', function(){
                    navigator.on("foo", function(){
                        throw new Error("foo/bar should not trigger foo")
                    })

                    window.location.hash="foo/bar"
                    navigator.go()
                })

                it('should unregister foo/bar', function(){
                    var callback = function(){
                        throw new Error("this should not be triggered")
                    }
                    
                    navigator.on("foo", callback)
                    navigator.off("foo", callback)
                    window.location.hash="foo"
                    navigator.go()
                })

                it('should not unregister all listeners', function(){
                    var callback1 = function(){
                        throw new Error("this should not be triggered")
                    }
                    var callback2 = function(){
                        callback2.called = true
                    }
                    navigator.on("foo", callback1)
                    navigator.on("foo", callback2)
                    navigator.off("foo", callback1)
                    window.location.hash="foo"
                    navigator.go()
                    expect(callback2.called).to.be.true
                })

            })

            describe('should handle dynamic paths', function(){
                
                beforeEach(function(){
                    navigator.off("*")
                })

                it('should register :foo', function(done){
                    navigator.on(":foo", function(foo){
                        expect(foo).to.be.equal("bob")
                        done()
                    })
                    window.location.hash="bob"
                    navigator.go()
                })

                it('should register :foo/:bar', function(done){
                    navigator.on(":foo/:bar", function(foo, bar){
                        expect(foo).to.be.equal("hello")
                        expect(bar).to.be.equal("world")
                        done()
                    })
                    window.location.hash="hello/world"
                    navigator.go()
                })

                it('should register composite paths, eg.: foo/:bar/wee', function(done){
                    navigator.on("foo/:bar/wee", function(foo){
                        expect(foo).to.be.equal("world")
                        done()
                    })
                    window.location.hash="foo/world/wee"
                    navigator.go()
                })

                it(':foo/:bar should not trigger :foo', function(){
                    navigator.on(":foo", function(){
                        throw new Error("this should not be triggered")
                    })

                    window.location.hash="hello/world"
                    navigator.go()
                })

                it('should unregister foo/:bar', function(){
                    var callback = function(){
                        throw new Error("this should not be triggered")
                    }
                    
                    navigator.on("foo/:bar", callback)
                    navigator.off("foo/:bar", callback)
                    window.location.hash="foo/hello"
                    navigator.go()
                })

                it('should not unregister all listeners', function(){
                    var callback1 = function(){
                        throw new Error("this should not be triggered")
                    }
                    var callback2 = function(){
                        callback2.called = true
                    }
                    navigator.on(":foo", callback1)
                    navigator.on(":foo", callback2)
                    navigator.off(":foo", callback1)
                    window.location.hash="hello"
                    navigator.go()
                    expect(callback2.called).to.be.true
                })

            })

            describe('edge cases', function(){
                
                beforeEach(function(){
                    navigator.off("*")
                })

                it('off("foo/bar") with no handler param should unregister all listeners for foo/bar', function(){
                    var callback1 = function(){
                        throw new Error("this should not be triggered")
                    }
                    var callback2 = function(){
                        throw new Error("this should not be triggered")
                    }
                    navigator.on(":foo", callback1)
                    navigator.on(":foo", callback2)
                    navigator.off(":foo")
                    window.location.hash="hello"
                    navigator.go()
                    
                })
                it('should handle /', function(){
                    var fail = function(){
                        throw new Error("this should not be triggered")
                    }
                    var pass = function(){
                        pass.called = true;
                    }
                    navigator.on(":foo", fail)
                    navigator.on("foo", fail)
                    navigator.on(":foo/bar", fail)
                    navigator.on("bar/:foo", fail)
                    navigator.on("/", pass)

                    window.location.hash="/"
                    navigator.go()
                    expect(pass.called).to.be.true
                })

                it('off("*") should unregister all listeners', function(){
                    var fail = function(){
                        throw new Error("this should not be triggered")
                    }
                    
                    navigator.on(":foo", fail)
                    navigator.on("foo", fail)
                    navigator.on(":foo/bar", fail)
                    navigator.on("foo/:foo", fail)

                    navigator.off("*")
                    window.location.hash="/"
                    navigator.go()
                    window.location.hash="foo"
                    navigator.go()
                    window.location.hash="foo/bar"
                    navigator.go()
                })

                it('on("*", handler) should be triggerd on any url change', function(){
                    var pass = function(){
                        pass.numCalled++;
                    }
                    pass.numCalled = 0;
                    
                    navigator.on("*", pass)
                    navigator.go("foo")
                    navigator.go("foo/bar")
                    navigator.go("foo/bar/x")
                    navigator.go("foo/bar/x")
                    expect(pass.numCalled).to.be.equal(4)
                })
            })

            describe('setting the URL', function(){
                
                beforeEach(function(){
                    navigator.off("*")
                })

                it('.go("foo/bar") should set the correct url', function(){
                    navigator.go("foo/bar")
                    expect(window.location.hash).to.be.equal("#foo/bar")
                })

                it('go("hello/world") should trigger the right listeners', function(){
                    navigator.on("hello/:bar", function(bar){
                        expect(bar).to.be.equal("world")  
                    })
                    navigator.on(":foo", function(){
                        throw new Error("this should not be triggered")
                    })
                    navigator.go("foo/bar")
                    
                })

            })


        })
})