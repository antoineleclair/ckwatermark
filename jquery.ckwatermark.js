// https://github.com/antoineleclair/ckwatermark

(function ($) {

    function _onBlur(e) {
        e.editor.updateElement();
        var $textArea = $(this.element.$);
        var val = $textArea.val();
        val.replace(/\s/g, '');
        if (val == '' || val == '<p></p>') {
            $textArea.val($textArea.data('ckwatermark'));
            if (e.editor.document) {
                e.editor.document.getBody().setHtml($textArea.data('ckwatermark'));
            } else {
                e.editor.setData($textArea.data('ckwatermark'));
            }
        }
        e.editor.updateElement();
    }

    function _onFocus(e) {
        var id = $(this.element.$).attr('id');
        var $textArea = $('#' + id);
        var val = $textArea.val().replace(/\s/g, '');
        var watermark = $textArea.data('ckwatermark').replace(/\s/g, '');
        var editorval = e.editor.getData().replace(/\s/g, '');
        if (val == watermark || editorval == watermark) {
            setTimeout(function () {
                if (CKEDITOR.instances[id].document) {
                    CKEDITOR.instances[id]
                        .document
                        .getBody()
                        .setHtml('<p></p>');
                } else {
                    CKEDITOR.instances[id]
                        .setData('');
                }
            }, 0);

        }
    }

    $.fn.ckwatermark = function (text) {
        return this.each(function (i, el) {
            $(this).addClass('ckwatermark');
            $(this).data('ckwatermark', text);
            $(this).closest('form').submit(function () {
                $(this).find('textarea.ckwatermark').each(function () {
                    var editor = CKEDITOR.instances[$(this).attr('id')];
                    var val = editor.getData().replace(/\s/g, '');
                    var watermark = $(this).data('ckwatermark')
                        .replace(/\s/g, '');
                    if (val == watermark || val == '<p></p>') {
                        $(this).val('');
                        if (editor.document) {
                            editor.document.getBody().setHtml('');
                        } else {
                            editor.setData('');
                        }
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
