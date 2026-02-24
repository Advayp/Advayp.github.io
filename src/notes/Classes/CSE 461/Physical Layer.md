- How signals are used to translate to and from digital bits to analog signals

## Coding and Modulation
- Non-Return to Zero: high voltage represents a one, low voltage represents a zero
	- Clock recovery: receive needs frequent signal transitions to determine bit boundaries
- Return to Zero: high v is a 1, low v is a 0, then go back to 0V for a reset
	- Wastes half the slots
- 4B/5B: Map every 4 bits to 5 bits without long runs of zeroes
	- has at most 3 zeroes in a row
	- Invert signal level on a 1 to break up long runs of 1s

## Passband Modulation
- Can transmit bits by shifting amplitude, frequency, and phase 
	- Change all at the same time to get the highest bitrate 
  
## Link Model
- Rate in bits/second
- Delay in seconds, related to the length
- L = M/R + D
	- L = latency
	- M = number of bits to send
	- R = rate in bits per second
	- D = delay in seconds

## Message Latency
- First bit on wire -> the final bit arriving at destination
- Transmission Delay
	- M bits / R bits/sec
- Propagation Delay
	- Length / speed of signals

## Types of Media
- Media propagate signals that carry bits of information
- Wires (Twisted Pair)
	- Common, used in LANs and telephone lines
- Wires Coaxial Cable
	- Common, better shielding for better performance
- Fiber
	- Long, thin, pure strands of glass
	- Very fast over long distances
	- two variations: multi-mode (shorter, cheaper), and single-mode (up to 100 km)
- Wireless
	- Sender radiates signal over a region
	- Sends in many directions, which means any one can pick up on it
	- Nearby signals can interfere, which means you need to coordinate use 
	- Operate at different frequencies, so you can use frequencies to distinguish between different wireless signals
	- Tradeoff between frequencies: The higher the frequency, the greater the bandwidth, but the lower the range
		- Lowered range is due to the fact that higher frequencies have a hard time going through walls.
	- Interference only occurs on the same frequency
	- Multipath Problem: signals bounce off objects and take multiple paths, results in constructive/destructive interference

## Theoretical Limits
- Definitions
	- bandwidth is defined as the max frequency minus the min frequency
- Key channel properties
	- Bandwidth (B)
	- Signal power (S)
	- Noise power (N)

- Signal to Noise Ratio: 10 log_10 (S/N)
- Shannon Capacity: C = B log_2 (1 + S/N)

