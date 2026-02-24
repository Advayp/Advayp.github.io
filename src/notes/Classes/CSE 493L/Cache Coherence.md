- In multi-core systems, the same cache line can be stored in multiple places
- Need to make sure modifications in a cache with a write-back policy are consistent
- Consistency model:
	- Write propagation: each write must eventually be seen by later reads from all processors
	- Write serialization: for each memory location, there's a global ordering of writes that agrees with each cache

## MSI Protocol
- A cache can only modify a line if no other cache has a copy of it
- Each cache slot has metadata to determine if it can be modified
	- M: Modified, can freely modified
	- S: Shared, this line exists in many caches. Read-only
	- I: Invalid, this cache slot doesn't have a line
- Implementation
	- Snooping: Each cache listens to memory requests made to other caches. It then invalidates its own lines to uphold MSI. Messages sent via a shared bus.
		- lower latency, simpler hardware
		- Use snoop filters in practice, that are mini-directories on the shared bus. 
	- Directory: Cache sends transition requests to a memory controller. Memory controller tracks the states of lines in all caches, sending requests to all caches to uphold MSI. 
		- scales better with hundreds of processors
		- no shared bus arbitration

## Extending MSI
- Add more states to drop more requests
- E: Exclusive, only in one cache, but matches memory
- O: Owned, only one copy
- E
	- On a cache read, if no other caches have this line, transitions I->E
	- On write, silently upgrades E->M without sending any messages
	- On evict E, no writeback is needed
	- When another cache requests a read, downgrades E -> S, and replies with the line
- O
	- A read from a different core following a write forces a writeback
	- When cache 2 reads, cache 1 transfers its line, without writing back memory. Cache 1 marks the line as O, cache 2 marks it as shared
	- Cache with line as O is responsible for writeback to memory