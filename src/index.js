/*
  Same as EventEmitter of Node.js
 */

;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return factory()
    })
  } else if (typeof exports === 'object') {
    module.exports = factory
  } else {
    root.EventEmitter = factory()
  }
}(this, function() {
  var MAX_LISTENER = 10
  var ownProp = Object.hasOwnProperty

  var EventEmitter = function () {
    this.events = {}
    this.maxListener = MAX_LISTENER
  }

  EventEmitter.defaultMaxListeners = MAX_LISTENER

  /**
   * Adds the listener function to the end of the listeners array for the event named eventName
   * @param  {string} eventName
   * @param  {function} listener
   * @return {object} reference of EventEmiiter
   */
  EventEmitter.prototype.on = function(eventName, listener) {
    var listeners = this.eventNames().length

    if (listeners >= this.maxListener) {
      throw new TypeError('MaxListenersExceededWarning: Use emitter.setMaxListeners() to increase limit')
    }

    if (!(eventName in this.events)) {
      this.events[eventName] = []
    }
    this.events[eventName].push(listener)
    return this
  }

  EventEmitter.prototype.addEventListener = EventEmitter.prototype.on

  /**
   * Synchronously calls each of the listeners registered for the event named eventName
   * @param  {string} eventName [description]
   * @param  {object} context   execute context
   * @return {object} reference of EventEmiiter
   */
  EventEmitter.prototype.emit = function (eventName, context) {
    context = context || null

    if (eventName in this.events) {
      var eventArr = this.events[eventName]
      var len = eventArr.length

      for (var i = 0; i < len; i++) {
        eventArr[i].call(context)
      }
    }
    return this
  }

  /**
   * Returns an array listing the events for which the emitter has registered listeners
   * @return {Array}
   */
  EventEmitter.prototype.eventNames = function() {
    var result = []

    for (var eventName in this.events) {
      if (ownProp.call(this.events, eventName)) {
        result.push(eventName)
      }
    }
    return result
  }

  /*
    Returns the number of listeners listening to the event named eventName.
    @param {string} eventName
    @return {number}
   */
  EventEmitter.prototype.listenerCount = function (eventName) {
    return this.events[eventName] && this.events[eventName].length || 0
  }

  /**
   * Returns the current max listener value for the EventEmitter
   * @return {number}
   */
  EventEmitter.prototype.getMaxListeners = function () {
    return this.maxListener
  }

  /**
   * Set the current max listener value for the EventEmitter
   * @param {number} num
   * @return {object} reference of EventEmiiter
   */
  EventEmitter.prototype.setMaxListeners = function (num) {
    if (typeof num === 'number' && num === num && Math.floor(num) === num) {
      this.maxListener = num
    }
    return this
  }

  /**
   * Returns a copy of the array of listeners for the event named eventName.
   * @param  {string} eventName
   * @return {array/undefined}
   */
  EventEmitter.prototype.listeners = function (eventName) {
    return this.events[eventName]
  }

  /**
   * Removes the specified listener from the listener array for the event named eventName
   * @param  {string} eventName
   * @param  {function} listener
   * @return {object} reference of EventEmiiter
   */
  EventEmitter.prototype.removeListener = function (eventName, listener) {
    if (eventName in this.events) {
      var eventArr = this.events[eventName]
      var len = eventArr.length

      for (var i = 0; i < len; i++) {
        if (eventArr[i] === listener) {
          this.events[eventName].splice(i, 1)
          break
        }
      }
    }
    return this
  }

  /**
   * Removes all listeners, or those of the specified eventName
   * @param  {string} eventName
   * @return {object} reference of EventEmiiter
   */
  EventEmitter.prototype.removeAllListener = function (eventName) {
    delete this.events[eventName]
    return this
  }

  return EventEmitter
}))
