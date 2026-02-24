- Prove program never reaches a bad state, and that it always reaches a good state
- Want to model check because threads are non-deterministic, which means our tests might not cover every possible execution

## Safety and Liveness
- Safety: Something bad will never happen
	- No path to any bad state
- Liveness: Something good will always happen
	- Every path must end in a good state
	- No cycles in the state graph

## State Reduction Techniques
- Assumptions
	- We only care about semantic correctness, so we only need to analyze thread-level interleavings.
- Symmetry
	- If the instructions are the same on each thread, we don't care which thread runs first
- Abstraction
	- Model memory instead of instructions
	- State is an assignment to each variable
- Data Independence
	- Only look at particular values that would cause a change to behavior, as opposed to every single value
- Equivalent State Detection
	- Merge identical states into one node
	- Hash state to do this, pointers can be difficult though
- Rust-specific state reduction
	- In Rust, threads can only impact each other at synchronization primitives
	- State contains all variables and an unordered set of all synchronization primitives by each thread
	- Transition can only happen for valid paths through the program, but each synchronization primitive can switch to any other thread
