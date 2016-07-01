/**
 * Created by Jeffrey on 12/7/14.
 */
'use strict';

angular.module('shared.services.loading', [])

    .factory('LoadingService', [function () {
        var dialog = document.querySelector('#loading_dialog');

        if (!dialog) {
            dialog = $('<dialog class="mdl-dialog" id="loading_dialog">'
                + '<div class="mdl-dialog__content text-center">'
                + '<div class="mdl-spinner mdl-js-spinner is-active"></div>'
                + '</div>'
                + '</dialog>');
            $('body').append(dialog);
            dialog = dialog[0];
        }

        if (!dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }
        return {
            show: function () {
                dialog.showModal();
            },
            hide: function () {
                dialog.close();
            }
        };
    }])
;