/**
 * Created by Jeffrey on 12/7/14.
 */
'use strict';

angular.module('shared.services.dialog', [])

    .factory('DialogService', [function () {
        var dialog = document.querySelector('#modal_dialog');

        if (!dialog) {
            dialog = $('<dialog class="mdl-dialog" id="modal_dialog">'
                + '<div class="mdl-dialog__content">'
                + '</div>'
                    +'<div class="mdl-dialog__actions">'
                    +'<button type="button" class="mdl-button ok">OK</button>'
                    +'<button type="button" class="mdl-button close">Cancel</button>'
                    +'</div>'
                + '</dialog>');
            $('body').append(dialog);
            dialog = dialog[0];
        }

        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }

        return {
            confirm: function (infos, callback) {
                var message = _(infos).join('<br>');
                $('.mdl-dialog__content', dialog).html(message);
                $('.close', dialog).click(function(){
                    dialog.close();
                });
                $('.close', dialog).show();
                $('.ok', dialog).click(function(){
                    if (typeof callback === 'function') {
                        callback();
                    }
                    dialog.close();
                });
                dialog.showModal();
            },
            alert: function (infos) {
                var message = _(infos).join('<br>');
                $('.mdl-dialog__content', dialog).html(message);
                $('.ok', dialog).click(function(){
                    dialog.close();
                });
                $('.close', dialog).hide();
                dialog.showModal();
            }
        };
    }])
;