## Thread-Based Programming
- Example: Go
- Main idea is goroutines
- Specializes in having millions of goroutines executing at the same time
- Runtime includes a ready queue and a yield function

## Threads vs Events
- Thread Pros 
	- Overlap I/O and computation
	- while looking sequential
	- intermediate state on stack
	- control flow naturally expressed
- Thread cons
	- synchronization
	- overflowable stack
	- stack memory pressure
- Event pros
	- easier to create well-conditioned system
	- easier to express dynamic change in level of parallelism
- event cons
	- difficult to program
	- control flow between callbacks is obscure
	- when to deallocate memory
	- incomplete language/tool/debugger support
	- difficult to exploit concurrent hardware

## Async/Await
- Language level support for futures
- async: declares that a function returns a future not a value
- await: wait for a future to finish
- Future: a handle representing an in-progress asynchronous function
- backend options
	- 1 coroutine / 1 thread per event
	- 1 thread pool task per event
		- more languages use this, but events can queue other events can lead to large stacks