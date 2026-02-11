import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOWS } from "../constants/theme";

export const editProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: SPACING.xl,
    position: "relative",
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
    paddingBottom: 80,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
    marginTop: SPACING.xl,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semibold,
    color: "#333",
    marginBottom: 15,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: RADIUS.md,
    paddingHorizontal: 15,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZE.lg,
    marginBottom: 10,
    color: "#333",
  },
  inputError: {
    borderColor: COLORS.error,
    backgroundColor: "#fef2f2",
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZE.md,
    marginBottom: 10,
    marginTop: -5,
    paddingLeft: 5,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: RADIUS.md,
    alignItems: "center",
    marginTop: SPACING.xl,
    ...SHADOWS.md,
  },
  saveButtonDisabled: {
    backgroundColor: COLORS.textDisabled,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
  },
  cancelButton: {
    backgroundColor: COLORS.borderLight,
    paddingVertical: 15,
    borderRadius: RADIUS.md,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  cancelButtonText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
  },
});
