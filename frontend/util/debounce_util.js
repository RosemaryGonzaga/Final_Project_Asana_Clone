// Adapted from David Walsh (https://davidwalsh.name/javascript-debounce-function)

// My understanding of how this algorithm works:

// Debounce is a higher-order function: it returns another function, which closes over the desired context and args.
// In particular, debounce's returned function closes over a timeout variable.
// The returned function will be invoked only after it stops being called for X milliseconds.
// If it is called again within that interval, the countdown resets (clearTimout then setTimeout).

// Debounce is useful for limiting the frequency of costly function calls (e.g., API requests) tied to an event ... 
// ... it delays function invocation until a predetermined interval has elapsed since the last event.
// Example: search bars - query DB only after user has "stopped" typing (defined by x milliseconds between keyup events).


// Explanation of debounce's arguments:
// 1) callback: 
// 2) interval: 
// 3) immediate: a boolean flag that determines whether to invoke the debounced function 
//      a) when the event first fires (true)
//      b) after the interval has elapsed (false)

function debounce(callback, interval, immediate) {
    let timeout; // timeout will be set (assigned a value) when the first event fires, triggering the countdown

    // The returned function closes over the specific instance of timeout (declared above), 
    // and thus has the ability to clear and set it.
    // This should be installed as the event handler (e.g., for a keydown or keyup event).
    const executedFunction = (...args) => {
        // // Declare variables to be closed over (store context and arguments).
        // let that = this;
        // let args = arguments; // use spread operator instead.

        // Define function to be invoked once interval has elapsed (in setTimeout).
        // This will only be called if the entire interval has passed w/o an event firing.
        const later = () => {
            timeout = null; // this ends the timeout (the countdown)
            callback(...args);
            // callback.apply(that, args);
            // if (!immediate) callback.apply(that, args);
        };

        // // To simplify, I'm cutting out 
        // // Determine whether to invoke the callback immediately ('leading end execution') or later ('trailing end execution')
        // // ...depending on the value of 'immediate' flag passed into debounce
        // const callNow = immediate && !timeout;
        // debugger
        // Reset the countdown interval
        // If executedFunction is invoked, this clearTimeout ensures the 'later' callback 
        // ...(tied to the specific instance of timeout defined previously) never gets invoked.
        clearTimeout(timeout);  
        // debugger
        // Restart the refractory period.
        // Note from David Walsh's tutorial: setTimeout returns a truthy value (but it differs in web vs node)
        timeout = setTimeout(later, interval);

        // // If 'leading end' execution, call now
        // if (callNow) callback.apply(that, args);
    };

    return executedFunction;
}

export default debounce;