---
title: "Ionic Memristor-based Reservoir Computing: A Review"
date: "2024-06-04"
tags:
  - "research"
  - "neuromorphic"
description: "Review of reservoir computing with ionic memristors—fundamentals, MRC, and applications."
image: "/images/covers/2024-06-04-ionic-memristor-reservoir-computing-review.jpg"
---

## Abstract

Reservoir Computing (RC) has emerged as a robust computational paradigm,
particularly effective for processing temporal or sequential
data [1].
Leveraging the dynamics of recurrent neural networks, RC simplifies the
learning process, making it suitable for edge computing
[2] and real-time
applications for various material systems
[3]
[4]
[5]
[6]. Recent
advancements have seen the integration of memristor technology into RC,
with Ionic Memristor-based Reservoir Computing (Ionic MRC) standing out
due to its unique properties in biocompatibility. This review delves
into the fundamentals of RC, the evolution and advantages of
memristor-based RC, and the significant potential of Ionic MRC in
various applications.

## Introduction

Neuromorphic devices, inspired by the architecture and functionality of
the human brain, represent a significant shift from traditional von
Neumann computing architectures. In von Neumann systems, data storage
and processing occur separately, leading to inefficiencies in real-time
processing, especially for large datasets. Neuromorphic systems, in
contrast, offer real-time processing capabilities, low power
consumption, and the ability to handle large data sizes efficiently.

Neuromorphic devices encompass a diverse range of hardware platforms,
such as organoids
[7],
memcapacitors [8]
, photonic modules
[9]
[10]
[11] ,
silicon-based hardware
[12] and emerging
memory devices
[13]
[14]
[15]. Organoids,
formed from stem cells, replicate essential features of brain
architecture and function. These miniaturized brain-like structures
facilitate the creation of "Brainoware," which performs computation by
mimicking neuronal network dynamics through the organization of neurons
and synaptic connections
[7].
Memcapacitors integrate memory and capacitance properties, enabling the
emulation of synaptic plasticity and the storage of information through
dynamic electrical characteristics
[8]. Photonic
modules utilize light for computation, offering high-speed data
processing capabilities with low power consumption, exploiting the
parallelism and bandwidth of optical signals for complex tasks
[9]
[10]
[11].
Silicon-based hardware, compatible with complementary
metal–oxide–semiconductor (CMOS) technology, requires complex designs
involving multiple devices to emulate neuronal functions, resulting in
increased design complexity and energy consumption
[12]. In
contrast, emerging memory devices like memristors offer a more efficient
alternative by allowing information storage and processing within a
single device
[16]
[17]. This
capability enables the simulation of complex neural processes like
multi-level responses, dendritic integration, and event-based data
processing, mimicking the dynamic characteristics of biological synapses
[18].

Ionic neuromorphic devices are particularly promising for mimicking the
sensory and computational systems of living organisms, which rely on ion
activity [16].
Ionic neuromorphic devices leverage ionic transport mechanisms to
perform functions similar to synapses and neurons. Ionic devices can be
classified into two main types: two-terminal devices, such as ion
memristors, and three-terminal devices like electrolyte-gated
transistors (EGTs)
[19]. Ion
memristors, for instance, utilize redox processes to modulate
resistance, enabling them to mimic synaptic plasticity. In these
devices, the migration of metal ions under an electric field can create
or dissolve conductive filaments, altering the device's resistance state
[20]. This
characteristic allows them to emulate both short-term and long-term
plasticity found in biological systems. Three-terminal devices, like
EGTs, offer more precise control over conductivity modulation through an
external gate terminal
[20]. These
devices can form highly interconnected neural networks, crucial for
implementing complex neuromorphic systems. Moreover, the separation of
input and output paths in these devices reduces interference, enhancing
the design of multi-input systems.

A significant aspect of neuromorphic computing, including the use of
ionic neuromorphic devices, is the adoption of Reservoir Computing (RC).
RC is a powerful computational paradigm that simplifies the learning
process by utilizing a dynamic reservoir to transform inputs into
high-dimensional representations. This method is especially advantageous
in addressing challenges like catastrophic forgetting, where new data
interferes with previously learned information in traditional neural
networks [21].
RC's architecture, which leverages a fixed, randomly interconnected
network (the reservoir), is particularly well-suited for physical
implementations, including memristor and ionic-based devices.

For ionic neuromorphic devices, the RC approach is not only well-matched
but also one of the most feasible methods to implement. The non-linear
and memory-retentive properties of ionic devices make them ideal
candidates for creating reservoirs that can efficiently handle temporal
data and complex signal processing tasks. This synergy enhances the
potential of ionic memristor-based RC systems to revolutionize
neuromorphic computing, offering new pathways for the development of
efficient, adaptive, and scalable computational architectures. Ionic
memristor-based RC has become a valuable tool to handle temporal signal
processing [8]
[14], motion
recognition [8]
[22] and
analyzing nonlinear dynamics or chaotic systems
[8,15].

## Reservoir Computing

Reservoir Computing (RC) simplifies Recurrent Neural Networks (RNNs) by
utilizing a fixed, randomly interconnected network, termed the
reservoir. The reservoir acts as a dynamic processor for input signals,
projecting them into a high-dimensional space where temporal patterns
are easier to analyze. This approach simplifies training to adjusting
the readout weights, which linearly transform the reservoir's state into
the desired output. RC has demonstrated substantial reductions in the
computational cost of learning, making it a promising solution for
developing edge devices for temporal pattern classification, prediction,
and
generation[23].

RC is derived from the principles of Recurrent Neural Networks (RNNs),
independently conceptualized through Echo State Networks (ESN) by Jaeger
[1]
[24] and Liquid
State Machines (LSM) by Maass
[25]. The Echo
State Network (ESN), which represents a generalization of the RC
framework to tree-structured data, is characterized by their 'echo
state' property, which ensures that the network state is uniquely
determined by past inputs, making them powerful tools for modeling
memory in time series
[24]. The Liquid
State Machine (LSM), which employs spiking neurons to create a liquid or
reservoir, is particularly adept at processing time-varying patterns,
due to its ability to preserve the temporal structure of the inputs
within the high-dimensional state space of the reservoir
[25].

![Principle of Reservoir Computing](/assets/notes/ionic-memristor-rc/image1.png)

*Figure 1. Principle of Reservoir Computing [26]*

The foundational models utilize a non-linear, high-dimensional system
and simplify the computational process to primarily train a simple
readout layer to interpret the reservoir's state for output generation.
Here we take ESNs as an example.

ESNs are a prominent implementation of RC, characterized by their
ability to maintain the "echo" of input signals through their dynamic
reservoir states. The architecture of an ESN comprises three main
components. Input Layer receives external input signals and maps them
into the reservoir. The input weight matrix ($W_{in}$)
determines the influence of the input signals on the reservoir
states. The reservoir layer is a high-dimensional, dynamic system of
recurrently connected nodes. These nodes interact in a non-linear
fashion, creating a rich set of dynamics that transform the input
signals into a higher-dimensional space. The internal connections are
defined by the recurrent weight matrix ($W$). The output layer
produces the desired output by linearly combining the states of the
reservoir nodes. The output weights ($W_{out}$) are the only
parameters adjusted during training, simplifying the learning process.

The state of the reservoir is updated at each time step according to the
following state update equation:

$$
x(n + 1) = f(W_{in}u(n + 1) + Wx(n) + W_{back}y(n))
$$

where:

- $x(n)$ is the state vector of the reservoir at time step $n$.
- $u(n)$ is the input vector at time step $n$.
- $W_{in}$ is the input weight matrix.
- $W$ is the recurrent weight matrix of the reservoir.
- $W_{back}$ is the feedback weight matrix, if output feedback is used.
- $f$ is the activation function, typically a sigmoid or hyperbolic tangent.

The output of the ESN is computed as:

$$
y(n + 1) = f_{out}(W_{out}[u(n + 1), x(n + 1), y(n)])
$$

where:

- $y(n + 1)$ is the output vector at time step $n + 1$.
- $W_{out}$is the output weight matrix.
- $f_{out}$ is the output activation function.

The output layer uses the current input, the updated reservoir state,
and optionally, the previous output to generate the new output.

The echo state property ensures that the reservoir's state is uniquely
determined by the input history, meaning that the influence of initial
conditions vanishes over time. Formally, for a network with no output
feedback: $x(n) = E(u(n), u(n - 1), \ldots)$, where $E$ is a function
mapping the input history to the reservoir state. This property is
crucial for the stability and predictability of the ESN. Training an ESN
involves adjusting only the output weights ($W_{out}$) through a
linear regression task to minimize the error between the predicted
outputs and the actual target outputs. The objective function for
training is $\min_{W_{out}}\sum_n (y_{teach}(n) - y(n))^2$, where $y_{teach}(n)$ is the target output at time step $n$.

The field of RC has evolved over time to include various forms such as
3D-integrated multilayered physical reservoir array, Deep Reservoir
Computing and Quantum Reservoir Computing. Deep Reservoir Computing
extends the RC framework towards deep learning, drawing inspiration from
the complex neural pathways found in the brain, enabling hierarchical
processing of temporal data and exploring the role of layered
composition in recurrent neural networks
[27]
[28]. On the
other hand, Quantum Reservoir Computing leverages the nonlinear nature
of quantum mechanical interactions to form reservoirs and represents an
emerging field that combines machine learning with quantum devices,
leading to new research in quantum neuromorphic computing
[29].

## Memristor-based Reservoir Computing (MRC)

Memristor-based reservoir computing (MRC) represents an innovative
extension of the reservoir computing (RC) paradigm by incorporating
memristors into the reservoir. Memristors, as two-terminal devices with
resistance that varies based on the history of applied voltage and
current, are particularly suited for mimicking the synaptic functions
found in neural networks. This property, combined with their inherent
non-linearity and memory retention capabilities, makes them ideal for
constructing high-dimensional dynamic reservoirs crucial for various
computing applications.

One of the primary advantages of MRC is its low power consumption while
maintaining high efficiency in temporal signal processing tasks
[14]. Unlike
traditional CMOS-based systems, MRC systems can operate with
significantly reduced energy requirements, making them ideal for
battery-powered and energy-efficient devices. For instance, dynamic
memristors have demonstrated low energy consumption while maintaining
high efficiency in temporal signal processing tasks
[14]. In the
context of increasing emphasis on energy efficiency, the deployment of
memristors in RC systems offers a sustainable solution for various
computing applications. Additionally, the non-volatility of some
memristors allows them to retain their state without continuous power,
reducing the energy needed for data storage. This feature not only
conserves energy but also ensures data persistence during power outages
[30]
[31], which is
particularly beneficial for applications requiring reliable long-term
data retention, such as neuromorphic computing and storage systems
[32]
[2].

Another strength of MRC is its scalability, which is particularly
advantageous for the development of compact and efficient computing
systems, which are crucial for modern applications in edge computing and
the Internet of Things (IoT). These devices can be fabricated at a
nanoscale, enabling high-density integration and 3D arrays
[33]. The ability
to integrate a large number of memristors into a small area without
compromising functionality is a critical factor in advancing RC
technologies
[34].

To ionic memristors, their biocompatibility and low Young’s modulus
opens new avenues for integrating these devices into bio-compatible
systems and medical applications. This feature is particularly promising
for interfacing electronic devices with biological systems, potentially
revolutionizing fields such as medical diagnostics and treatment. For
example, future applications of ionic memristors could use sodium ions,
potassium ions or calcium ions to contact soft tissues, like neurons or
muscle cells, to record or control directly by ions but electrical
stimulation.

The enhanced dynamic capabilities of ionic memristors make MRC
particularly suitable for tasks requiring temporal processing.

**Speech Recognition.** MRC systems can significantly improve the
performance of RC in speech recognition tasks. By leveraging the complex
dynamics of ionic transport mechanisms, these systems can more
accurately model and interpret the temporal patterns in spoken language,
leading to higher accuracy in speech recognition
applications.[35]
[6]
[36]

**Finger Motion Recognition and Handwritten Digit Recognition.** The
enhanced dynamic behavior of ionic memristors is particularly beneficial
for recognizing complex finger motions or MNIST images
[37]
[37]. By
accurately modeling the intricate temporal patterns associated with
finger movements on hand, ionic MRC systems can provide following
precise and responsive motion recognition, which is critical for
applications in prosthetics and human-computer interaction
[18]. The ability
of Ionic MRC systems to process time-series data effectively also makes
them suitable for tasks such as handwritten digit recognition. These
systems can capture and interpret the dynamic patterns in handwritten
inputs, providing robust and accurate recognition capabilities.

**Biological Signal Monitoring.** The use of ionic memristors in IMRC
systems presents a promising solution for real-time biosignal monitoring
and pattern recognition. This has been demonstrated by classifying four
classes of arrhythmic heartbeats with an accuracy of 88%
[38] and
identification of epilepsy-related neural signals with an accuracy of
93.46% [39]. The
biocompatible nature of these systems allows for seamless integration
with body fluids and biological tissues, paving the way for
ultra-low-power consumption hardware-based artificial neural networks.
This capability is crucial for early detection of malign patterns in
patients’ biological signals, which can save millions of lives by
enabling real-time clinical applications beyond offline evaluations.

## System Implementation and Performance

![Classification and implementation of memristor-based reservoir computing systems](/assets/notes/ionic-memristor-rc/image2.png)

*Figure 2. Classification and Implementation of Memristor-based Reservoir Computing Systems. (a) Fully Digital RC Systems. (b) Hybrid RC systems: Sensor-reservoir integrated systems. (c) Hybrid RC systems: Reservoir systems. (d) Hybrid RC systems: Reservoir-output integrated systems. (e) Fully Analog RC Systems.*

Following the initial demonstration of memristor-based reservoir
computing (RC) systems
[34] various
implementations of RC systems are broadly categorized into fully
digital, hybrid, and fully analog designs due to differences in sensory,
reservoir computational and read-out layers. Sensory and reservoir
computational layers are able to be combined by ionic devices. Most
read-out layers are digital processes which are more convenient to
analyze and store.

Fully digital RC systems utilize all digital components after
analogue-to-digital converters, as Fig. 2a. In light of constraints
associated with large-scale integration and device testing conditions,
some research initiatives have capitalized on the distinctive response
curves characteristic of various memristors to parameterize the
reservoir. By employing simulation techniques, these studies aim to
validate the capabilities of their devices. This approach is
instrumental in navigating the limitations posed by physical
experimentation, thereby offering a viable pathway to assess and
optimize the performance of memristive components within computing
systems. These systems are adept at minimizing noise interference, offer
enhanced operability at input and output interfaces and also facilitate
the integration with other algorithmic processing methods, thereby
enabling a synergistic improvement in computational efficiency
[40].

Hybrid RC systems are differentiated into three subtypes:
sensor-reservoir integrated systems, reservoir systems and
reservoir-output integrated systems.

Sensor-reservoir integrated systems, as Fig. 2b, according to the unique
physical properties of the target system, explored the use of sensors
with memristive properties, facilitating a direct connection between the
sensor and the reservoir. This approach allows external physical
(analog) signals to be input directly into the reservoir without
undergoing the conventional processing and regeneration by sensors,
thereby streamlining system operations and increasing efficiency
[41] .

Reservoir systems, as Fig. 2c, only utilize memristors as reservoir
layers [14,42],
providing a straightforward approach to leveraging memristor dynamics.

In reservoir-output integrated systems, as Fig. 2d, reservoir lawyers and
output lawyers are combined. Volatile memristors are utilized to
construct the reservoir layer, capitalizing on their dynamic response to
electrical stimuli for the real-time processing of signals. In contrast,
non-volatile memristors are selected for the readout layer, leveraging
their ability to retain information over time without power, which is
pivotal for the stable output of processed
signals[13].

Fully analog RC systems represent a convergence of sensor, reservoir,
and output in a singular, as Fig. 2d, unified system, facilitating direct
signal transmission and processing across the network without the need
for signal conversion or buffering. This design principle holds the
promise of executing real-time spatiotemporal signal processing with
lower power requirements and reduced hardware investment relative to
digital or hybrid
systems[43].

## Discussion and Conclusion

Reservoir computing, originally developed to mitigate the constraints of
early computational systems, remains a cornerstone in neuromorphic
computing, particularly when utilizing memristor-based devices. The
primary appeal of memristor-based Reservoir Computing (MRC) lies in its
ability to use memristors' inherent properties—such as non-linearity and
memory retention—to simulate synaptic functions. However, the
computational power of these systems is still limited, necessitating the
use of reservoir computing to manage their capabilities. The readout
layer, which outputs digital signals, remains a critical area for
improvement, with advancements in precision largely dependent on the
development of sophisticated algorithms.

The unique properties of memristors, including their ability to mimic
synaptic plasticity, make them valuable for short-term memory functions.
However, they are not yet capable of complex information processing akin
to that found in biological systems. The operational characteristics of
memristors are largely dictated by the materials used, rather than being
designed by researchers, posing challenges in achieving precise and
dynamic regulation of the reservoir's internal nodes.

Ionic MRC takes this technology a step further by employing ionic
transport mechanisms. This approach not only enhances dynamic behavior
but also offers biocompatibility, making it suitable for integration
into bio-compatible devices and medical applications. However, the
practical application of ionic signals as direct mediators in biological
interactions remains limited. The primary issue is the finite number of
ions, which constrains device longevity and consistency in signal
interactions. While ionic memristors can control the release of larger
drug molecules, this function is more regulatory than communicative,
limiting their application scope.

Despite these challenges, Ionic MRC presents numerous advantages, such
as the ability to process sophisticated temporal patterns, making it
highly effective in applications like speech recognition, predictive
modeling, and complex signal processing. The simplified fabrication
process, due to the non-requirement of extensive training for reservoir
nodes, further enhances its commercial viability.

In conclusion, ionic MRC represents a significant breakthrough in the
field of neuromorphic computing. The unique attributes of ionic
memristors, including biocompatibility and enhanced dynamic responses,
position them as promising components in a wide range of innovative
applications. The potential for these systems to revolutionize fields
such as medical technology and artificial intelligence is substantial,
as they offer more efficient, adaptable, and integrated computing
solutions.

Future research directions will likely focus on addressing current
challenges, such as ensuring the long-term stability and reliability of
ionic memristors, managing variability in their electrical properties,
and developing scalable manufacturing processes. Additionally, exploring
new material systems and device architectures could further enhance the
performance of Ionic MRC systems. The biocompatibility of these devices
opens up new avenues for hybrid bio-electronic systems, potentially
enabling direct interfacing with living tissues for responsive and
adaptive medical devices. Moreover, MRC systems show significant
potential in future applications, including advanced communication
networks, optical networks, IoT, green data centers, intelligent
robotics, and AI-driven simulations
[26].

Overall, while the technology is still in its developmental stages, the
potential impact of Ionic MRC on various industries is immense.
Interdisciplinary collaboration and continued innovation will be crucial
in overcoming existing limitations and fully realizing the
transformative potential of this emerging technology.

## References

1. Jaeger, H.; Haas, H.Harnessing Nonlinearity: Predicting Chaotic Systems and Saving Energy in Wireless Communication. *Science* **2004**, *304* (5667), 78–80. https://doi.org/10.1126/science.1091277.

2. Hossain, M. R.; Najem, J. S.; Rahman, T.; Hasan, M. S. Reservoir Computing System Using Biomolecular Memristor. In *2021 IEEE 21st International Conference on Nanotechnology (NANO)*; 2021; pp 116–119. https://doi.org/10.1109/NANO51122.2021.9514305.

3. Ding, G.; Chen, R.-S.; Xie, P.; Yang, B.; Shang, G.; Liu, Y.; Gao, L.; Mo, W.-A.; Zhou, K.; Han, S.-T.; Zhou, Y. Filament Engineering of Two-Dimensional h-BN for a Self-Power Mechano-Nociceptor System. *Small* **2022**, *18* (16), 2200185. https://doi.org/10.1002/smll.202200185.

4. Lao, J.; Yan, M.; Tian, B.; Jiang, C.; Luo, C.; Xie, Z.; Zhu, Q.; Bao, Z.; Zhong, N.; Tang, X.; Sun, L.; Wu, G.; Wang, J.; Peng, H.; Chu, J.; Duan, C. Ultralow-Power Machine Vision with Self-Powered Sensor Reservoir. *Adv. Sci.* **2022**, *9* (15), 2106092. https://doi.org/10.1002/advs.202106092.

5. Sun, L.; Wang, Z.; Jiang, J.; Kim, Y.; Joo, B.; Zheng, S.; Lee, S.; Yu, W. J.; Kong, B.-S.; Yang, H. In-Sensor Reservoir Computing for Language Learning via Two-Dimensional Memristors. *Sci. Adv.* **2021**, *7* (20), eabg1455. https://doi.org/10.1126/sciadv.abg1455.

6. Moon, J.; Ma, W.; Shin, J. H.; Cai, F.; Du, C.; Lee, S. H.; Lu, W. D. Temporal Data Classification and Forecasting Using a Memristor-Based Reservoir Computing System. *Nat. Electron.* **2019**, *2* (10), 480–487. https://doi.org/10.1038/s41928-019-0313-3.

7. Cai, H.; Ao, Z.; Tian, C.; Wu, Z.; Liu, H.; Tchieu, J.; Gu, M.; Mackie, K.; Guo, F. Brain Organoid Reservoir Computing for Artificial Intelligence. *Nat. Electron.* **2023**, *6* (12), 1032–1039. https://doi.org/10.1038/s41928-023-01069-w.

8. Pei, M.; Zhu, Y.; Liu, S.; Cui, H.; Li, Y.; Yan, Y.; Li, Y.; Wan, C.; Wan, Q. Power-Efficient Multisensory Reservoir Computing Based on Zr-Doped HfO2 Memcapacitive Synapse Arrays. *Adv. Mater. n/a* (n/a), 2305609. https://doi.org/10.1002/adma.202305609.

9. Duport, F.; Schneider, B.; Smerieri, A.; Haelterman, M.; Massar, S. All-Optical Reservoir Computing. *Opt. Express* **2012**, *20* (20), 22783–22795. https://doi.org/10.1364/OE.20.022783.

10. Vandoorne, K.; Mechet, P.; Van Vaerenbergh, T.; Fiers, M.; Morthier, G.; Verstraeten, D.; Schrauwen, B.; Dambre, J.; Bienstman, P. Experimental Demonstration of Reservoir Computing on a Silicon Photonics Chip. *Nat. Commun.* **2014**, *5* (1), 3541. https://doi.org/10.1038/ncomms4541.

11. Sande, G. V. der; Brunner, D.; Soriano, M. C. Advances in Photonic Reservoir Computing. *Nanophotonics* **2017**, *6* (3), 561–576. https://doi.org/10.1515/nanoph-2016-0132.

12. Müller, J.; Ballini, M.; Livi, P.; Chen, Y.; Radivojevic, M.; Shadmani, A.; Viswam, V.; Jones, I. L.; Fiscella, M.; Diggelmann, R.; Stettler, A.; Frey, U.; Bakkum, D. J.; Hierlemann, A. High-Resolution CMOS MEA Platform to Study Neurons at Subcellular, Cellular, and Network Levels. *Lab. Chip* **2015**, *15* (13), 2767–2780. https://doi.org/10.1039/C5LC00133A.

13. Zhong, Y.; Tang, J.; Li, X.; Liang, X.; Liu, Z.; Li, Y.; Xi, Y.; Yao, P.; Hao, Z.; Gao, B.; Qian, H.; Wu, H. A Memristor-Based Analogue Reservoir Computing System for Real-Time and Power-Efficient Signal Processing. *Nat. Electron.* **2022**, *5* (10), 672–681. https://doi.org/10.1038/s41928-022-00838-3.

14. Zhong, Y.; Tang, J.; Li, X.; Gao, B.; Qian, H.; Wu, H. Dynamic Memristor-Based Reservoir Computing for High-Efficiency Temporal Signal Processing. *Nat. Commun.* **2021**, *12* (1), 408. https://doi.org/10.1038/s41467-020-20692-1.

15. Schaetti, N.; Salomon, M.; Couturier, R. Echo State Networks-Based Reservoir Computing for MNIST Handwritten Digits Recognition. In *2016 IEEE Intl Conference on Computational Science and Engineering (CSE) and IEEE Intl Conference on Embedded and Ubiquitous Computing (EUC) and 15th Intl Symposium on Distributed Computing and Applications for Business Engineering (DCABES)*; 2016; pp 484–491. https://doi.org/10.1109/CSE-EUC-DCABES.2016.229.

16. Matrone, G. M.; van Doremaele, E. R. W.; Surendran, A.; Laswick, Z.; Griggs, S.; Ye, G.; McCulloch, I.; Santoro, F.; Rivnay, J.; van de Burgt, Y. A Modular Organic Neuromorphic Spiking Circuit for Retina-Inspired Sensory Coding and Neurotransmitter-Mediated Neural Pathways. *Nat. Commun.* **2024**, *15* (1), 2868. https://doi.org/10.1038/s41467-024-47226-3.

17. Laswick, Z.; Wu, X.; Surendran, A.; Zhou, Z.; Ji, X.; Matrone, G. M.; Leong, W. L.; Rivnay, J. Tunable Anti-Ambipolar Vertical Bilayer Organic Electrochemical Transistor Enable Neuromorphic Retinal Pathway. *Nat. Commun.* **2024**, *15* (1), 6309. https://doi.org/10.1038/s41467-024-50496-6.

18. Cho, H.; Lee, I.; Jang, J.; Kim, J.-H.; Lee, H.; Park, S.; Wang, G. Real-Time Finger Motion Recognition Using Skin-Conformable Electronics. *Nat. Electron.* **2023**. https://doi.org/10.1038/s41928-023-01012-z.

19. Shao L.; Zhao Y.; Liu Y. Organic Synaptic Transistors: The Evolutionary Path from Memory Cells to the Application of Artificial Neural Networks. https://doi.org/10.1002/adfm.202101951.

20. Dai, S.; Liu, X.; Liu, Y.; Xu, Y.; Zhang, J.; Wu, Y.; Cheng, P.; Xiong, L.; Huang, J. Emerging Iontronic Neural Devices for Neuromorphic Sensory Computing. *Adv. Mater.* **2023**, *35* (39), 2300329. https://doi.org/10.1002/adma.202300329.

21. Zhang, H.-T.; Park, T. J.; Islam, A. N. M. N.; Tran, D. S. J.; Manna, S.; Wang, Q.; Mondal, S.; Yu, H.; Banik, S.; Cheng, S.; Zhou, H.; Gamage, S.; Mahapatra, S.; Zhu, Y.; Abate, Y.; Jiang, N.; Sankaranarayanan, S. K. R. S.; Sengupta, A.; Teuscher, C.; Ramanathan, S. Reconfigurable Perovskite Nickelate Electronics for Artificial Intelligence. *Science* **2022**, *375* (6580), 533–539. https://doi.org/10.1126/science.abj7943.

22. Zhong, Y.; Tang, J.; Li, X.; Liang, X.; Liu, Z.; Li, Y.; Xi, Y.; Yao, P.; Hao, Z.; Gao, B.; Qian, H.; Wu, H. A Memristor-Based Analogue Reservoir Computing System for Real-Time and Power-Efficient Signal Processing. *Nat. Electron.* **2022**, *5* (10), 672–681. https://doi.org/10.1038/s41928-022-00838-3.

23. Tanaka, G.; Yamane, T.; Héroux, J. B.; Nakane, R.; Kanazawa, N.; Takeda, S.; Numata, H.; Nakano, D.; Hirose, A. Recent Advances in Physical Reservoir Computing: A Review. *Neural Netw.* **2019**, *115*, 100–123. https://doi.org/10.1016/j.neunet.2019.03.005.

24. Jaeger, H. The “Echo State” Approach to Analysing and Training Recurrent Neural Networks-with an Erratum Note. *Bonn Ger. Ger. Natl. Res. Cent. Inf. Technol. GMD Tech. Rep.* **2001**, *148* (34), 13.

25. Maass, W.; Natschläger, T.; Markram, H. Real-Time Computing Without Stable States: A New Framework for Neural Computation Based on Perturbations. *Neural Comput.* **2002**, *14* (11), 2531–2560. https://doi.org/10.1162/089976602760407955.

26. Yan, M.; Huang, C.; Bienstman, P.; Tino, P.; Lin, W.; Sun, J. Emerging Opportunities and Challenges for the Future of Reservoir Computing. *Nat. Commun.* **2024**, *15* (1), 2056. https://doi.org/10.1038/s41467-024-45187-1.

27. Canaday, D.; Pomerance, A.; Gauthier, D. J. Model-Free Control of Dynamical Systems with Deep Reservoir Computing. *J. Phys. Complex.* **2021**, *2* (3), 035025. https://doi.org/10.1088/2632-072X/ac24f3.

28. Gallicchio, C.; Micheli, A. Deep Reservoir Computing. In *Reservoir Computing: Theory, Physical Implementations, and Applications*; Nakajima, K., Fischer, I., Eds.; Natural Computing Series; Springer: Singapore, 2021; pp 77–95. https://doi.org/10.1007/978-981-13-1687-6_4.

29. Ghosh, S.; Opala, A.; Matuszewski, M.; Paterek, T.; Liew, T. C. H. Quantum Reservoir Processing. *Npj Quantum Inf.* **2019**, *5* (1), 1–6. https://doi.org/10.1038/s41534-019-0149-8.

30. Chang, M.-F.; Chiu, P. Energy Efficient Systems Using Resistive Memory Devices. **2014**, 79–115. https://doi.org/10.1007/978-1-4419-9551-3_4.

31. Pal, S.; Ranjan, N. S. Design of Non-Volatile SRAM Cell Using Memristor. In *Information Systems Design and Intelligent Applications*; Satapathy, S. C., Mandal, J. K., Udgata, S. K., Bhateja, V., Eds.; Springer India: New Delhi, 2016; pp 175–183. https://doi.org/10.1007/978-81-322-2757-1_19.

32. Cao, J.; Zhang, X.; Cheng, H.; Qiu, J.; Liu, X.; Wang, M.; Liu, Q. Emerging Dynamic Memristors for Neuromorphic Reservoir Computing. *Nanoscale* **2022**, *14* (2), 289–298. https://doi.org/10.1039/D1NR06680C.

33. *3D Reservoir Computing with High Area Efficiency (5.12 TOPS/mm2) Implemented by 3D Dynamic Memristor Array for Temporal Signal Processing \| IEEE Conference Publication \| IEEE Xplore*. https://ieeexplore.ieee.org/document/9830310 (accessed 2024-07-23).

34. Kulkarni, M. S.; Teuscher, C. Memristor-Based Reservoir Computing. In *Proceedings of the 2012 IEEE/ACM International Symposium on Nanoscale Architectures*; NANOARCH ’12; Association for Computing Machinery: New York, NY, USA, 2012; pp 226–232. https://doi.org/10.1145/2765491.2765531.

35. Lilak, S.; Woods, W.; Scharnhorst, K.; Dunham, C.; Teuscher, C.; Stieg, A. Z.; Gimzewski, J. K. Spoken Digit Classification by In-Materio Reservoir Computing With Neuromorphic Atomic Switch Networks. *Front. Nanotechnol.* **2021**, *3*. https://doi.org/10.3389/fnano.2021.675792.

36. Usami, Y.; van de Ven, B.; Mathew, D. G.; Chen, T.; Kotooka, T.; Kawashima, Y.; Tanaka, Y.; Otsuka, Y.; Ohoyama, H.; Tamukoh, H.; Tanaka, H.; van der Wiel, W. G.; Matsumoto, T. In-Materio Reservoir Computing in a Sulfonated Polyaniline Network. *Adv. Mater.* **2021**, *33* (48), 2102688. https://doi.org/10.1002/adma.202102688.

37. Yao, P.; Wu, H.; Gao, B.; Tang, J.; Zhang, Q.; Zhang, W.; Yang, J. J.; Qian, H. Fully Hardware-Implemented Memristor Convolutional Neural Network. *Nature* **2020**, *577* (7792), 641–646. https://doi.org/10.1038/s41586-020-1942-4.

38. Cucchi, M.; Gruener, C.; Petrauskas, L.; Steiner, P.; Tseng, H.; Fischer, A.; Penkovsky, B.; Matthus, C.; Birkholz, P.; Kleemann, H.; Leo, K. Reservoir Computing with Biocompatible Organic Electrochemical Networks for Brain-Inspired Biosignal Classification. *Sci. Adv.* **2021**.

39. Liu, Z.; Tang, J.; Gao, B.; Yao, P.; Li, X.; Liu, D.; Zhou, Y.; Qian, H.; Hong, B.; Wu, H. Neural Signal Analysis with Memristor Arrays towards High-Efficiency Brain-Machine Interfaces. *Nat. Commun.* **2020**, *11* (1), 4234. https://doi.org/10.1038/s41467-020-18105-4.

40. Köster, F.; Patel, D.; Wikner, A.; Jaurigue, L.; Lüdge, K. Data-Informed Reservoir Computing for Efficient Time-Series Prediction. *Chaos Interdiscip. J. Nonlinear Sci.* **2023**, *33* (7), 073109. https://doi.org/10.1063/5.0152311.

41. Liu, K.; Zhang, T.; Dang, B.; Bao, L.; Xu, L.; Cheng, C.; Yang, Z.; Huang, R.; Yang, Y. An Optoelectronic Synapse Based on α-In2Se3 with Controllable Temporal Dynamics for Multimode and Multiscale Reservoir Computing. *Nat. Electron.* **2022**, *5* (11), 761–773. https://doi.org/10.1038/s41928-022-00847-2.

42. Hassan, A. M.; Li, H. H.; Chen, Y. Hardware Implementation of Echo State Networks Using Memristor Double Crossbar Arrays. In *2017 International Joint Conference on Neural Networks (IJCNN)*; 2017; pp 2171–2177. https://doi.org/10.1109/IJCNN.2017.7966118.

43. Zhang, Z.; Zhao, X.; Zhang, X.; Hou, X.; Ma, X.; Tang, S.; Zhang, Y.; Xu, G.; Liu, Q.; Long, S. In-Sensor Reservoir Computing System for Latent Fingerprint Recognition with Deep Ultraviolet Photo-Synapses and Memristor Array. *Nat. Commun.* **2022**, *13* (1), 6590. https://doi.org/10.1038/s41467-022-34230-8.