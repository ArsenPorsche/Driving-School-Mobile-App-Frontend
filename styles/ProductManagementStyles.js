import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, RADIUS, SHADOWS } from "../constants/theme";

export const productManagementStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.xl,
    paddingTop: 60,
    paddingBottom: SPACING.xl,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    width: 40,
  },
  title: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold,
    color: "#1a1a1a",
  },
  addButton: {
    width: 40,
    alignItems: "flex-end",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: SPACING.lg,
  },
  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...SHADOWS.md,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: "#1a1a1a",
    marginBottom: SPACING.xs,
  },
  productDescription: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textMuted,
    marginBottom: SPACING.xs,
  },
  productCategory: {
    fontSize: FONT_SIZE.md,
    color: COLORS.success,
    fontWeight: FONT_WEIGHT.semibold,
    marginBottom: 2,
  },
  productPrice: {
    fontSize: FONT_SIZE.md,
    color: "#1a1a1a",
    fontWeight: FONT_WEIGHT.semibold,
    marginBottom: 2,
  },
  productQuantity: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textMuted,
  },
  inactiveLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.error,
    fontWeight: FONT_WEIGHT.bold,
    marginTop: SPACING.xs,
  },
  actionButtons: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  editButton: {
    padding: SPACING.sm,
  },
  deleteButton: {
    padding: SPACING.sm,
  },
  emptyText: {
    textAlign: "center",
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.lg,
    marginTop: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    width: "90%",
    maxWidth: 400,
    alignSelf: "center",
  },
  modalTitle: {
    fontSize: FONT_SIZE.title,
    fontWeight: FONT_WEIGHT.bold,
    color: "#1a1a1a",
    marginBottom: SPACING.xl,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    fontSize: FONT_SIZE.lg,
  },
  modalButtons: {
    flexDirection: "row",
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: RADIUS.md,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: COLORS.borderLight,
  },
  cancelButtonText: {
    color: COLORS.textMuted,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
  },
  saveButton: {
    backgroundColor: COLORS.success,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.semibold,
  },
  roleChip: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingHorizontal: 14,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.round,
    backgroundColor: "#f9fafb",
  },
  roleChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  roleChipText: {
    color: COLORS.textPrimary,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium,
    textTransform: "capitalize",
  },
  roleChipTextActive: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHT.semibold,
  },
});
