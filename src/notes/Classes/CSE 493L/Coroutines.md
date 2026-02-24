- Functions that you can pause/resume
- Active coroutine must purposely yield before switching to another coroutine, no interruptions
	- will run uninterrupted until it gets blocked or voluntarily yields

## API
- yield
	- pause current coroutine
- spawn
	- create a new coroutine
- join
	- wait for a coroutine to finish

## Channels
- How we implement dependencies
- Two main functions: send/receive
- Channels create causal consistency. Use send/receive to synchronize different coroutines

## Coroutine Implementation
- Every routine needs a stack
- Spawn a routine by initializing a stack for it
- For yield, you want to execute a context switch
	- figure out next coroutine to run
	- checkpoint all state
	- load next coroutine's previous checkpoint