# Scope of the Link Layer

# 2. Framing

## 2.1 The Framing Problem

## 2.2 Byte Count

- How it works
- Main failure mode
- Why re-synchronization is hard

## 2.3 Byte Stuffing

- Flag byte concept
- ESC mechanism

## 2.4 Bit Stuffing

- Flag definition (six 1s)
- Transmit rule
- Receive rule
- Compare with byte stuffing

---

# 3. Error Detection and Correction

## 3.1 Why Errors Happen

## 3.2 Error Detection vs Correction

- Redundancy concept

## 3.3 Hamming Distance

- Definition (between two codewords)
- Code distance meaning
- Detection guarantee: distance d+1
- Correction guarantee: distance 2d+1

---

# 4. Simple Error Detection

## 4.1 Parity Bit

- How computed
- What distance?
- What errors detected?
- What errors missed?

## 4.2 Internet Checksum

- Sender steps
- Receiver steps
- Strengths and weaknesses

## 4.3 CRC (Cyclic Redundancy Check)

- Generator polynomial idea
- Send procedure
- Receive procedure
- Why CRC is stronger than checksum
- CRC-32 properties:
  - HD = 4
  - Burst error detection

---

# 5. Error Correction

## 5.1 Why Correction Is Hard

## 5.2 Intuition

- Distance ≥3 → correct 1 error
- Distance ≥2d+1 → correct d errors
- Closest valid codeword mapping

## 5.3 Hamming Code

- Structure:
  - Check bits at powers of 2
  - Coverage rules
- Syndrome calculation
- Error position detection
- Single-bit correction

## 5.4 Advanced Codes

- Convolutional codes
  - Stream-based
  - Viterbi decoding
- Turbo codes
  - Multiple parity streams
  - Iterative decoding
- LDPC
  - Sparse matrices
  - Belief propagation
- Why coding theory is abstracted via Hamming distance

---

# 6. Detection vs Correction Tradeoff

- Random single-bit errors scenario
- Burst error scenario
- Overhead comparison
- When correction is better
- When detection + retransmission is better
- Where correction is used (PHY, FEC)
- Where detection is used (Link and above)

---

# 7. Retransmissions (ARQ)

## 7.1 ARQ Basics

- Sender rules
- Receiver rules
- ACKs
- Timeouts

## 7.2 ARQ Edge Cases

- Lost ACK
- Early timeout
- Duplicate frames
- Why correctness requires sequence numbers

## 7.3 Stop-and-Wait

- Single outstanding frame
- 1-bit sequence number
- Limitation with large bandwidth-delay product

## 7.4 Sliding Window

- W outstanding frames
- Throughput improvement
- Concept of pipelining

---

# 8. Multiple Access

## 8.1 Multiplexing Basics

- TDM
- FDM
- Tradeoffs
- Continuous vs bursty traffic

## 8.2 Statistical Multiplexing

- Bursty ON/OFF traffic
- Why fixed allocation is inefficient
- Demand-based sharing

---

# 9. Distributed MAC Protocols

## 9.1 ALOHA

- Send immediately
- Random retransmission
- Efficiency limits (18%, 36% slotted)

## 9.2 CSMA

- Carrier sensing
- Why collisions still occur (propagation delay)
- BD impact

## 9.3 CSMA/CD

- Collision detection
- JAM signal
- 2D timing constraint
- Minimum frame size
- Binary Exponential Backoff (BEB)

## 9.4 Persistence and BEB

- Why queued senders collide
- Goal: probability ≈ 1/N
- BEB doubling window

## 9.5 Classic Ethernet (802.3)

- 1-persistent CSMA/CD
- 64-byte minimum
- CRC-32
- No ACKs

---

# 10. Wireless MAC

## 10.1 Why Wireless Is Harder

- Cannot reliably carrier sense
- Cannot collision detect
- Hidden terminals
- Exposed terminals
- Cannot hear while sending

## 10.2 MACA (RTS/CTS)

- RTS
- CTS
- Frame
- Hidden terminal solution
- Exposed terminal behavior
- Limitations

## 10.3 802.11 (WiFi)

- PHY characteristics:
  - ISM bands
  - OFDM
  - Rate adaptation
- Link layer:
  - CSMA/CA
  - BEB
  - ACK + ARQ
  - CRC-32
- Why ARQ is needed

## 10.4 Centralized MAC (Cellular)

- FDMA/TDMA
- Central coordination
- QoS constraints
- Why decentralized approach doesn’t scale

---

# 11. Switching

## 11.1 Hub vs Repeater vs Switch

- Hub: shared medium
- Repeater: amplify
- Switch: per-port forwarding

## 11.2 Switch Internals

- Input buffers
- Output buffers
- Fabric
- Full duplex
- Overload → loss

## 11.3 Backward Learning

- Learn from source address
- Forward by destination lookup
- Broadcast if unknown

## 11.4 Forwarding Loops

- Why loops cause broadcast storms
- Redundant links problem

---

# 12. Spanning Tree Protocol (STP)

## 12.1 Goal

- Eliminate loops
- Maintain connectivity

## 12.2 Algorithm Outline

1. Elect root (lowest address)
2. Compute shortest paths to root
3. Disable non-tree ports

## 12.3 Distributed Operation

- Each switch sends:
  - (self, root, distance)
- Tie-breaking rules
- Convergence behavior
- Adaptation to failures

---

# 13. Scaling the Link Layer

## 13.1 Limitations of Distributed Control

- Convergence delays
- Failure churn
- Race conditions

## 13.2 Software Defined Networking (SDN)

- Centralized controller
- Control plane vs data plane
- Global policy enforcement
- Faster failure handling
- Chicken-and-egg problem
