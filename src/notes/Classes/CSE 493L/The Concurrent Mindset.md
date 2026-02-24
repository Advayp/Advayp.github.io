**How to take advantage of more workers?**
- Scale up
	- Throw more workers at the problem. This doesn't always scale linearly, and the number of workers may not even be the bottleneck
- Specialize
	- Have multiple group of workers specialize in certain components of a problem

**Concurrency**: Two operations are concurrent if on a dependency graph there isn't a path between those two operations

**Parallelism**: At least two workers simultaneously working. Property of the execution of a dependency graph.

