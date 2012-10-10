(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('twitter-text'), require('marked-bird-down'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['twitter-text', 'marked-bird-down'], factory);
    } else {
        // Browser globals
        root.birddown = factory(root.window.twttr.txt, root.marked_bird_down);
    }
}(this, function (twttr_txt, marked) {

    // taken from underscore, modified to fit.
    var defaults = function(options, dflt) {
        for (var prop in dflt) {
            if (options[prop] == null) options[prop] = dflt[prop];
        }
        return options;
    };

    var birddown = function(options) {
        if (!options) options = {};
        this.settings = defaults(options, {
            doublebrackets : true,
            doublebracketsUrlBase : '/',
            hashtagUrlBase : "https://twitter.com/#!/search?q=%23",
            cashtagUrlBase : "https://twitter.com/#!/search?q=%24",
            usernameUrlBase : "https://twitter.com/",
            listUrlBase : "https://twitter.com/",
            gfm : true,
            pedantic : false,
            sanitize : false

        })

    }
    var escapeMarkdown = function (str) {
        return str.replace(/([\*_{}\[\]\\])/g, function (whole_match, m1) {
            return '\\' + m1;
        });
    };
    var transformDoubleBrackets = function(str, settings) {
        // links without custom text
        var match, re = new RegExp('\\[\\[([^\\]]+)\\]\\]');
        while (match = re.exec(str)) {
            var before = str.substr(0, match.index)
            var after = str.substr(match.index + match[0].length)
            var text = match[1].replace(/_/g, ' ');
            var target = match[1].split('#');
            var pageid = encodeURIComponent(target[0]);
            var anchor = target.length > 1 ?
                '#' + encodeURIComponent(target.slice(1).join('#')):
                '';
            str = before +
                '[' + escapeMarkdown(text) + ']' +
                '(' + settings.doublebracketsUrlBase  + pageid + anchor + ')' +
                after;
        }
        return str;
    }

    birddown.prototype.parse = function(str) {
        var temp = str;
        if (this.settings.doublebrackets) {
            temp = transformDoubleBrackets(temp, this.settings);
        }
        temp = marked(temp, this.settings);
        temp =  twttr_txt.autoLinkUsernamesOrLists(temp, this.settings);
        temp =  twttr_txt.autoLinkHashtags(temp, this.settings);

        return temp;
    }

    return birddown;
}));
