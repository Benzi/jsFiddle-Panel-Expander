require.config({paths:{jquery:'https://code.jquery.com/jquery-3.1.1.min'}});
require(['jquery'], function (jQuery){
  jQuery.noConflict();
  (function ($){
    $(function (){

      Layout.setWindowSizes(null);

      var expanded = false;

      var panel_ids = ['panel_html', 'panel_js', 'panel_css', 'result'];

      var defaults = {
        html: {
          height: null,
          width: null
        },
        js: {
          height: null,
          width: null
        },
        css: {
          height: null,
          width: null
        },
        result: {
          height: null,
          width: null
        },
        handler_vertical: {
          left: null
        },
        left_handler_horizontal: {
          top: null
        },
        right_handler_horizontal: {
          top: null
        }
      };

      function setDefaults (callback){
        if (!expanded){
          defaults.html.height = ($('#panel_html').height()/$('#panel_html').parent().height()*100)+'%';
          defaults.html.width = ($('fieldset.left').width()/$('fieldset.left').parent().width()*100)+'%';
          defaults.js.height = ($('#panel_js').height()/$('#panel_js').parent().height()*100)+'%';
          defaults.js.width = ($('fieldset.left').width()/$('fieldset.left').parent().width()*100)+'%';
          defaults.css.height = ($('#panel_css').height()/$('#panel_css').parent().height()*100)+'%';
          defaults.css.width = ($('fieldset.right').width()/$('fieldset.right').parent().width()*100)+'%';
          defaults.result.height = ($('#result').height()/$('#result').parent().height()*100)+'%';
          defaults.result.width = ($('fieldset.right').width()/$('fieldset.right').parent().width()*100)+'%';
          defaults.handler_vertical.left = ($('#handler_vertical').position().left/$('#handler_vertical').parent().width()*100)+'%';
          defaults.left_handler_horizontal.top = ($('fieldset.left .handler.handler_horizontal').position().top/$('fieldset.left .handler.handler_horizontal').parent().height()*100)+'%';
          defaults.right_handler_horizontal.top = ($('fieldset.right .handler.handler_horizontal').position().top/$('fieldset.right .handler.handler_horizontal').parent().height()*100)+'%';
          for (var i in defaults){
            for (var j in defaults[i]){
              if (i == 'right_handler_horizontal' && j == 'top'){
                if (callback) callback();
              }
            }
          }
        } else if (callback) callback();
      }

      function resetLayout (){
        expanded = false;
        $('#expand-icon > i').removeClass('bt-minimize').addClass('bt-maximize');
        $('fieldset.left').animate({width: defaults.html.width}, 100);
        $('fieldset.right').animate({width: defaults.css.width}, 100);
        $('#panel_html').animate({height: defaults.html.height}, 100);
        $('#panel_js').animate({height: defaults.js.height}, 100);
        $('#panel_css').animate({height: defaults.css.height}, 100);
        $('#result').animate({height: defaults.result.height}, 100);
        $('#handler_vertical').show().animate({left: defaults.handler_vertical.left}, 100);
        $('fieldset.left .handler.handler_horizontal').show().animate({top: defaults.left_handler_horizontal.top}, 100);
        $('fieldset.right .handler.handler_horizontal').show().animate({top: defaults.right_handler_horizontal.top}, 100);
        $('.windowLabel').attr('style', 'display:initial !important;');
        $('.warningTooltip').show();
      }

      function toggle (panel){
        var panel_id = panel.attr('id');
        setDefaults(function (){
          if (!expanded){
            expanded = true;
            panel.find('#expand-icon > i').removeClass('bt-maximize').addClass('bt-minimize');
            $('#handler_vertical').hide();
            $('.handler.handler_horizontal').hide();
            panel.animate({height: '100%'}, 100);
            $('.warningTooltip').each(function (){
              if ($(this).parent().attr('id') != panel_id){
                $(this).hide();
              }
            });
            panel.parent().animate({width: '100%'}, 100);
            if (panel.parent().hasClass('right')){
              $('fieldset.left').animate({width: 0}, 100);
              if (panel_id == 'panel_css'){
                $('#result').animate({height: 0}, 100);
              } else if (panel_id == 'result'){
                $('#panel_css').animate({height: 0}, 100);
              }
            } else if (panel.parent().hasClass('left')){
              $('fieldset.right').animate({width: 0}, 100);
              if (panel_id == 'panel_html'){
                $('#panel_js').animate({height: 0}, 100);
              } else if (panel_id == 'panel_js'){
                $('#panel_html').animate({height: 0}, 100);
              }
            }
            $.each(panel_ids, function (i, value){
              if (value != panel_id){
                $('#'+value+' > .windowLabel').attr('style', 'display:none !important;');
              }
            });
          } else resetLayout();
        });
      }

      var expandIconHTML = '<a id="expand-icon" class="windowLabel"><i class="bts bt-maximize"></i></a>';
      var expandIconCSS = '.windowLabel{right:32px;}#expand-icon{display: initial !important;border:0;cursor:pointer;right:5px;background:none;}#expand-icon>i{border:0;}';

      $('#panel_html').append(expandIconHTML);
      $('#panel_js').append(expandIconHTML);
      $('#panel_css').append(expandIconHTML);
      $('#result').append(expandIconHTML);
      $('<style>').prop('type', 'text/css').html(expandIconCSS).appendTo('head');
      $('body').on('click', '#expand-icon', function (){
        toggle($(this).parent());
      });
    });
  })(jQuery);
});
