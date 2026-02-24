
- Waits-for Graph: Shows what threads are waiting on resources from other threads. A cycle in this means a deadlock can occur

## Strategies for Handling Deadlock
- Ignore
- Detect and fix
	- Fixing is harder once a deadlock has been detected
- Prevent

## Four necessary conditions
- Limited resources
	- Not enough serve all threads simultaneously
- No preemption
	- Can't force threads to give up resources
- Hold and wait
	- threads hold resources while waiting to acquire other resources
- Cyclic chain of requests

## Eliminating Circular Chain
- Impose global ordering of resources
- Assumes resources are eventually released

## Eliminating Hold-and-wait
- Wait for all resources needed to be free, grab them all atomically
- If you cannot get a resources, release all of them and start over