**Thread**: A single execution sequence represented as a separately scheduled task. Executed on cores, and are an abstraction of cores.
* We can write code that assumes we have an infinite number of processors. The scheduler will handle scheduling our threads, using a ready queue as we saw with coroutines
* Threads can execute with variable speed, and programs should be designed to work with any possible schedule
* Coroutines must explicitly yield, but threads can be forced to yield at any time
* Exact same API as coroutines, but threads are more standardized
* When a thread is scheduled to run, it runs for some fixed duration before a timer fires and the CPU decides to switch to some other thread. This time is called the "time quantum".


### How often should threads be preempted?
- Very often: low latency, but a lot of overhead due to context switching
- Not often: high throughput, but high latency 

Threads can move between cores (without any consistency issues) because of a protocol called cache coherence. Simply put, caches talk to each other to prevent any data inconsistency issues. Cache coherence scales very poorly.


## Cacheline Thrashing / False Sharing
- Multiple threads accessing the same cache block can cause that cache block to jump from core to core, which degrades performance
	- Can fix with padding to isolate the individual data members accessed by each cache, but is not very memory efficient

## Cores/Compilers are complex
- Can reorder instructions and run multiple at once
- Compilers can reorder instructions as well

## Barriers
- Ensure that all threads have gotten to a certain point



