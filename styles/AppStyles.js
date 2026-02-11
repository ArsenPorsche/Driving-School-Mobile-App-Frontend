import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOWS } from "../constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60,
  },
  header: {
    height: 56,
    paddingHorizontal: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: -20,
    marginTop: -30,
    marginBottom: SPACING.xl,
  },
  backBtn: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textPrimary,
  },
  flatListContent: {
    padding: SPACING.xl,
  },
  sectionHeader: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
    textAlign: "center",
  },
  label: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    marginBottom: 10,
    color: COLORS.textSecondary,
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
  calendarContainer: {
    marginBottom: SPACING.xl,
    borderRadius: RADIUS.md,
    overflow: "hidden",
    ...SHADOWS.md,
  },
  timesContainer: {
    marginBottom: SPACING.xl,
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    margin: SPACING.xs,
    minWidth: "45%",
    alignItems: "center",
    ...SHADOWS.sm,
  },
  selectedTimeButton: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  timeButtonText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    fontWeight: FONT_WEIGHT.medium,
  },
  selectedTimeButtonText: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.semibold,
  },
  noTimesText: {
    textAlign: "center",
    color: COLORS.textDisabled,
    fontSize: FONT_SIZE.md,
    fontStyle: "italic",
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
    borderRadius: RADIUS.md,
    overflow: "hidden",
  },
  infoContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: RADIUS.md,
    marginBottom: 60,
    ...SHADOWS.sm,
  },
  infoText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  instructorGroup: {
    marginBottom: 15,
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: RADIUS.md,
  },
  instructorGroupTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.overlay,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: SPACING.xl,
    borderRadius: RADIUS.md,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: FONT_SIZE.lg,
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: COLORS.accent,
    padding: 10,
    borderRadius: RADIUS.sm,
    marginVertical: 5,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
  },
});
