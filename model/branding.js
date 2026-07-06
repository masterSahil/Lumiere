import { Schema, model, models } from "mongoose";

const brandingSchema = new Schema(
  {
    themeName: { type: String, default: "Default Theme" },
    isActiveTheme: { type: Boolean, default: false },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    
    // Theme Palette
    primaryColor: { type: String, default: "#9EE939" },
    surfaceBackdrop: { type: String, default: "#101415" },
    accentGlow: { type: String, default: "#9EE939" },
    
    // Digital Presence
    footerText: { 
      type: String, 
      default: "© 2026 Lumière Gastronomy. All rights reserved. Cultivating culinary excellence daily." 
    },
    instagramUrl: { type: String, default: "" },
    twitterUrl: { type: String, default: "" },
  },
  { 
    timestamps: true 
  }
);

const Branding = models.Branding || model("Branding", brandingSchema);
export default Branding;
