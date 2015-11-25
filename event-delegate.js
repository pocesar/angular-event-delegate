(function(){
  var EventDelegate;
  (function (_EventDelegate) {
      'use strict';
  
      (function (Directives) {
          var EventDelegate = (function () {
              function EventDelegate() {
                  this.restrict = 'A';
                  this.link = function (scope, el, attr) {
                      var eventDelegate = scope.$eval(attr['eventDelegate']);
  
                      angular.forEach(eventDelegate, function (selector, event) {
                          el.on(event + '.eventDelegate', selector, function (e) {
                              e.preventDefault();
  
                              var target = angular.element(e.currentTarget), fn, scope;
  
                              if ((fn = target.data('EventDelegateTarget')) && (scope = target.data('EventDelegateTargetScope'))) {
                                  scope.$apply(function () {
                                      return fn(target.scope(), { $event: e });
                                  });
                              }
                          });
                      });
  
                      scope.$on('$destroy', function () {
                          eventDelegate = null;
                          el.off('.eventDelegate');
                      });
                  };
              }
              EventDelegate.instance = function () {
                  var _this = this;
                  return [function () {
                          return new _this();
                      }];
              };
              return EventDelegate;
          })();
  
          Directives.eventDelegate = EventDelegate.instance();
  
          var EventDelegateTarget = (function () {
              function EventDelegateTarget($parse) {
                  this.restrict = 'A';
                  this.link = function (scope, el, attr) {
                      attr.$observe('eventDelegateTarget', function (att) {
                          el.data({
                              'EventDelegateTarget': $parse(att),
                              'EventDelegateTargetScope': scope
                          });
                      });
                  };
              }
              EventDelegateTarget.instance = function () {
                  var _this = this;
                  return ['$parse', function ($parse) {
                          return new _this($parse);
                      }];
              };
              return EventDelegateTarget;
          })();
  
          Directives.eventDelegateTarget = EventDelegateTarget.instance();
      })(_EventDelegate.Directives || (_EventDelegate.Directives = {}));
      var Directives = _EventDelegate.Directives;
    
      angular.module('EventDelegate', []).directive({
        'eventDelegateTarget': Directives.eventDelegateTarget,
        'eventDelegate': Directives.eventDelegate
      });
      
  })(EventDelegate || (EventDelegate = {}));
})();
