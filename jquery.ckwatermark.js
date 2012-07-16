(function($) {
    
    function _onBlur(e) {
        var $textArea = $(this.element.$);
        var val = $textArea.val().replace(/\s/g, '');
        if (val == '' || val == '<p></p>') {
            $textArea.val($textArea.data('ckwatermark'));
        }
    }
    
    function _onFocus(e) {
        var $textArea = $('#' + $(this.element.$).attr('id'));
        var val = $textArea.val().replace(/\s/g, '');
        var watermark = $textArea.data('ckwatermark').replace(/\s/g, '');
        if (val == watermark) {
            //this.setData('<p></p>'); // makes webkit crash, fix is line below
            e.editor.document.getBody().setHtml('<p></p>');
        }
    }

    $.fn.ckwatermark = function(text) {
        return this.each(function(i, el) {
            $(this).addClass('ckwatermark');
            $(this).data('ckwatermark', text);
            $(this).closest('form').submit(function() {
                $(this).find('textarea.ckwatermark').each(function() {
                    var val = $(this).val().replace(/\s/g, '');
                    var watermark = $(this).data('ckwatermark').replace(/\s/g, '');
                    if (val == watermark) {
                        $(this).val('');
                        var editor = CKEDITOR.instances[$(this).attr('id')];
                        editor.document.getBody().setHtml('');
                        editor.updateElement();
                    }
                });
            });
            var editor = CKEDITOR.instances[$(this).attr('id')];
            editor.on('blur', _onBlur);
            editor.on('focus', _onFocus);
            editor.fire('blur'); // sets the watermark if editor is empty
        });
    };
    
})(jQuery);
