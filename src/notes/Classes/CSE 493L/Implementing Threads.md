- Timer interrupts that cause threads to switch are determined by hardware
	- Use something called the LAPIC
- When an interrupt occurs, LAPIC calls a function at a known memory address. 
	- Can disable/enable interrupts using the cli/sti instructions respectively
	- Function returns back to the interrupted task

## Atomics
- `test_and_set`: atomically set the value and get the old value
- `compare_and_swap`: atomically set the value if old value is x
- `fetch_add`: atomically increment the value
- Can use any of these to implement spin locks


## SpinLock things to not do
- forget to call unlock
- Call yield while locked
- Call lock twice
- Create a cyclic dependency