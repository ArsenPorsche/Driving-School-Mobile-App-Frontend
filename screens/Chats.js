import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { chatService } from '../services/api';
import NavBar from "../components/NavBar";
import { styles } from '../styles/NotificationsStyles';
import * as SecureStore from 'expo-secure-store';
import { getSocket } from '../services/socket';

export default function Chats({ navigation, tokenRole }) {
  const [chats, setChats] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  let socketRef = null;

  const upsertChat = (updated) => {
    setChats(prev => {
      const idx = prev.findIndex(c => c._id === updated._id);
      if (idx === -1) return [...prev, updated].sort((a,b)=> new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
      const clone = [...prev];
      clone[idx] = { ...clone[idx], ...updated };
      return clone.sort((a,b)=> new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
    });
  };

  const fetchChats = async () => {
    try {
      setLoading(true);
      const data = await chatService.getChats();
      setChats(data.chats || []);
    } catch (error) {
      console.log('Error fetching chats:', error.message);
      Alert.alert('Error', 'Failed to load chats');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let mounted = true;
      const setup = async () => {
        await fetchChats();
        try {
          const token = await SecureStore.getItemAsync('token');
          socketRef = getSocket(token);
          socketRef.on('chat:updated', (payload) => {
            if (!mounted) return;
            upsertChat(payload);
          });
        } catch {}
      };
      setup();
      return () => {
        mounted = false;
        if (socketRef) {
          socketRef.off('chat:updated');
        }
      };
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchChats();
  };

  const renderChat = ({ item }) => {
    const isInstructor = tokenRole === 'instructor';
    const partner = isInstructor ? item.student : item.instructor;
    const partnerName = partner ? `${partner.firstName || ''} ${partner.lastName || ''}`.trim() : 'Unknown';
    const lastDate = item.lastMessageAt
      ? new Date(item.lastMessageAt).toLocaleString('pl-PL', {
          year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
        })
      : '';
    return (
      <TouchableOpacity
        style={styles.notificationCard}
        onPress={() => navigation.navigate('ChatThread', { chatId: item._id, partnerId: partner._id, partnerName })}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.notificationTitle}>{partnerName}</Text>
            <Text style={styles.notificationBody} numberOfLines={1}>{item.lastMessage || 'No messages yet'}</Text>
            <Text style={styles.notificationDate}>{lastDate}</Text>
          </View>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <FlatList
        data={chats}
        renderItem={renderChat}
        keyExtractor={(item) => item._id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={!loading && (
          <View style={styles.emptyContainer}><Text style={styles.emptyText}>No chats</Text></View>
        )}
        contentContainerStyle={chats.length === 0 && styles.emptyList}
      />

        <NavBar role={tokenRole} navigation={navigation} />

    </View>
  );
}
