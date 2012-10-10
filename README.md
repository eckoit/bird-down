bird-down
=========

Markdown augmented with twitter-text.

Bird-down is a crazy mix of markdown and twitter for all your markup needs!


# Example markup

## WikiLinks

```
[[Some_Link]] -> <a href="Some_Link">Some Link</a>
```

If you don't want the non-standard wiki-links, set the option doublebrackets to false.
You can prefix the href with the doublebracketsUrlBase option.


## Headers

```
# You need a space     ->    <h1>You need a space</h1>
```
Notice that for headers you must have a space after the hash. This is non-standard, but allows for the next rule.


## Topics

```
#SomeTopic       ->   <a href="SomeTopic">#SomeTopic</a>
```

This is a Twitter hashtag. You can prefix the href generated with the hashtagUrlBase option.

## Mentions

```
@eckoit   -> @<a href="eckoit">eckoit</a>
```

This is a twitter mention. You can prefix the href generated with the usernameUrlBase option.


## Markdown

The rest of the markdown rules apply. See http://daringfireball.net/projects/markdown/

You can set the following markdown options:

```
            gfm : true,
            pedantic : false,
            sanitize : false
```

See https://github.com/eckoit/marked-bird-down#options


# Usage

### AMD

```
jam install bird-down
```

```
define(['bird-down'], function(birddown){
        var bd = new birddown();
})
```

### Node

```
npm install bird-down
```

```
var birddown = require('bird-down');
var bd = new birddown();
```

### Set Options


```
        var bd = new birddown({
            doublebrackets : true,
            doublebracketsUrlBase : '#/topics/',
            hashtagUrlBase : "#/topics/",
            cashtagUrlBase : "https://twitter.com/#!/search?q=%24",
            usernameUrlBase : "#/person/",
            listUrlBase : "https://twitter.com/",
        });


```



