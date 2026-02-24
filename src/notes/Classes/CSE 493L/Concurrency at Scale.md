- Use thread pools to scale concurrency and avoid creating a lot of threads
	- No point having many more threads than the number of cores
	- Can't context-switch within work, so every piece of work is run to completion
- To eliminate contention on a shared work queue, give each thread its own work queue
	- Load balance / work-steal to maintain high utilization


## Scaling to multiple machines
- Scaling concurrency to multiple machines is difficult, primarily because of the network and the fact that the nodes could go down
- Coordination is also a massive bottleneck, any time we any coordination between machines we have to make a network call

## Dataflow Engines
- Separate computation from communication
- We define the dependency graph statically / ahead of time instead of dynamically
- 3 pieces
	- Programming model. The abstractions you're forced to use in order to write code that scales well
	- Coordinator: Tries to intelligently schedule such that data doesn't have to move from one machine to the other that often
	- Fleet: Just runs work given by the coordinator via a local thread pool

## MapReduce
- You can write either a map node or a reduce node, and this can only chain to other map/reduce nodes
- Very limited by the programming model


## Apache Spark
- Modern dataflow engine
- Allows for DAGs
- Primitive data type is the "Resilient Distributed Dataset"
	- Resilient: each output data keeps track of its lineage
	- Distributed: composed of multiple partitions
	- Dataset: initial data can come from a file or be transformed from an RDD
- RDD operations
	- transforms (define new RDD from old, RDDs are immutable)
		- must be lazy
	- actions (get a single value from an RDD)

