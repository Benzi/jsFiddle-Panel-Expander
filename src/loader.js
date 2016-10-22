var script = document.createElement('script');
var tag = document.getElementsByTagName('script')[0];
script.src = '//cdn.rawgit.com/requirejs/requirejs/master/require.js';
script.setAttribute('data-main', chrome.extension.getURL('main.js'));
tag.parentNode.insertBefore(script, tag);
