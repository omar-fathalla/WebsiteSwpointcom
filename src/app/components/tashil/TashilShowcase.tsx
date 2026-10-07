import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TashilHero } from "./TashilHero";
import { TashilRoleSimulator } from "./TashilRoleSimulator";
import { TashilMobileInteractiveFrame } from "./TashilMobileInteractiveFrame";
import { TashilAntiFraudSection } from "./TashilAntiFraudSection";
import { TashilFieldRadar } from "./TashilFieldRadar";
import { TashilPhotoAndDiscipline } from "./TashilPhotoAndDiscipline";
import { TashilWebCommandCenter } from "./TashilWebCommandCenter";
import { TashilArchitectureSection } from "./TashilArchitectureSection";

export function TashilShowcase() {
  const [activeTab, setActiveTab] = useState<string>("roles");

  return (
    <div id="tashil" className="w-full space-y-12">
      {/* ── Stage 1: Hero & Interactive Stage Tabs ── */}
      <TashilHero activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ── Active Stage View ── */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          {activeTab === "roles" && (
            <motion.div
              key="roles"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.05, 0.7, 0.1, 1.0] }}
            >
              {/* Stage 2: 9-Role Persona Simulator */}
              <TashilRoleSimulator />
            </motion.div>
          )}

          {activeTab === "mobile" && (
            <motion.div
              key="mobile"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.05, 0.7, 0.1, 1.0] }}
            >
              {/* Stage 3: Live Interactive Smartphone Frame */}
              <TashilMobileInteractiveFrame />
            </motion.div>
          )}

          {activeTab === "geofence" && (
            <motion.div
              key="geofence"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.05, 0.7, 0.1, 1.0] }}
              className="space-y-12"
            >
              {/* Stage 4: Anti-Fraud Geofencing Engine */}
              <TashilAntiFraudSection />
              {/* Stage 5: Real-Time Field Radar & Map */}
              <TashilFieldRadar />
            </motion.div>
          )}

          {activeTab === "photos" && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.05, 0.7, 0.1, 1.0] }}
            >
              {/* Stages 6 & 7: Photo Permits, Automated Violations & Dispute Engine */}
              <TashilPhotoAndDiscipline />
            </motion.div>
          )}

          {activeTab === "web_arch" && (
            <motion.div
              key="web_arch"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.05, 0.7, 0.1, 1.0] }}
              className="space-y-12"
            >
              {/* Stage 8: Enterprise Web Command Center */}
              <TashilWebCommandCenter />
              {/* Stage 9: Clean Architecture & Universal Notifications */}
              <TashilArchitectureSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
