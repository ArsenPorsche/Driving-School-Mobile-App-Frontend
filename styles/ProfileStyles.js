import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT } from "../constants/theme";

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    position: "relative",
    paddingTop: 60,
  },
  header: {
    paddingBottom: SPACING.xl,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  headerText: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: 0,
    textAlign: "center",
    color: COLORS.textPrimary,
  },
  menuItem: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.xl,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    justifyContent: "center",
  },
  menuText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.textSecondary,
  },
});
