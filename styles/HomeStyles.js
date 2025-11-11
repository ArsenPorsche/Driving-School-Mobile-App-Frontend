import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", 
    position: "relative",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: "center", 
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#1a1a1a", 
  },
  menuContainer: {
    gap: 16,
    width: '100%',
    marginTop: 8,
  },
  menuItem: {
    width: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },
  menuGradient: {
    padding: 22,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 130,
  },
  menuIcon: {
    marginBottom: 10,
  },
  menuText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 6,
    textAlign: 'center',
  },
  menuDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
  },
  balanceBox: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    width: '100%',
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  balanceTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  balanceLine: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 6,
  },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    ratingValue: {
      fontSize: 24,
      fontWeight: '700',
      color: '#1a1a1a',
    },
    ratingCount: {
      fontSize: 14,
      color: '#6b7280',
    },
});