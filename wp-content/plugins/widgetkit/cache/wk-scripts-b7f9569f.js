angular.module("Fields",[]).directive("fieldMedia",["mediaPicker","mediaInfo",function(e,t){function i(i){var a=this;a.selectMedia=function(){e.select().then(function(e){i.media=e.url,i.height=e.height,i.width=e.width,i.title||(i.title=String(e.title).replace(/(-|_)/g," ").replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,function(e){return e.toUpperCase()}))})},a.selectPoster=function(){e.select().then(function(e){i.options||(i.options={}),i.options.poster=e.url})},a.isVideo=function(e){return!(!e||!(e.match(/\.(mp4|ogv|webm)$/)||e.match(/(\/\/.*?)vimeo\.[a-z]+\/(?:\w*\/)*(\d+)/i)||e.match(/(\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)(.*)/i)||e.match(/(\/\/.*?youtu\.be)\/([^\?]+)(.*)/i)))},i.$watch("media",function(){return(!i.options||angular.isArray(i.options))&&(i.options={}),n[i.media]?(i.options.width=n[i.media].width,void(i.options.height=n[i.media].height)):void t(i.media,!0).then(function(e){i.height="",i.width="",e.type&&(i.options.width=e.width,i.options.height=e.height,n[i.media]=e)})},!0)}var n={};return{scope:{media:"=",options:"=?",title:"=?"},restrict:"E",controller:["$scope",i],controllerAs:"vm",template:'<div>                              <div class="uk-flex">                                  <div class="uk-form-icon uk-flex-item-1 uk-margin-small-right">                                    <i class="uk-icon-photo"></i><input class="uk-width-1-1" ng-model="media">                                  </div>                                  <button class="uk-button" ng-click="vm.selectMedia()">Select</button>                              </div>                              <div class="uk-grid uk-margin-top">                                  <div class="uk-width-small-1-2">                                        <media-preview src="{{ media }}"></media-preview>                                  </div>                                  <div class="uk-width-small-1-2" ng-show="vm.isVideo(media)">                                    <div class="uk-margin-small-bottom" ng-show="options.poster"><media-preview src="{{ options.poster }}"></media-preview></div>                                    <a ng-click="vm.selectPoster()">Select Poster</button>                                    <a class="uk-margin-small-left" ng-show="options.poster" ng-click="(options.poster = \'\')">Reset</a>                                  </div>                              </div>                           </div>'}}]).directive("fieldLocation",["$timeout","$q",function(e,t){var i=0,n=function(){var e,i=function(){if(!e){e=t.defer();var i=document.createElement("script");i.async=!0,i.onload=function(){google.load("maps","3",{other_params:"sensor=false&libraries=places",callback:function(){google&&google.maps.places&&e.resolve()}})},i.onerror=function(){alert("Failed loading google maps api.")},i.src="https://www.google.com/jsapi",document.getElementsByTagName("head")[0].appendChild(i)}return e.promise};return i}();return{restrict:"EA",require:"?ngModel",scope:{latlng:"@"},replace:!0,template:'<div>                                <div class="uk-form uk-form-icon uk-margin-small-bottom uk-width-1-1">                                    <i class="uk-icon-search"></i><input class="uk-width-1-1">                                </div>                                <div class="js-map" style="min-height:300px;">                                 Loading map...                                 </div>                                 <div class="uk-text-small uk-margin-small-top">LAT: <span class="uk-text-muted">{{ latlng.lat }}</span> LNG: <span class="uk-text-muted">{{ latlng.lng }}</span></div>                            </div>',link:function(t,a,o,l){function s(e){l.$setViewValue(e),t.latlng=e,t.$root.$$phase||t.$apply()}n().then(function(){e(function(){var e,n,o,r,c="wk-location-"+ ++i,u=new google.maps.LatLng(53.55909862554551,9.998652343749995);t.latlng=l.$viewValue||{lat:u.lat(),lng:u.lng()},a.find(".js-map").attr("id",c),e=new google.maps.Map(document.getElementById(c),{zoom:6,center:u}),n=new google.maps.Marker({position:u,map:e,draggable:!0}),google.maps.event.addListener(n,"dragend",function(){var e=n.getPosition();s({lat:e.lat(),lng:e.lng()}),o.value=""}),jQuery.UIkit.$win.on("resize",function(){google.maps.event.trigger(e,"resize"),e.setCenter(n.getPosition())}),o=a.find("input")[0],r=new google.maps.places.Autocomplete(o),r.bindTo("bounds",e),google.maps.event.addListener(r,"place_changed",function(){var t=r.getPlace();if(t.geometry){t.geometry.viewport?e.fitBounds(t.geometry.viewport):e.setCenter(t.geometry.location),n.setPosition(t.geometry.location),o.value="";var i=n.getPosition();s({lat:i.lat(),lng:i.lng()})}}),google.maps.event.addDomListener(o,"keydown",function(e){13==e.keyCode&&e.preventDefault()}),l.$render=function(){try{if(l.$viewValue&&l.$viewValue.lat&&l.$viewValue.lng){var t=new google.maps.LatLng(l.$viewValue.lat,l.$viewValue.lng);n.setPosition(t),e.setCenter(t)}else s({lat:n.getPosition().lat(),lng:n.getPosition().lng()})}catch(i){}},l.$render()})})}}}]).factory("Fields",function(){var e={text:{label:"Text",template:function(e,t){var i=angular.element('<input class="uk-width-1-1" type="text"  ng-model="'+e+'">').attr(t.attributes||{});return t&&t.icon&&(i=i.wrap('<div class="uk-form-icon uk-width-1-1"></div>').before('<i class="uk-icon-'+t.icon+'"></i>').parent()),i}},textarea:{label:"Textarea",template:function(e,t){return angular.element('<textarea id="wk-content" class="uk-width-1-1" ng-model="'+e+'" rows="10"></textarea>').attr(t.attributes||{})}},tags:{label:"Tags",template:function(e,t){return angular.element('<div class="uk-form-icon uk-width-1-1"><i class="uk-icon-tags"></i><input class="uk-width-1-1" type="text" ng-list ng-model="'+e+'" placeholder="tag, tag, ..."></div><div>').find("input").attr(t.attributes||{}).parent()}},"boolean":{label:"Boolean",template:function(e,t){return angular.element('<input type="checkbox" ng-model="'+e+'">').attr(t.attributes||{})}},media:{label:"Media",template:function(e,t){return'<field-media media="'+e+'"></field-media>'}},location:{label:"Location",template:function(e,t){return'<field-location  ng-model="'+e+'"></field-location>'}}};return{register:function(t,i){e[t]=angular.extend({label:t,assets:[],template:function(){}},i)},exists:function(t){return e[t]?!0:!1},get:function(t){return e[t]},fields:function(){var t=[];return Object.keys(e).forEach(function(i){t.push({name:i,label:e[i].label})}),t}}}).directive("field",["$timeout","$compile","Fields",function(e,t,i){return{require:"?ngModel",restrict:"E",link:function(n,a,o,l){var s=function(){var e=angular.extend({},JSON.parse(o.options||"{}")),l=o.type||"text";if(i.exists(l)){var s,r=i.get(l);s=r.template(o.ngModel,e),s.then?s.then(function(e){t(a.html(e).contents())(n)}):t(a.html(s).contents())(n)}else t(a.html(i.get("text").template(o.ngModel)).contents())(n)};e(s)}}}]);

angular.module("widgetkit",["Application","ngResource","Fields"]).value("name","widgetkit").value("UIkit",jQuery.UIkit).factory("Content",["$resource","Application",function(e,t){return e(t.url("/content/:id"),{},{query:{method:"GET",responseType:"json"},save:{method:"POST",responseType:"json"}})}]).filter("supported",["Application",function(e){return function(t,i){return i?t.filter(function(t){var r=e.config.types[t.type],o=i.item.filter(function(e){return-1!==r.item.indexOf(e)?!0:void 0}).length;return o==i.item.length}):t}}]).filter("ucwords",["Application",function(e){return function(e){return e.replace(/(-|_)/g," ").replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,function(e){return e.toUpperCase()})}}]).service("mediaInfo",["Application","$q",function(e,t){return function(i,r){i=i||"";var o,n,a={url:i,type:"",src:i&&!i.match(/^(https?:)?\//)?e.baseUrl()+"/"+i:i,provider:null,image:e.config.images.placeholder,width:null,height:null};if(i.match(/\.(jpe?g|png|gif|svg)$/i)?(a.type="image",a.image=a.src):i.match(/\.(mp3|ogg|wav)$/)?(a.type="audio",a.image=e.config.images.audio):i.match(/\.(mp4|ogv|webm)$/)?(a.type="video",a.image=e.config.images.video):(o=/(\/\/.*?)vimeo\.[a-z]+\/(?:\w*\/)*(\d+)/i.exec(i))?(a.provider="vimeo",a.type="iframe",a.src="//player.vimeo.com/video/"+o[2],a.image=e.config.images.iframe):((o=/(\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)(.*)/i.exec(i))||(o=/(\/\/.*?youtu\.be)\/([^\?]+)(.*)/i.exec(i)))&&(a.provider="youtube",a.type="iframe",a.src="//www.youtube.com/embed/"+o[2]+o[3].replace(/^&/,"?"),a.image="//img.youtube.com/vi/"+o[2]+"/hqdefault.jpg"),r)switch(n=t.defer(),a.type){case"image":var u=new Image;u.onerror=function(){n.resolve(a)},u.onload=function(){a.width=u.width,a.height=u.height,n.resolve(a)},u.src=a.src;break;case"video":var c=angular.element('<video style="position:fixed;visibility:hidden;top:-10000px;"></video>').attr("src",a.src).appendTo("body"),s=setInterval(function(){c[0].videoWidth&&(clearInterval(s),a.width=c[0].videoWidth,a.height=c[0].videoHeight,c.remove(),n.resolve(a))},20);break;case"iframe":"vimeo"==a.provider&&jQuery.ajax({type:"GET",url:"http://vimeo.com/api/oembed.json?url="+encodeURI(a.url),jsonp:"callback",dataType:"jsonp",success:function(e){a.width=e.width,a.height=e.height,n.resolve(a)}}).fail(function(){n.resolve(a)}),"youtube"==a.provider&&jQuery.ajax({type:"GET",url:"http://query.yahooapis.com/v1/public/yql",data:{q:"select * from json where url ='http://www.youtube.com/oembed?url="+encodeURI(a.url)+"'",format:"json"},dataType:"jsonp",success:function(e){if(e&&e.query&&e.query.results&&e.query.results.json){var t=jQuery(e.query.results.json.html);a.width=t.attr("width"),a.height=t.attr("height")}n.resolve(a)}}).fail(function(){n.resolve(a)});break;default:n.resolve(a)}return r?n.promise:a}}]).factory("httpInterceptor",["$q","UIkit",function(e,t){return{responseError:function(i){var r;return r=i.data&&i.data.message?i.data.message:i.statusText,t.notify(r,"danger"),e.reject(i)}}}]).config(["$httpProvider","$sceProvider",function(e,t){e.interceptors.push("httpInterceptor"),t.enabled(!1)}]);

!function(t,e){angular.module("widgetkit").service("mediaPicker",["$location","$q","Application",function(t,e,i){function n(t){var e=document.createElement("a");return e.href=t,e}var a=new RegExp("^"+i.baseUrl());return{select:function(i){i=angular.extend({title:"Pick media",multiple:!1,button:{text:"Select"}},i);var r=e.defer(),o=wp.media(i).on("select",function(){var e=o.state().get("selection").map(function(e){var i=e.toJSON(),r=n(i.url);return r.host==t.host()&&(i.url=r.pathname.replace(a,"").replace(/^\//,"")),i});r.resolve(i.multiple?e:e[0])}).open();return r.promise}}}]),t(function(){t("body").on("click",".widgetkit-editor",function(i){i.preventDefault();var n,a=t(this);n=t(a.data("source")?"#"+a.data("source"):"textarea#content"),e.widgetkit.env.editor(n)}).on("click",".widgetkit-widget button",function(i){i.preventDefault();var n=t(this).nextAll("input"),a=t(this).closest("form").find(".widget-control-save");e.widgetkit.env.init("widget",JSON.parse(n.val()),function(t){n.val(JSON.stringify(t)),a.trigger("click")})}).find("[data-app]").addClass("wrap"),t(".widgetkit-editor[data-source]").each(function(){var e=t(this);t("#"+e.data("source")).addClass("uk-margin-small-top").before(e)})})}(jQuery,window);

!function(){var t=function(t,e){e=e||t,e.widgets=[],t.data&&t.data.widgets&&(t.search=sessionStorage["widgetkit.widgets.filter"]?JSON.parse(sessionStorage["widgetkit.widgets.filter"]):{name:"",data:{_widget:{name:""}}},t.$watch("search",function(){sessionStorage["widgetkit.widgets.filter"]=JSON.stringify(angular.copy(t.search))}),e.widgets.push({name:"",label:Translator?Translator.trans("All"):"All"}),Object.keys(t.data.widgets).forEach(function(n){e.widgets.push(t.data.widgets[n])}))},e=function(e,n,a,i){var d=this,o=window.localStorage||{};d.viewmode=o["wk.content.viewmode"]||"list",d.include="",t(e,d),d.previewContent=function(t){return e.$emit("wk.preview.content",t).preview||e.data.types[t.type].icon},d.createContent=function(t){e.content=t||{name:"",type:"",data:{_widget:{}}},e.widget=null,d.setView("contentConfig")},d.editContent=function(t,n){var a,i=null,o=e.data.widgets;return t=angular.copy(t),a=t.data._widget,t.id||(angular.extend(t.data,e.data.types[t.type].data),t.id="new"),o[a.name]?(i=angular.copy(o[a.name]),i.data=a.data=angular.extend({},i.settings,a.data),e.content=t,e.widget=i,void d.setView("contentEdit",n)):void d.createContent(t)},d.saveContent=function(){return"new"==e.content.id&&delete e.content.id,i.save({id:e.content.id},{content:e.content},function(t){d.editContent(e.data.content[t.id]=t),a.notify(t.name+" saved.","success")})},d.copyContent=function(t){return t=angular.copy(t),t.id="",t.name+=" (copy)",i.save({id:t.id},{content:t},function(t){e.data.content[t.id]=t,t.data._widget=angular.isArray(t.data._widget)?{}:t.data._widget,a.notify(t.name+" copied.","success")})},d.deleteContent=function(t){confirm("Are you sure?")&&i["delete"]({id:t.id},function(){delete e.data.content[t.id]})},d.getWidget=function(t){return e.data.widgets[t.data._widget.name]},d.selectWidget=function(t){var n=e.content.data;n._widget.name!=t.name&&(n._widget.name=t.name,n._widget.data={})},d.setView=function(t,n){d.view=t,n&&(d.include=n),e.$emit("wk.change.view",t)},d.setViewMode=function(t){d.viewmode=o["wk.content.viewmode"]=t},d.setView("content")};angular.module("widgetkit").controller("contentCtrl",["$scope","Application","UIkit","Content",function(t,n,a,i){var d=this;t.data=angular.extend({content:i.query(function(t){angular.forEach(t,function(t,e){"$"!==e[0]&&(t.data=angular.extend({_widget:{}},t.data),t.data._widget=angular.isArray(t.data._widget)?{}:t.data._widget)})})},n.config),d.name="contentCtrl",e.call(this,t,n,a,i)}]).controller("pickerCtrl",["$scope","Application","Content","UIkit",function(n,a,i,d){var o=this;n.data=angular.extend({},a.config),n.data.content=i.query(function(t){angular.forEach(t,function(t,e){"$"!==e[0]&&(t.data=angular.extend({_widget:{}},t.data),t.data._widget=angular.isArray(t.data._widget)?{}:t.data._widget)});var e=n.data.content[a.env.attrs.id];e&&"editor"==o.mode&&(o.editContent(e,"content"),o.mode="edit"),a.env.modal.show()}),o.name="pickerCtrl",o.mode=a.env.mode,t(n,o),o.active=function(t){return t.id==a.env.attrs.id},o.update=function(t){a.env.update({id:t.id,name:t.name})},o.cancel=function(){a.env.cancel()},e.call(this,n,a,d,i)}])}();

angular.module("widgetkit").directive("mediaPreview",["mediaInfo",function(e){function i(i){var r=this;r.type=function(){return i.media=e(i.src),i.media.type},r.cleanUrl=function(e){return"string"==typeof e&&(e=e.replace("autoplay=1","autoplay=0")),e}}return{restrict:"E",scope:{src:"@"},controller:["$scope",i],controllerAs:"vm",template:'<div ng-switch="vm.type()">                           <audio ng-switch-when="audio" ng-src="{{ media.src }}" controls="true" class="uk-responsive-width"></audio>                           <video ng-switch-when="video" ng-src="{{ media.src }}" controls="true" class="uk-responsive-width"></video>                           <iframe ng-switch-when="iframe" ng-src="{{ vm.cleanUrl(media.src) }}" frameborder="0" allowfullscreen="true" class="uk-responsive-width" width="800" height="600"></iframe>                           <img ng-switch-default ng-src="{{ media.src }}">                       </div>'}}]).directive("autofocus",["$timeout",function(e){var i=[];return{restrict:"A",link:function(r,t){i.push(t),e(function(){i[0][0].focus()})}}}]);

!function(t,e){function n(t){var n=e.tinymce.editors[t.attr("id")];return{getContent:function(){return n.getContent()},insertContent:function(t){n.execCommand("mceInsertContent",!1,t)},updateContent:function(t,e,o){var i=this.getContent();i=i.substring(0,e)+t+'<span id="tmp-wkid"></span>'+i.substring(o),n.setContent(i),n.selection.select(n.dom.select("#tmp-wkid")[0],!0),n.selection.collapse(!1),n.dom.remove("tmp-wkid",!1),n.focus()},getCursorPosition:function(){var t=n.selection.getBookmark(0),e="[data-mce-type=bookmark]",o=n.dom.select(e);n.selection.select(o[0]),n.selection.collapse();var i="######cursor######",r='<span id="'+i+'"></span>';n.selection.setContent(r);var s=n.getContent({format:"html"}),a=s.indexOf(r);return n.dom.remove(i,!1),n.selection.moveToBookmark(t),a}}}function o(t){return{getContent:function(){return t.val()},insertContent:function(e){this.updateContent(e,t.prop("selectionStart"),t.prop("selectionEnd"))},updateContent:function(e,n,o){var i=t.val(),r=n+e.length;i=i.substring(0,n)+e+i.substring(o),t.val(i),t[0].setSelectionRange(r,r),t.focus().trigger("change")},getCursorPosition:function(){return t.prop("selectionStart")}}}function i(t){var e=t.next()[0].CodeMirror;return{getContent:function(){return e.getValue()},insertContent:function(t){e.replaceRange(t,e.getCursor()),e.focus()},updateContent:function(t,n,o){e.replaceRange(t,this.translateOffset(n),this.translateOffset(o)),e.focus()},getCursorPosition:function(){return this.translatePosition(e.getCursor())},translatePosition:function(t){return e.getValue().split("\n",t.line).join("").length+t.line+t.ch},translateOffset:function(t){var n=e.getValue().substring(0,t).split("\n");return{line:n.length-1,ch:n[n.length-1].length}}}}function r(t){var n=e.ace.edit(t.parent().attr("id"));return{getContent:function(){return n.getValue()},insertContent:function(t){n.insert(t),n.focus()},updateContent:function(t,e,o){e=this.translateOffset(e),o=this.translateOffset(o);var i=n.getSelectionRange();i.setStart(e.row,e.column),i.setEnd(o.row,o.column),n.getSession().getDocument().replace(i,t),n.focus()},getCursorPosition:function(){return this.translatePosition(n.getSelection().getCursor())},translatePosition:function(t){return this.getContent().split("\n",t.row).join("").length+t.row+t.column},translateOffset:function(t){var e=this.getContent().substring(0,t).split("\n");return{row:e.length-1,column:e[e.length-1].length}}}}function s(e){var n=CKEDITOR.instances[e.attr("id")];return{getContent:function(){return n.getData()},insertContent:function(t){this.updateContent(t,this.getCursorPosition(),this.getCursorPosition())},updateContent:function(t,e,o){var i=n.getData();i=i.substring(0,e)+t+i.substring(o),n.setData(i)},getCursorPosition:function(){return"source"==n.mode?t(n.textarea.$).prop("selectionStart"):this.getCursorPositionInWYSIWYG()},getCursorPositionInWYSIWYG:function(){var t=n.getSelection().createBookmarks(),e="######cursor######",o='<span id="'+e+'">&nbsp;</span>',i=CKEDITOR.dom.element.createFromHtml(o);i.insertBefore(t[0].startNode);var r=this.getContent(),s=r.indexOf(o);return i.remove(),n.getSelection().selectBookmarks(t),s}}}var a={init:function(e,n,o){var i=t(this.tmpl).appendTo("body");this.mode=e,this.attrs=n,this.cb=o,this.modal=t.UIkit.modal(i),this.modal.on("hide.uk.modal",function(){i.remove()}),t.UIkit.domObserve(i,function(){var e=this;t.UIkit.domObservers.forEach(function(t){t(e)})}),angular.bootstrap(i,["widgetkit"])},editor:function(t){var a;a=(e.WFEditor||e.JContentEditor||e.tinyMCE)&&!t.is(":visible")?new n(t):e.CodeMirror?new i(t):e.ace?new r(t):e.CKEDITOR?new s(t):new o(t);for(var c,l,g=a.getContent(),d=a.getCursorPosition(),f=/\[widgetkit([^\]]*)\]/gi;l=f.exec(g);)if(l.index<=d&&f.lastIndex>d){c=l[0];break}this.init("editor",u.parse("widgetkit",c).attrs,function(t){var e=new u({tag:"widgetkit",attrs:t}).string();c?a.updateContent(e,l.index,f.lastIndex):a.insertContent(e)})},update:function(t){this.cb(t),this.modal.hide()},cancel:function(){this.modal.hide()},tmpl:'<div class="uk-modal"><div style="width: 800px;" class="uk-modal-dialog" ng-include="\'picker\'"></div></div>'},u=function(e){t.extend(this,{tag:"",attrs:{},type:"single",content:""},e)};t.extend(u,{parse:function(t,e){var n,o=this.regexp(t).exec(e),i={tag:t};return o&&(n=o[4]?"self-closing":o[6]?"closed":"single",i={tag:o[2],attrs:this.attrs(o[3]),type:n,content:o[5]}),new u(i)},attrs:function(t){var e,n=/(\w+)\s*=\s*"([^"]*)"(?:\s|$)|(\w+)\s*=\s*\'([^\']*)\'(?:\s|$)|(\w+)\s*=\s*([^\s\'"]+)(?:\s|$)|"([^"]*)"(?:\s|$)|(\S+)(?:\s|$)/g,o={};for(t=t.replace(/[\u00a0\u200b]/g," ");e=n.exec(t);)e[1]?o[e[1].toLowerCase()]=e[2]:e[3]?o[e[3].toLowerCase()]=e[4]:!e[5]||"true"!==e[6]&&"1"!==e[6]?!e[5]||"false"!==e[6]&&"0"!==e[6]?e[5]?o[e[5].toLowerCase()]=e[6]:e[7]?o[e[7]]=!0:e[8]&&(o[e[8]]=!0):o[e[5].toLowerCase()]=!1:o[e[5].toLowerCase()]=!0;return o},regexp:function(t){return new RegExp("\\[(\\[?)("+t+")(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)","g")}}),t.extend(u.prototype,{string:function(){var e="["+this.tag;return t.each(this.attrs,function(t,n){"boolean"==typeof n?e+=" "+t+"="+(n?1:0):""!==n&&(e+=" "+t+'="'+n+'"')}),"single"===this.type?e+"]":"self-closing"===this.type?e+" /]":(e+="]",this.content&&(e+=this.content),e+"[/"+this.tag+"]")}}),t(function(){t.extend(e.widgetkit,{env:a,shortcode:u})})}(jQuery,window);

angular.module("widgetkit").controller("folderCtrl",["$scope",function(e){}]).run(["$rootScope","mediaInfo",function(e,r){e.$on("wk.preview.content",function(e,o){if("folder"==o.type&&o.data.prepared){var n,t=JSON.parse(o.data.prepared);t.length>0&&(n=t[0].media,e.preview=r(n).image)}})}]);

angular.module("widgetkit").controller("woocommerceCtrl",["$scope","Application",function(n,a){n.content.data.mapping||(n.content.data.mapping=[]);var t=this,i=n.content.data.mapping;t.mapping=i,angular.forEach(i,function(n,a){angular.isArray(n)&&(i[a]={})}),t.addMap=function(){i.push({})},t.deleteMap=function(n){i.splice(i.indexOf(n),1)}}]);

angular.module("widgetkit").controller("twitterCtrl",["$scope","$element","Application","$http",function(t,n,i,e){var o,c=this;c.connected=n[0].getAttribute("data-status"),c.loading=!1,c.openPopup=function(t){o=window.open(t,"","width=800,height=500")},t.$watch("twitter.pin",function(t){if(t&&!(t.length<7)){c.loading=!0;var n=e.post(i.url("twitter_auth"),{pin:t});n.success(function(){c.connected=!0,c.loading=!1,c.pin="",o&&o.close()}),n.error(function(){c.loading=!1})}}),c.disconnect=function(){c.loading=!0;var t=e["delete"](i.url("twitter_auth"));t.success(function(){c.connected=!1,c.loading=!1}),t.error(function(){c.loading=!1})}}]);

angular.module("widgetkit").controller("wordpressCtrl",["$scope",function(n){n.content.data.mapping||(n.content.data.mapping=[]);var a=this,t=n.content.data.mapping;a.mapping=t,angular.forEach(t,function(n,a){angular.isArray(n)&&(t[a]={})}),a.addMap=function(){t.push({})},a.deleteMap=function(n){t.splice(t.indexOf(n),1)}}]);

angular.module("widgetkit").controller("customCtrl",["$scope","$timeout","UIkit","mediaInfo","mediaPicker","Fields","Application","Translator",function(e,t,i,n,a,d,o,l){e.content.data._fields||(e.content.data._fields=[]);var s,c=this,m=e.content.data._fields;e.content.data.items&&e.content.data.items.length||(e.content.data.items=[{media:""}]),s=e.content.data.items,e.item=s[0],e.extrafields=m,c.corefields=o.config.types.custom.fields,c.fields=d.fields(),c.previewItem=function(e){var t=e.options&&e.options.media&&e.options.media.poster;return n(t||e.media).image},c.addItem=function(t){e.item=t||{media:""},s.push(e.item)},c.importItems=function(){a.select({multiple:!0}).then(function(t){!t.length||1!=s.length||e.item.title&&e.item.media&&e.item.content||(s.length=0),angular.forEach(t,function(e){e.title=String(e.title).replace(/(-|_)/g," ").replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,function(e){return e.toUpperCase()}),c.addItem({title:e.title,media:e.url,width:e.width,height:e.height})})})},c.editItem=function(t){e.item=t},c.deleteItem=function(t){s.splice(s.indexOf(t),1),e.item=s[0]},c.addField=function(e){return e=e||{type:"text",name:"field-x",label:"Field X"},c.corefields[e.name]&&(e.type=c.corefields[e.name].type,e.label=c.corefields[e.name].label),c.hasField(e.name)?void alert('Field name "'+e.name+'" is already in use.'):(s.forEach(function(t){t[e.name]||(t[e.name]="")}),void m.push(angular.copy(e)))},c.deleteField=function(e){confirm(l.trans("Are you sure you want to delete this field?"))&&(s.forEach(function(t){t[e.name]&&delete t[e.name]}),m.splice(m.indexOf(e),1))},c.hasField=function(e){if(["title","media","link"].indexOf(e)>-1)return!0;for(var t=0;t<m.length;t++)if(m[t].name==e)return!0;return!1},c.toggleEditFields=function(){c.editfields=!c.editfields,c.editfields||setTimeout(function(){window.dispatchEvent(new Event("resize"))},150),c.custom={field:{}},c.addCustomField=!1},c.getFieldOptions=function(e,t){var i={},n=c.corefields[e.name];return n&&n.options&&(i=angular.extend(i,n.options)),JSON.stringify(i)},e.$watch("content",function(t){var i=s.indexOf(e.item);s=t.data.items,e.item=s[i]}),i.$doc.trigger("ready.uk.dom"),i.$doc.on("change.uk.sortable",function(e,i,n){n&&void 0!==n&&(n=angular.element(n),t(function(){"js-content-items"==i.element[0].id&&s.splice(n.index(),0,s.splice(s.indexOf(n.scope().item),1)[0]),"js-fields-items"==i.element[0].id&&m.splice(n.index(),0,m.splice(m.indexOf(n.scope().field),1)[0])}))}),angular.isArray(e.widget.fields)&&e.widget.fields.forEach(function(e){e&&e.name&&!c.hasField(e.name)&&c.addField(e)})}]).run(["$rootScope","mediaInfo",function(e,t){e.$on("wk.preview.content",function(e,i){if("custom"==i.type&&i.data.items.length){var n=i.data.items[0],a=n.options&&n.options.media&&n.options.media.poster;e.preview=t(a||n.media).image.replace(/preview(-.+\.svg)$/g,"content$1")}})}]);

