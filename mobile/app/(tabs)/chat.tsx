import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { MessageCircle, Search, Plus, Users, Building } from 'lucide-react-native';
import type { Chat } from '@/types/chat';

const mockChats: Chat[] = [
  {
    id: '1',
    name: 'Ban quản lý tòa nhà',
    type: 'group',
    participants: ['admin1', 'member1', 'member2'],
    unread_count: 3,
    building_id: 'building1',
    last_message: {
      id: 'msg1',
      chat_id: '1',
      sender_id: 'admin1',
      sender_name: 'Admin',
      content: 'Thang máy sẽ bảo trì vào sáng mai',
      type: 'text',
      timestamp: '2025-01-10T14:30:00Z',
      read_by: ['admin1'],
    },
  },
  {
    id: '2',
    name: 'Nhóm cư dân tầng 10',
    type: 'group',
    participants: ['member1', 'member2', 'member3'],
    unread_count: 0,
    building_id: 'building1',
    last_message: {
      id: 'msg2',
      chat_id: '2',
      sender_id: 'member2',
      sender_name: 'Nguyễn Văn B',
      content: 'Ai có nhu cầu mua chung thực phẩm không?',
      type: 'text',
      timestamp: '2025-01-10T12:15:00Z',
      read_by: ['member1', 'member2'],
    },
  },
  {
    id: '3',
    name: 'Chủ tòa nhà',
    type: 'direct',
    participants: ['admin1', 'member1'],
    unread_count: 1,
    last_message: {
      id: 'msg3',
      chat_id: '3',
      sender_id: 'admin1',
      sender_name: 'Admin',
      content: 'Cảm ơn bạn đã thanh toán tiền thuê tháng này',
      type: 'text',
      timestamp: '2025-01-10T09:45:00Z',
      read_by: ['admin1'],
    },
  },
];

export default function ChatScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Vừa xong';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} giờ trước`;
    } else {
      return date.toLocaleDateString('vi-VN');
    }
  };

  const getChatIcon = (chat: Chat) => {
    if (chat.type === 'group') {
      return <Users size={18} color={Colors.primary} />;
    } else if (chat.type === 'building') {
      return <Building size={18} color={Colors.secondary} />;
    }
    return <MessageCircle size={18} color={Colors.accent} />;
  };

  const ChatItem = ({ chat }: { chat: Chat }) => (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.chatIcon}>
        {getChatIcon(chat)}
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName} numberOfLines={1}>
            {chat.name}
          </Text>
          <Text style={styles.chatTime}>
            {chat.last_message ? formatTime(chat.last_message.timestamp) : ''}
          </Text>
        </View>
        <View style={styles.chatMessage}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chat.last_message ? chat.last_message.content : 'Chưa có tin nhắn'}
          </Text>
          {chat.unread_count > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{chat.unread_count}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>
        <TouchableOpacity style={styles.newChatButton}>
          <Plus size={20} color={Colors.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm cuộc trò chuyện..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.textMuted}
          />
        </View>
      </View>

      <FlatList
        data={mockChats}
        renderItem={({ item }) => <ChatItem chat={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  newChatButton: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    height: 44,
    marginLeft: Spacing.sm,
    fontSize: 14,
    color: Colors.text,
  },
  chatList: {
    paddingHorizontal: Spacing.lg,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chatIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  chatName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  chatTime: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  chatMessage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    minWidth: 18,
    height: 18,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
  },
  unreadText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.background,
  },
});