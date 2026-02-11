import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { authApi, userApi } from "../services/api";
import { getSocket, disconnectSocket } from "../services/socket";

const AuthContext = createContext(null);

const STORE_KEYS = {
  TOKEN: "token",
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
};

async function getExpoPushToken() {
  try {
    if (!Device.isDevice) return null;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") return null;
    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: "1fdd220b-4a71-47a8-a6e9-c665a56d6b2d",
    });
    return tokenData?.data || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearAuth = useCallback(async () => {
    try {
      await SecureStore.deleteItemAsync(STORE_KEYS.TOKEN);
      await SecureStore.deleteItemAsync(STORE_KEYS.REFRESH_TOKEN);
      await SecureStore.deleteItemAsync(STORE_KEYS.USER);
    } catch {}
    disconnectSocket();
    setToken(null);
    setUser(null);
    setRole(null);
    setUserId(null);
  }, []);

  const registerPush = useCallback(async () => {
    const expoToken = await getExpoPushToken();
    if (expoToken) {
      try { await userApi.registerPushToken(expoToken); } catch {}
    }
  }, []);

  const applyValidation = useCallback((validation) => {
    setRole(validation.role);
    setUserId(validation.id);
  }, []);

  // Bootstrap: check stored tokens on mount
  useEffect(() => {
    (async () => {
      try {
        const storedToken = await SecureStore.getItemAsync(STORE_KEYS.TOKEN);
        const storedRefresh = await SecureStore.getItemAsync(STORE_KEYS.REFRESH_TOKEN);
        const storedUser = await SecureStore.getItemAsync(STORE_KEYS.USER);

        if (!storedToken || !storedRefresh) {
          await clearAuth();
          return;
        }

        setToken(storedToken);
        if (storedUser) setUser(JSON.parse(storedUser));

        try {
          const validation = await authApi.validateToken(storedToken);
          applyValidation(validation);
        } catch {
          // Token expired — try refresh
          try {
            const { token: newToken, refreshToken: newRefresh } =
              await authApi.refreshToken(storedRefresh);
            await SecureStore.setItemAsync(STORE_KEYS.TOKEN, newToken);
            await SecureStore.setItemAsync(STORE_KEYS.REFRESH_TOKEN, newRefresh);
            setToken(newToken);

            const validation = await authApi.validateToken(newToken);
            applyValidation(validation);
          } catch {
            await clearAuth();
          }
        }
      } catch {
        await clearAuth();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Init socket & push on token change
  useEffect(() => {
    if (!token) return;
    registerPush();
    getSocket(token);
  }, [token, registerPush]);

  const login = useCallback(async ({ token: newToken, user: newUser, refreshToken: newRefresh }) => {
    await SecureStore.setItemAsync(STORE_KEYS.TOKEN, newToken);
    await SecureStore.setItemAsync(STORE_KEYS.REFRESH_TOKEN, newRefresh);
    await SecureStore.setItemAsync(STORE_KEYS.USER, JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);

    const validation = await authApi.validateToken(newToken);
    applyValidation(validation);
    await registerPush();
  }, [applyValidation, registerPush]);

  const logout = useCallback(async () => {
    await clearAuth();
  }, [clearAuth]);

  const value = {
    user,
    token,
    role,
    userId,
    isLoading,
    isAuthenticated: !!token && !!role,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
