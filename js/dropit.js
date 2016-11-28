/*
 * Dropit v1.1.0
 * http://dev7studios.com/dropit
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */
;
(function($) {

    $.fn.dropit = function(method) {

        var methods = {
            init: function(options) {
                this.dropit.settings = $.extend({}, this.dropit.defaults, options);
                return this.each(function() {
                    var $el = $(this),
                        el = this,
                        settings = $.fn.dropit.settings;
                    // Hide initial submenus
                    $el.addClass('dropit')
                        .find('>' + settings.triggerParentEl + ':has(' + settings.submenuEl + ')').addClass('dropit-trigger')
                        .find(settings.submenuEl).addClass('dropit-submenu').hide();

                    // Declare function for setting behaviour. Called by 'calcAction' function.
                    let setBehaviour = function(action) {
                      // Open menu on 'action'
                      $el.off().on(action, settings.triggerParentEl + ':has(' + settings.submenuEl + ') > ' + settings.triggerEl + '', function() {
                          // Close click menus if clicked again
                          if ((action == 'click') && $(this).parents(settings.triggerParentEl).hasClass('dropit-open')) {
                              settings.beforeHide.call(this);
                              $(this).parents(settings.triggerParentEl).removeClass('dropit-open').find(settings.submenuEl).hide();
                              settings.afterHide.call(this);
                              return false;
                          }

                          // Hide open menus
                          settings.beforeHide.call(this);
                          $('.dropit-open').removeClass('dropit-open').find('.dropit-submenu').hide();
                          settings.afterHide.call(this);

                          // Open this menu
                          settings.beforeShow.call(this);
                          $(this).parents(settings.triggerParentEl).addClass('dropit-open').find(settings.submenuEl).show();
                          settings.afterShow.call(this);

                          return false;
                      });

                      // Close on mouseleave if using 'mouseenter' action
                      if (action == 'mouseenter') {
                          $el.on('mouseleave', '.dropit-open', function() {
                              settings.beforeHide.call(this);
                              $(this).removeClass('dropit-open').find(settings.submenuEl).hide();
                              settings.afterHide.call(this);
                          });
                      }
                    }

                    // Calculate value of 'action'
                    let calcAction = function() {
                        var action;
                        if (settings.switchToClick != 'false' && $(window).width() < settings.switchToClick) {
                            action = 'click';
                        } else {
                            action = settings.action;
                        }

                        function is_touch_device() {
                            return (('ontouchstart' in window) ||
                                (navigator.MaxTouchPoints > 0) ||
                                (navigator.msMaxTouchPoints > 0));
                        }

                        if (is_touch_device()) {
                            action = 'click';
                        }

                        console.log(`Menu trigger: ${action}`);
                        setBehaviour(action); // Sets the behaviour of the menu based on the newly calcultated value of 'action'.
                    }

                    calcAction();

                    // Re-calculate value of 'action' on window resize
                    var rtime;
                    var timeout = false;
                    var delta = 200;
                    $(window).resize(function() {
                        rtime = new Date();
                        if (timeout === false) {
                            timeout = true;
                            setTimeout(resizeend, delta);
                        }
                    });

                    function resizeend() {
                        if (new Date() - rtime < delta) {
                            setTimeout(resizeend, delta);
                        } else {
                            timeout = false;
                            calcAction();
                        }
                    }

                    // Close on outside click
                    $(document).on('click', function() {
                        settings.beforeHide.call(this);
                        $('.dropit-open').removeClass('dropit-open').find('.dropit-submenu').hide();
                        settings.afterHide.call(this);
                    });

                    settings.afterLoad.call(this);
                });
            }

        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method "' + method + '" does not exist in dropit plugin!');
        }

    };

    $.fn.dropit.defaults = {
        action: 'mouseenter', // The open action for the trigger
        switchToClick: '899',
          // Use when 'action' is set to 'mouseenter'.
          // This value is the minimum window width in pixels before
          // click-only menus are enforced. Useful for websites that
          // display a 'mobile' menu on small desktop browser windows.
          // Set to 'false' to disable this feature.
        submenuEl: 'ul', // The submenu element
        triggerEl: 'a', // The trigger element
        triggerParentEl: 'li', // The trigger parent element
        afterLoad: function() {}, // Triggers when plugin has loaded
        beforeShow: function() {}, // Triggers before submenu is shown
        afterShow: function() {}, // Triggers after submenu is shown
        beforeHide: function() {}, // Triggers before submenu is hidden
        afterHide: function() {} // Triggers before submenu is hidden
    };

    $.fn.dropit.settings = {};

})(jQuery);
