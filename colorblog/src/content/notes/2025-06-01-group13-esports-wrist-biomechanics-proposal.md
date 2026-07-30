---
title: "Biomechanical Assessment of Wrist Load During Esports Mouse Use"
date: "2025-06-01"
tags:
  - "research"
  - "biomechanics"
description: "Group 13 proposal on esports mouse use, wrist kinematics, and OpenSim load simulation."
image: "/images/covers/2025-06-01-group13-esports-wrist-biomechanics-proposal.jpg"
---

**Group 13 Proposal**  
**Members:** 12210415 Wang Qi, 12212958 Sun Zerong, 12211807 Yang Jingyi, 12210552 Sun Yifan, 12210916 Ren Zhehao, 12210204 Song Da

![Flowchart of the entire project workflow](/assets/notes/group13-esports-wrist/image1.png)

*Figure 1. Flowchart of the entire project workflow: data collection, angle analysis, and OpenSim-based load calculation.*

## Research Background

The rapid growth of esports has led to prolonged mouse use, which can place sustained strain on the wrist [1, 2]. Repetitive wrist movements increase mechanical load, but the specific biomechanical impact of different mouse-use tasks and mouse designs remains unclear [3, 4]. Measuring wrist muscle activity and simulating wrist load are therefore important for improving ergonomic design and preventing overuse injuries in esports athletes [5].

## Overview of Research Methods

The overall workflow is shown in Figure 1. The experiment is divided into three main parts.

First, joint points on the hand and wrist will be marked, and two cameras will capture mouse tasks while participants maintain a natural posture. This data collection stage will provide motion information for later kinematic analysis.

Second, joint angle data will be extracted using Kinovea and processed into `.mot` files. These motion files will be used as input data for biomechanical simulation.

Third, the `.mot` files will be imported into a personalized biomechanical model in OpenSim to simulate wrist forces and tendon tension [6, 7]. The project will also compare the effects of three mouse types on wrist load and tension [8, 9].

## Anticipated Results

The results are expected to show higher wrist muscle load during fast and repetitive mouse tasks, with peak strain occurring during clicking and rapid movement. OpenSim simulations are expected to reveal increased wrist forces and tendon tension, helping identify the muscles and tendons most at risk.

When comparing mouse types, the ergonomic mouse is expected to reduce wrist strain, while the regular mouse is expected to produce higher tension. The simple ergonomic mouse may provide a moderate improvement. Subjective discomfort is also expected to correlate with simulated wrist strain: the ergonomic mouse should reduce fatigue, while the regular mouse may increase discomfort.

## Importance of the Findings

This project will provide biomechanical evidence about wrist strain in esports mouse use. The findings may guide the development of ergonomic mouse designs that reduce strain, lower injury risk, and improve long-term comfort for esports athletes and heavy computer users.

## References

[1] Tholl, C., Hansen, L., & Frobose, I. (2025). Wrist extensor fatigue and game-genre-specific kinematic changes in esports athletes: A quasi-experimental study. *BMC Sports Science, Medicine and Rehabilitation*. https://doi.org/10.1186/s13102-025-01305-0

[2] Mediouni, Z., de Roquemaurel, A., Dumontier, C., Becour, B., Garrabe, H., Roquelaure, Y., & Descatha, A. (2014). Is carpal tunnel syndrome related to computer exposure at work? A review and meta-analysis. *Journal of Occupational and Environmental Medicine*, 56(2), 204-208. https://doi.org/10.1097/JOM.0000000000000080

[3] Tholl, C., Bickmann, P., Wechsler, K., et al. (2022). Musculoskeletal disorders in video gamers: A systematic review. *BMC Musculoskeletal Disorders*, 23, 678. https://doi.org/10.1186/s12891-022-05614-0

[4] Jang, R., & Sung, F. (2018). Effects of game-setting on wrist motion and muscle fatigue. *Advances in Physical Ergonomics and Human Factors: Part I*.

[5] DiFrancisco-Donoghue, J., Balentine, J., Schmidt, G., & Zwibel, H. (2019). Managing the health of the eSport athlete: An integrated health management model. *BMJ Open Sport & Exercise Medicine*, 5(1), e000467. https://doi.org/10.1136/bmjsem-2018-000467

[6] Seth, A., Hicks, J. L., Uchida, T. K., Habib, A., Dembia, C. L., Dunne, J. J., Ong, C. F., DeMers, M. S., Rajagopal, A., Millard, M., Hamner, S. R., Arnold, E. M., Yong, J. R., Lakshmikanth, S. K., Sherman, M. A., Ku, J. P., & Delp, S. L. (2018). OpenSim: Simulating musculoskeletal dynamics and neuromuscular control to study human and animal movement. *PLoS Computational Biology*, 14(7), e1006223. https://doi.org/10.1371/journal.pcbi.1006223

[7] Pinheiro, W. C., Ferraz, H. B., Castro, M. C. F., & Menegaldo, L. L. (2024). An OpenSim-based closed-loop biomechanical wrist model for subject-specific pathological tremor simulation. *IEEE Transactions on Neural Systems and Rehabilitation Engineering*, 32, 1100-1108. https://doi.org/10.1109/TNSRE.2024.3373433

[8] Alhay, B. (2018, December). *An analysis of the kinematics of the elbow and wrist joints, and the muscle activity of the arm when using three different computer mice* (Doctoral thesis). University of Brighton.

[9] Liu, C. H., & Fan, S. C. (2014). Ergonomic design of a computer mouse for clients with wrist splints. *The American Journal of Occupational Therapy*, 68(3), 317-324. https://doi.org/10.5014/ajot.2014.009928
