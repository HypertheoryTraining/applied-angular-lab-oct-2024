# Counter

## Sprint 1 - Easy Mode

Create a new folder in `src/app` called `counter`.

Create an Angular component in that folder called `counter.component.ts`.

```typescript
export class TacoSalad {}
```

In the `labs.routes.ts' add a child route to the labs to get to your new component.

Create a link to this on the `labs` component.

In the counter component:

It shows the current value of the counter, (start at 0)

Add buttons that allow the user to increment and decrement the count.

Only rule - implement this with signals.

## Sprint 2 - Still Easy, but You Can Do It.

The count is not allowed to go below zero. We have enough negativity in the world.

The "decrement" button should be disabled or hidden if decrementing would take you below zero.

### Sprint 2.5 - Should be easy, if you did ok with #2 above.

Display on the screen the word "Fizz" if the current count is evenly divisible by 3.
Display on the screen the word "Buzz" if the current count is evenly divisible by 5.
If it is evenly divisible by both 3 and 5 (e.g. 15) display "FizzBuzz"

See [FizzBuzz](https://en.wikipedia.org/wiki/Fizz_buzz#:~:text=Fizz%20buzz%20is%20a%20group,with%20the%20word%20%22fizzbuzz%22.)

## Sprint 3 - Getting Harder. "Lifting State"

The point of this example is that you will find that a component can't own it's own state sometimes. Other components need to see it, etc.

This will require you to "lift" the state to a service (I'd suggest using a `signalStore`, but you do you.)

Create another component called `prefs`, and make a route to it from the `labs` component.

(Do _not_ make this a 'child' of the counter component, completely different component - your counter component cannot "know" about the existence of the prefs component, and vice versa. (Loose Coupling) ).

In the prefs component, display some UI that let's the user decide if they want to count by 1, 3, or 5.

By default, it should be 1.

If they change to 3 or 5, when they go back to the counter component, they are incrementing and decrementing by that number.

Note: You will have to create a service that is injected into each component (`counter` and `prefs`).

## Sprint 4 - Advanced, Extra Credit

How might you make it so that the app "remembers":

- Their preferences on what they want to count by
- The value of the counter

Even if they close the browser, or just refresh. (Now it will return to zero, and 1).

> Note: You can persist the state anywhere you want. Localstorage? An API? Both?
