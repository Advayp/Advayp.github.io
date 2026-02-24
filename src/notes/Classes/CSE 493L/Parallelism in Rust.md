**Inherited Mutability Pattern**: Mutability xor aliasing. Mutability is passed down to struct fields (that's the inheritance portion of it).

## RefCell
- Provides an interior mutability pattern
- Checks borrow rules at runtime instead of compile time
- Panics if we violate one of these rules

## std::thread
- thread::spawn: takes in a closure and spawns a new thread running it
	- Returns a join handle which can later be .join'd
- Arc is an Rc but with an atomic reference count
	- Can share Arc across threads (immutable only if not using anything else)

## Send & Sync
- If T: Send, then t can be sent (ownership transferred) across threads
- If T: Sync, then &t can be sent across threads
- Examples
	- RefCell is Send but not Sync. Can transfer ownership to a new thread, but cant share between threads
	- Rc is not Send or Sync
	- Arc is Send and Sync if the inner type is Send and Sync
	- Mutex: thread-safe interior mutability. mutex.lock gives you a mutable reference to the inner data.

Poisoned Mutex: If a thread panics while holding a Mutex, the mutex will be unlocked, but data may be in an inconsistent state.