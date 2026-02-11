import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOWS } from "../constants/theme";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: "relative",
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: SPACING.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: "#1a1a1a",
  },
  menuContainer: {
    gap: SPACING.lg,
    width: "100%",
    marginTop: SPACING.sm,
  },
  menuItem: {
    width: "100%",
    borderRadius: 18,
    overflow: "hidden",
    ...SHADOWS.lg,
  },
  menuGradient: {
    padding: 22,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 130,
  },
  menuIcon: {
    marginBottom: 10,
  },
  menuText: {
    fontSize: 22,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.white,
    marginBottom: 6,
    textAlign: "center",
  },
  menuDescription: {
    fontSize: FONT_SIZE.md,
    color: "rgba(255,255,255,0.92)",
    textAlign: "center",
  },
  balanceBox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: 18,
    width: "100%",
    marginTop: SPACING.xl,
    ...SHADOWS.md,
  },
  balanceTitle: {
    fontSize: 17,
    fontWeight: FONT_WEIGHT.bold,
    color: "#1a1a1a",
    marginBottom: 10,
  },
  balanceLine: {
    fontSize: 15,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  ratingValue: {
    fontSize: FONT_SIZE.title,
    fontWeight: FONT_WEIGHT.bold,
    color: "#1a1a1a",
  },
  ratingCount: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textMuted,
  },
});
