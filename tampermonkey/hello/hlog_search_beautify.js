// ==UserScript==
// @name         hlog_search_beautify
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        fat-hlog.hellobike.cn/logSearch
// @match        hlog.hellobike.cn/logSearch
// @match        uat-hlog.hellobike.cn/logSearch
// @match        pre-hlog.hellobike.cn/logSearch
// @grant   GM_addStyle
// @require https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js
// ==/UserScript==

(function () {
    'use strict';


    GM_addStyle('.fix-show-all { -webkit-line-clamp: 999 !important; }');


    function updateList($lcont) {



        var $list = $lcont.find('.ant-list-items').children();



        if ($list && $list.length) {

            $list.each(function () {
                var $item = $(this);

                if ($item.data('init')) {
                    return;
                }

                $item.data('init', true);

                $item.css({ "border": "#000 1px solid", "margin-top": "4px" });

                var $head = $item.find('.ant-collapse-header');

                var headTxt = $head.children().eq(1).text();

                //var time = headTxt.substring(1,'2021-01-01 12:12:12.000'.length+1);

                // var ntime= time.replace(" ","T")+"Z";



                //  var day=dayjs(ntime);

                //  var ts =day.subtract(8, 'hour').unix()*1000;




                var $box = $item.find('.ant-collapse-content-box');

                var $tags = $box.children().children().eq(0).children().eq(0).first().children();
                var $btns = $box.children().children().eq(0).children().eq(1).first();




                if ($tags && $tags.length) {
                    $tags.each(function () {

                        var $tag = $(this);
                        var txt = $tag.text();


                        //    if(txt&&txt.startsWith('traceId=')){

                        // var tid=txt.substring( 'traceId='.length, txt.length-1);

                        //    if(tid&&tid.length){

                        //            var url =owlHost+'/trace?currentTab=soaLog&idType=traceId&traceid='+tid+'&logTime='+ts+'&timeRegion=1m';




                        //    }


                        //    }

                    });

                }




                var $cont = $box.children().children().eq(1).children().children().first();

                var data = $cont.text();


                if (data[0] === '{') {


                    try {
                        var obj = JSON.parse(data);


                        var msg = obj.message;
                        var err = obj.exception;

                        if (err) {

                            msg = (msg||'') + '\r\n' + err;

                        }

                        $cont.html(msg).css({ "font-size": "14px", "font-weight": "600", "white-space": "pre-wrap" });


                        setTimeout(function () {

                            var $btn = $cont.parent().next().next();
                            $btn.remove();
                        }, 100);




                        var $newBtn = $('<input type="button" value="收起" />');
                        $newBtn.css({ "margin-right": "10px", "display": "none" });

                        $newBtn.on('click', function () {
                            $newBtn.hide();
                            $cont.removeClass("fix-show-all");
                        });

                        $btns.prepend($newBtn);


                        $cont.on('dblclick', function () {

                            $cont.addClass("fix-show-all");
                            $newBtn.show();

                        });

                    } catch (e) {
                        console.log(e);
                        console.log(data);
                    }


                }
            });

        }
    }

    function init() {

        var $lcont = $('#mf-app .ant-list-split');


        if (!$lcont || !$lcont.length) {
            return true;
        }


        $lcont.on('DOMSubtreeModified', function () {

            updateList($lcont);

        });



    }


    function runloop() {

        setTimeout(function () {

            if (init()) {


                runloop();

            }

        }, 1000);
    }

    runloop();




    // Your code here...
})();