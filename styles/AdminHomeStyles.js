import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOWS } from "../constants/theme";

export const adminHomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
    paddingTop: 60,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZE.hero,
    fontWeight: FONT_WEIGHT.bold,
    color: "#1a1a1a",
    textAlign: "center",
    marginTop: SPACING.xs,
    marginBottom: 2,
  },
  logoutButton: {
    alignSelf: "center",
    backgroundColor: COLORS.badge,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    ...SHADOWS.md,
    marginTop: 10,
    marginBottom: SPACING.lg,
  },
  logoutText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.semibold,
    fontSize: FONT_SIZE.md,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textMuted,
    textAlign: "center",
    marginTop: 2,
    marginBottom: SPACING.lg,
  },
  menuContainer: {
    gap: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  menuItem: {
    width: "100%",
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    ...SHADOWS.lg,
  },
  menuGradient: {
    padding: SPACING.xl,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },
  menuText: {
    fontSize: 22,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.white,
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  menuDescription: {
    fontSize: FONT_SIZE.md,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
});
