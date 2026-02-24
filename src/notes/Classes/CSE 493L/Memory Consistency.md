- Can one core reorder memory operations?
- Do all cores have to see the same order of memory operations?

## Linearizability
- No core can reorder memory operations
- Cores must see the same order of memory operations, and it must match the real-time order
- Gold standard, memory behaves as if it is instant

## Weak Consistency
- Cores can reorder
- cores dont have to see the same order

## Sequential Consistency
- Each processor respects program order
- All cores still see the same order
- Memory chooses a core, performs a memory operation, and then repeats
- We aren't allowed to overlap reads and writes, as this might not respect program order


## Memory Fences
- Blocks CPU from reordering memory operations across the fence
- All memory operations must be done to pass through the fence

## Total Store Order
- Sequential Consistency + Write Queues
- Whenever you encounter a write, put it in a write queue, which memory will handle once it's ready
- Only allows the following orderings
	- R -> R
	- R -> W
	- W -> W
- This is what x86 uses

## Relaxed Consistency
- Add a load queue along with the write queue, now anything can happen in any order