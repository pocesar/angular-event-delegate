angular-event-delegate
======================

Use a common parent to delegate events to underlaying DOM elements using jQuery. 

[DEMO](http://plnkr.co/edit/wTjaeI9RAoPwy4Nkycwk?p=preview)

Usage
=================

```js
angular
.module('App', ['EventDelegate'])
.controller('MainCtrl', function(){

  this.items = [
    {name: 'name', value: 'value', showy: false},
    {name: 'two' , value: '2', showy: false}
  ];
  
  this.clicky = function(value){
    alert(value);
  };
});
```

```html
<div ng-controller="MainCtrl as main">

  <div event-delegate="{'click': '.showcase', 'mouseenter': '.infotext'}">

    <div ng-repeat="item in main.items">

      <a class="showcase" event-delegate-target="main.clicky(item.value)">Click: [ {{ item.name }} ]</a>
      <div class="infotext" event-delegate-target="item.showy=!item.showy">
        Toggle on mouseenter
        <span ng-show="item.showy">Showing</span>
      </div>

    </div>

  </div>

</div>
```

## How is it better than ng-click?

You can define, at once, many events besides click event, on the parent that will be delegated to the elements inside it. 

Any new elements added to the parent will have the event bound without the need to binding a new event to it. Also useful with a big list of elements, having 100+ event listeners attached to each item, plus scope.$watch'es, starts to feel heavy. This is mainly useful in `ng-repeat` loops though. 

You can define multiple selectors as well using for example `'click': '.showcase,.infotext'`

## Requirements

This depends on jQuery
