## Domain Decomposition
- Partition problem into separate tasks that can be run concurrently
- Each worker does the same thing
- Static allocation of tasks
	- Block allocation vs block-cyclic allocation
- Dynamic allocation
	- Workers finish at different speeds and the slowest worker dominates the runtime
	- Want to dynamically balance load between workers
- Granularity = computation/communication
	- Fine-grained
		- Good load balancing, but G is small
	- Coarse-grained parallelism
		- Less load balancing, but a higher G

## Functional Decomposition
- Divide up the instructions/routines
- Requires data movement
