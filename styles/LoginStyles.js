import { StyleSheet, Dimensions } from "react-native";
import { COLORS, RADIUS, FONT_SIZE, FONT_WEIGHT, SPACING } from "../constants/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: SPACING.xl,
    zIndex: 10,
    padding: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: FONT_WEIGHT.bold,
    marginBottom: 40,
    color: COLORS.textPrimary,
  },
  input: {
    width: width * 0.8,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    paddingHorizontal: 15,
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: FONT_SIZE.lg,
    color: COLORS.textPrimary,
  },
  button: {
    width: width * 0.8,
    height: 50,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.semibold,
  },
  pickerContainer: {
    marginBottom: SPACING.xl,
  },
  picker: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
  },
  dropDown: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
  },
  error: {
    color: COLORS.error,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.bold,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
});
