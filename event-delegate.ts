module EventDelegate {
    'use strict';

    export module Directives {

        class EventDelegate implements ng.IDirective {
            restrict = 'A';
            link: ng.IDirectiveLinkFn;

            constructor(){
                this.link = (scope, el, attr) => {
                    var
                        eventDelegate = scope.$eval(attr['eventDelegate']);

                    angular.forEach(eventDelegate, (selector, event) => {

                        el.on(event + '.eventDelegate', selector, (e) => {
                            e.preventDefault();

                            var
                                target: ng.IAugmentedJQuery = angular.element(e.currentTarget),
                                fn: ng.ICompiledExpression;

                            if (fn = target.data('EventDelegateTarget')) {
                                scope.$apply(() => fn(target.scope(), { $event: e }));
                            }
                        });

                    });

                    scope.$on('$destroy', () => {
                        eventDelegate = null;
                        el.off('.eventDelegate');
                    });
                };
            }

            static instance(){
                return [() => new this()];
            }
        }

        export var eventDelegate: ng.IDirective = EventDelegate.instance();

        class EventDelegateTarget implements ng.IDirective {
            restrict = 'A';
            link: ng.IDirectiveLinkFn;

            constructor($parse: ng.IParseService) {
                this.link = (scope, el, attr) => {

                    attr.$observe('eventDelegateTarget', (att) => {
                        el.data('EventDelegateTarget', $parse(att));
                    });

                };
            }

            static instance(){
                return ['$parse', ($parse) => new this($parse)];
            }
        }

        export var eventDelegateTarget: ng.IDirective = EventDelegateTarget.instance();
    }

    angular.module('EventDelegate', []).directive({
      'eventDelegateTarget': Directives.eventDelegateTarget,
      'eventDelegate': Directives.eventDelegate
    });
}
