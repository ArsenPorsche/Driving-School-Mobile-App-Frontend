import { StyleSheet } from "react-native";

export const instructorHistoryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  listContainer: {
    padding: 16,
  },
  lessonCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  lessonInfo: {
    flex: 1,
  },
  typeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  lessonType: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginLeft: 8,
  },
  dateText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  studentText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: "#dcfce7",
  },
  canceledBadge: {
    backgroundColor: "#fee2e2",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  examSection: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 12,
    marginTop: 8,
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginRight: 8,
  },
  resultBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  passedBadge: {
    backgroundColor: "#10b981",
  },
  failedBadge: {
    backgroundColor: "#ef4444",
  },
  pendingBadge: {
    backgroundColor: "#f59e0b",
  },
  resultText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  setResultButton: {
    backgroundColor: "#1d4ed8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  setResultText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  noRating: {
    fontSize: 12,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "85%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
    textAlign: "center",
  },
  lessonDetails: {
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
  },
  resultButtons: {
    gap: 12,
    marginBottom: 16,
  },
  resultOptionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },
  passedButton: {
    backgroundColor: "#10b981",
  },
  failedButton: {
    backgroundColor: "#ef4444",
  },
  pendingButton: {
    backgroundColor: "#f59e0b",
  },
  resultOptionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "500",
  },
});
