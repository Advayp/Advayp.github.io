## Framing
- Byte Count: Start each frame with a length field 
	- Vulnerable to corruption, OOM
- Byte Stuffing
	- Have a special flag byte to denote the start/end of a frame
	- To prevent the flag from being in the payload, escape the flag sequence. You'll have to escape the escape sequence itself as well.
- Bit Stuffing
	- Use six consecutive ones as a flag, and put a 0 after 5 consecutive ones. 
	- When receiving, ignore a 0 after 5 consecutive ones


## Error Detection and Correction
- Detection: add check bits to help detect errors
- Correction: add more check bits to let some errors be corrected
- Codeword is D data bits plus R check bits, where R = f(D), for some deterministic function f

## Automatic Reply Request (ARQ)
- Errors are common and cant sometimes be corrected, so retry after a timeout
- Receiver acknowledges frames with an ACK, sender retransmits until it receives an ack
- Use sequence numbers to handle duplicates
- Stop and wait: Dont send next frame until ack for current frame is received
- Sliding window: Send W frames per RTT, instead of just one. Move frame only when you get the acknowledgement in order.
	- Useful when RTT is high, when RTT doesn't dominate stop and wait is used

## Multiple Access
- Multiplexing: sharing a resource
	- Time division multiplexing: users take turn on a schedule
	- Frequency division multiplexing: users send different frequencies
	- TDM has idle time but good bandwidth, FDM has poor bandwidth but no idle time

## Classic Ethernet
- Improve aloha by listening for activity before transmitting (CSMA)
	- Good defense with BD-product is small
	- Collisions aren't avoided because two senders can send at the same time after hearing no activity
	- Improvement: detect collisions and backoff by aborting the rest of the frame. Retry later, use exponential backoff
		- Use a min frame length of 2D seconds, ensures that a node finishes transmitting iff no collisions occurred 
	- Wifi uses this along with a form of exponential backoff


## Binary Exponential Backoff
- Estimate probability of collision
- 1st collision: wait 0 or 1 frames
- 2nd: wait 0 or 3 frames
- 3rd: wait 0 to 7 frames

## Ethernet Frame Format
- Format
	- Preamble (from physical layer)
	- Destination
	- Source
	- Type
	- Data (0 - 1500 bytes)
	- Pad
	- Check-Sum (CRC32)
- Wired connection ensures reliability 
- Modern ethernet uses switches, not multiple access

## Wireless Multiplexing
- Problems
	- Media is infinite
	- Nodes can't hear while sending (half-duplex)
- Hidden and exposed terminals are problems at the receiver. CSMA/CD only deals with the sender, so its not a good a fit for wireless
- MACA (Multiple Access with Collision Avoidance)
	- Sender transmits a RTS (request-to-send, with frame length)
	- Receiver replies with a CTS (clear-to-send, with frame length)
	- Sender transmits the frame while nodes hearing the CTS stay silent for the frame length contained in the CTS
	- Collisions of RTS/CTS still possible, but less likely 

## Centralized MAC: Cellular
- Spectrum suddenly very scarce
- We have quality of service requirements
	- cant be as loose with expectations
	- cant have traffic fail
- We also have client/server instead of p2p
	- Centralized control by the cellular server
- GSM MAC
	- Implements division based on frequency and time
	- Use one channel for coordination
		- Called the random access channel
		- Collisions here are resolved with binary exponential backoff


## Switching
- How to connect nodes with a switch instead of multiple access
- Hosts are wired to ethernet switches with twisted pairs
	- switch serves to connect the hosts
- Three kinds of switches
	- Hub, or repeater (physical)
	- Switch (link)
	- Router (network/link)
- Inside a Hub
	- All ports are wired together, more convenient and reliable than a single shared wire
	- Repeater amplifies signal before it goes out
- Inside a Switch
	- Uses frame addresses to connect input port to the right output port. Multiple frames may be switched in parallel
	- Each port operates at full-duplex
	- Need buffers for multiple inputs to send to one output port

## Advantages of Switches
- convenient to run wires to one location
- more reliable, wire cut is not a single point of failure that's hard to find
- switches offer scalable performance

## Switch Forwarding
- Switch needs to find the right output port for the destination address in the Ethernet frame. How to do this?
	- Link-level, don't look at IP
- Backwards learning
	- Monitors traffic and looks at source nodes to determine where to send a given frame
	- Main problem with this is that it doesn't handle loops well

## Spanning Tree Solution
- Solution to the loop problem with backwards learning
- Rules:
	- all switches run the same algorithm
		- Each switch initially believes it's the root of the tree
		- Each switch sends periodic updates to neighbors with: (its address, address of the root, and distance in hops to root)
		- Short-circuit when the topology changes
	- They start with no information
	- Operate in parallel and send messages
	- Always search for the best solution
- Outline
	- Elect a root node of the tree (switch with the lowest address)
	- Grow tree as shortest distances from the root (use lowest address to break ties)
	- Turn off ports for forwarding if they aren't on the spanning tree


## Software Defined Networking
- Core idea: stop being a distributed system to fix all the problems with scaling a spanning tree
- Create a controller that pushes code, state, and config from itself to switches
	- Run link state with a global view of the network rather than in a distributed fashion
	- Easier enforcing of global policies
	- Easier to resolve failures
- Can only use when you have full control over the network topology
- OpenFlow - two different classes of programmability
	- At controller
		- can be heavy processing algorithms
		- results in messages that update switch flow table
	- At switch
		- local flow table
		- built from basic set of networking primitives
		- allows for fast operation
