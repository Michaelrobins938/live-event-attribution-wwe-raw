# Live Event Attribution: Measuring Direct-to-Consumer Spikes
## Time-Friction Analysis, Exponential Decay, and Z-Score Significance for Broadcast Marketing

**Technical Whitepaper v1.0.0**

| **Attribute** | **Value** |
|---|---|
| **Version** | 1.0.0 |
| **Status** | Production-Ready |
| **Date** | January 31, 2026 |
| **Classification** | Broadcast Attribution / Event Science |
| **Document Type** | Technical Whitepaper |

---

## **Abstract**

Live linear broadcasting (e.g., WWE Raw, Super Bowl, News) creates massive, short-lived "spikes" in digital activity. Standard digital-first attribution models fail here as they cannot link a TV airtime event to a secondary-device conversion without a direct click. This paper specifies a **Time-Correlated Spike Attribution Engine**. By integrating high-resolution airtime logs with real-time conversion streams, we utilize **Z-score Anomaly Detection** to distinguish TV-driven lift from organic baselines and apply **Exponential Decay Weighting** to assign fractional credit to specific ad slots.

---

## **Glossary & Notation**

| **Term** | **Definition** |
|---|---|
| **Airtime Log** | The exact millisecond-timestamp when a commercial begins on air. |
| **Secondary Device** | A smartphone, tablet, or laptop used by a viewer while watching TV. |
| **Spike Window** | The duration (typically 5-15 mins) where a TV ad is expected to influence digital behavior. |
| **Incremental Lift** | Conversions above the predicted organic baseline during the spike window. |
| **Frictionless Conversion** | A digital conversion that occurs without a referring URL (Direct/Search). |

---

## **1. The Broadcast Blind Spot**

Digital marketing provides a "click-path." Broadcast marketing provides an "influence-path." When a WWE Raw viewer sees an ad for a streaming service on their TV and subsequently opens the app on their phone, there is no HTTP Referer. Traditional attribution defaults this to "Organic" or "Direct," leading to a massive undervaluation of TV spend. Our engine solves this by treating **Time as the Join Key**.

---

## **2. Causal Architecture: Spike-Join Logic**

### **2.1 Baseline Modeling**
We establish a granular baseline $B_t$ (conversions per minute) using a moving average from the 60 minutes preceding the ad break. This allows us to isolate the "TV Effect" $L_t$:

$$L_t = \max(0, \text{Actual}_t - B_t)$$

### **2.2 Exponential Decay Attribution**
The influence of a TV ad peaked at $T_0$ (airtime) and decays rapidly as viewers lose focus or forget. We model this as:

$$W(\Delta t) = e^{-\lambda \cdot \Delta t}$$

Where $\lambda$ represents the "forgetting rate" (half-life of influence). Every conversion $C_t$ occurring within the spike window is assigned fractional credit based on its proximity to the airtime event.

---

## **3. Statistical Significance: Z-Score Validation**

To prevent "phantom attribution" (assigning credit to random organic noise), we apply a **Z-score filter** to every ad break:

$$Z_{break} = \frac{\mu_{window} - \mu_{baseline}}{\sigma_{baseline}}$$

An ad break is only considered "Successful" if $Z > 3.0$ (99.7% confidence). This ensures we only report lift that is statistically indistinguishable from random fluctuation.

---

## **4. Overlapping Ad Breaks**

In multi-channel broadcast environments, two ads may air simultaneously on different networks. We resolve this using **Probabilistic Weighting**:
- If Ad A and Ad B overlap, the credit is split proportionally based on their respective "Expected Reach" (Nielsen/Samba TV data) and the decay weight at the moment of conversion.

---

## **5. Key Performance Indicators (KPIs)**

- **CPA-Spike (Cost Per Action - Spike):** The total ad spend divided by the incremental lift.
- **Spike Decay Rate:** How quickly the brand "mindshare" dissipates after the ad ends.
- **Conversion Echo:** Identifying latent conversions that occur 24-48 hours after the event (modeled via time-shifted correlation).

---

## **6. Technical Implementation Specification**

- **Compute:** Python (FastAPI) for high-frequency time-join operations.
- **Data Ingestion:** Real-time hooks for Airtime Logs (e.g., via iSpot.tv or Mediaocean).
- **Latency:** < 100ms for real-time dashboard updates during live events.

---

## **7. Causal Interpretation & Limitations**

- **Search Cannibalization:** TV ads often drive "Branded Search" clicks. Our engine must differentiate between "TV Attribution" and "Search Attribution" to prevent double-counting.
- **Geo-Specificity:** TV airtime is often regional (Spot TV). The engine handles geo-fencing by correlating local airtime with local digital conversions.

---

## **8. Conclusion**

Live Event Attribution brings the transparency of digital marketing to the massive scale of linear broadcast. By treating time-proximity as a causal signal and validating it through rigorous statistical significance, brands like WWE, ESPN, and Netflix can finally quantify the true ROI of their live-broadcast investments.
