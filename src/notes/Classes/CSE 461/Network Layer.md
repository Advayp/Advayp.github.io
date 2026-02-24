- Connect different link layer networks
- **Routing**: deciding where to send a given packet
- **Forwarding**: actually sending the packet

## Network Service Models
- Datagrams (connectionless)
- Virtual circuits (connection-based, like telephones)

## Datagram Model
- Packets contain a destination address, which routers use to forward it 

 - As long as you implement IP, you can be part of the internet

## IPv4
- Includes various fields to meet basic needs (version, header, total length, protocol, header checksum)
- Includes an address for the source and destination
- Addresses
	- v4 uses 32 bit addresses (not enough, so everyone transitioned to ip v6)
	- Written in dotted notation (i.e., four 8 bit numbers separated by dots)

## IP Prefixes
- Addresses are allocated in blocks called prefixes
- Addresses with an L-bit prefix have the same first L bits
	- Results in 2^{32 - L} addresses for that prefix
- Written in  IP address/length notation
	- Address is lowest address in the prefix, length is prefix bits
	- E.g., 128.13.0.0/16
		- 128.13 is the fixed prefix, 0.0 is the part that's free to change
- Prefixes were classified into different classes
	- Class A, first 8 bits fixed, starts with 0
	- Class B, first 16 bits fixed, starts with 10
	- Class C, first 24 bits fixed, starts with 110

## IP Forwarding
- Prefixes let router forwarding tables scale really well. It only needs to keep track of the various prefixes, as opposed to the addresses themselves.
- Prefixes in the table might overlap, so to route a packet we find the longest matching prefix and forward it to that.
	- This can be useful for load balancing reasons.

## Host/Router Distinction
- Routers do the routing, know way to all destinations
- Hosts send traffic to the nearest router


## Dynamic Host Configuration Protocol
- Problem: What is a node's IP address? What's the IP address of its router?
- Uses UDP ports 67 and 68
- Node sends a broadcast messages that's delivered to all nodes on the network. Address is all 1s.
	- Discover (above), client
	- Offer (IP address + expiration), server
	- Request (some other params), client
	- Ack, server
	- Retry until ack
- To renew, just do Request and then Ack

## Address Resolution Protocol (ARP)
- Sits on top of link layer
- Broadcast message asking "Who has IP address x.y.z.a", target node responds with ethernet address
- Used to go from ip address to ethernet address
- Only used for finding someone on the same ethernet network

## Internet Control Message Protocol (ICMP)
- Errors happen, so icmp was created to report problems
- companion protocol to ip
- Provides error reporting and testing
- When a router encounters an error, 
	- A router sends an icmp error report back to the IP source

## NAT Box
- Map internal address to a few external IP addresses
- Home computers can use private IP addresses
- Nat box makes all computers on a network look like one computer


## Tunneling
- Native IPv6 islands connected via IPv4
- One way to make IPv6 and IPv4 work together