/**
 * JS API Proprieties
 * 
 * @Number currentCount - The total number of times the timer has fired since it
 *         started at zero.
 * @Number delay - The delay, in milliseconds, between timer events.
 * @Number repeatCount - The total number of times the timer is set to run.
 * @Boolean running - The timer's current state; true if the timer is running,
 *          otherwise false.
 * @Methods Timer Timer(Number * delay [, Number repeatCount = 0]) - Constructs
 *          a new Timer object with the specified delay and repeatCount states.
 * @Methods void reset() - Stops the timer, if it is running, and sets the
 *          currentCount property back to 0, like the reset button of a
 *          stopwatch.
 * @Methods void start() - Starts the timer, if it is not already running.
 * @Methods void stop() - Stops the timer. void addEventListener(String type,
 *          Function listener)
 * @Registers an event listener.
 * @Methods void removeEventListener(String type, Function listener) - Removes a
 *          listener.
 * @Events TimerEvent.TIMER - Dispatched whenever a Timer object reaches an
 *         interval specified according to the Timer.delay property.
 * @TimerEvent.TIMER_COMPLETE - Dispatched whenever it has completed the number
 *                            of requests set by Timer.repeatCount.
 * @Methods Callback Function(TimerEvent e) - Listener callback function.
 * 
 * @param type
 * @param timer
 * @returns
 */

var TimerEvent = function(type, timer) {
  this.type = type;
  this.target = timer;
}
TimerEvent.TIMER = 'TimerEvent.TIMER';
TimerEvent.TIMER_COMPLETE = 'TimerEvent.TIMER_COMPLETE';

var Timer = function(delay, repeatCount) {
  this.init(delay, repeatCount);
}
Timer.prototype = {
  init : function(delay, repeatCount) {
    this.delay = delay;
    this.repeatCount = repeatCount || 0;
    
    this.interval = null;
    this.running = false;
    this.currentCount = 0;
    this.listeners = [];
  },
  addEventListener : function(type, listener) {
    this.listeners[this.listeners.length] = {
      type : type,
      fn : listener
    };
  },
  removeEventListener : function(type, listener) {
    for ( var i in this.listeners) {
      if (this.listeners[i].type == type && String(this.listeners[i].fn) == String(listener.fn)) {
        this.listeners[i] = null;
      }
    }
  },
  reset : function() {
    this.stop(true);
  },
  start : function() {
    if (this.running) {
      return;
    }
    this.running = true;
    
    var self = this;
    this.interval = setInterval(function() {
      self.iterate()
    }, this.delay);
  },
  stop : function(clearCount) {
    this.running = false;
    
    if (clearCount) {
      this.currentCount = 0;
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  iterate : function() {
    this.currentCount++;
    if (!this.repeatCount || this.currentCount <= this.repeatCount) {
      this.dispatchEvent(TimerEvent.TIMER);
      if (this.currentCount == this.repeatCount) {
        this.dispatchEvent(TimerEvent.TIMER_COMPLETE);
      }
    } else {
      this.stop();
    }
  },
  dispatchEvent : function(type) {
    for ( var i in this.listeners) {
      if (this.listeners[i] && this.listeners[i].type == type) {
        this.listeners[i].fn(new TimerEvent(type, this));
      }
    }
  }
}