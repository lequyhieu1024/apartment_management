import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert, FlatList,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import {
  CircleHelp as HelpCircle,
  Plus,
  TriangleAlert as AlertTriangle,
  PenTool as Tool,
  MessageSquare,
  Zap,
  CircleCheck as CheckCircle,
  Clock,
  Search
} from 'lucide-react-native';
import type { Ticket } from '@/types/chat';

const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Máy lạnh không hoạt động',
    description: 'Máy lạnh phòng 101 không chạy từ sáng nay',
    category: 'maintenance',
    status: 'in_progress',
    priority: 'high',
    member_id: 'user1',
    building_id: 'building1',
    room_id: 'room101',
    created_at: '2025-01-10T08:30:00Z',
  },
  {
    id: '2',
    title: 'Tiếng ồn từ phòng bên cạnh',
    description: 'Phòng 102 thường xuyên có tiếng ồn vào ban đêm',
    category: 'complaint',
    status: 'open',
    priority: 'medium',
    member_id: 'user1',
    building_id: 'building1',
    created_at: '2025-01-09T22:15:00Z',
  },
  {
    id: '3',
    title: 'Thay bóng đèn hành lang',
    description: 'Bóng đèn hành lang tầng 10 bị hỏng',
    category: 'maintenance',
    status: 'resolved',
    priority: 'low',
    member_id: 'user1',
    building_id: 'building1',
    created_at: '2025-01-08T16:20:00Z',
    resolved_at: '2025-01-09T10:30:00Z',
  },
];

const categories = [
  { id: 'maintenance', label: 'Bảo trì', icon: Tool, color: Colors.primary },
  { id: 'complaint', label: 'Khiếu nại', icon: AlertTriangle, color: Colors.warning },
  { id: 'request', label: 'Yêu cầu', icon: MessageSquare, color: Colors.secondary },
  { id: 'emergency', label: 'Khẩn cấp', icon: Zap, color: Colors.error },
];

const priorities = [
  { id: 'low', label: 'Thấp', color: Colors.neutral[500] },
  { id: 'medium', label: 'Trung bình', color: Colors.warning },
  { id: 'high', label: 'Cao', color: Colors.error },
  { id: 'urgent', label: 'Khẩn cấp', color: Colors.error },
];

export default function SupportScreen() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: 'maintenance',
    priority: 'medium',
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock size={16} color={Colors.warning} />;
      case 'in_progress':
        return <AlertTriangle size={16} color={Colors.primary} />;
      case 'resolved':
        return <CheckCircle size={16} color={Colors.success} />;
      case 'closed':
        return <CheckCircle size={16} color={Colors.neutral[500]} />;
      default:
        return <Clock size={16} color={Colors.textMuted} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'Đang mở';
      case 'in_progress': return 'Đang xử lý';
      case 'resolved': return 'Đã giải quyết';
      case 'closed': return 'Đã đóng';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    const p = priorities.find(p => p.id === priority);
    return p?.color || Colors.neutral[500];
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat?.icon || Tool;
  };

  const handleCreateTicket = () => {
    if (!newTicket.title.trim() || !newTicket.description.trim()) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    Alert.alert('Thành công', 'Ticket đã được tạo thành công');
    setNewTicket({ title: '', description: '', category: 'maintenance', priority: 'medium' });
    setShowCreateForm(false);
  };

  const TicketItem = ({ ticket }: { ticket: Ticket }) => {
    const CategoryIcon = getCategoryIcon(ticket.category);
    
    return (
      <TouchableOpacity style={styles.ticketCard}>
        <View style={styles.ticketHeader}>
          <View style={styles.ticketMeta}>
            <CategoryIcon size={16} color={Colors.primary} />
            <Text style={styles.ticketCategory}>
              {categories.find(c => c.id === ticket.category)?.label}
            </Text>
            <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(ticket.priority) }]} />
          </View>
          <View style={styles.statusContainer}>
            {getStatusIcon(ticket.status)}
            <Text style={styles.statusText}>{getStatusLabel(ticket.status)}</Text>
          </View>
        </View>
        <Text style={styles.ticketTitle}>{ticket.title}</Text>
        <Text style={styles.ticketDescription} numberOfLines={2}>
          {ticket.description}
        </Text>
        <Text style={styles.ticketTime}>
          Tạo lúc: {new Date(ticket.created_at).toLocaleDateString('vi-VN')}
        </Text>
      </TouchableOpacity>
    );
  };

  if (showCreateForm) {
    return (
      <View style={styles.container}>
        <View style={styles.formHeader}>
          <TouchableOpacity onPress={() => setShowCreateForm(false)}>
            <Text style={styles.cancelButton}>Hủy</Text>
          </TouchableOpacity>
          <Text style={styles.formTitle}>Tạo ticket mới</Text>
          <TouchableOpacity onPress={handleCreateTicket}>
            <Text style={styles.submitButton}>Gửi</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.form} contentContainerStyle={styles.formContent}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Tiêu đề *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập tiêu đề ticket..."
              value={newTicket.title}
              onChangeText={(text) => setNewTicket({ ...newTicket, title: text })}
              placeholderTextColor={Colors.textMuted}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Loại ticket</Text>
            <View style={styles.categoryGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryOption,
                    newTicket.category === category.id && styles.categoryOptionSelected
                  ]}
                  onPress={() => setNewTicket({ ...newTicket, category: category.id })}
                >
                  <category.icon size={18} color={category.color} />
                  <Text style={styles.categoryOptionText}>{category.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mức độ ưu tiên</Text>
            <View style={styles.priorityGrid}>
              {priorities.map((priority) => (
                <TouchableOpacity
                  key={priority.id}
                  style={[
                    styles.priorityOption,
                    newTicket.priority === priority.id && styles.priorityOptionSelected
                  ]}
                  onPress={() => setNewTicket({ ...newTicket, priority: priority.id })}
                >
                  <View style={[styles.priorityDot, { backgroundColor: priority.color }]} />
                  <Text style={styles.priorityOptionText}>{priority.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mô tả chi tiết *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Mô tả chi tiết vấn đề..."
              value={newTicket.description}
              onChangeText={(text) => setNewTicket({ ...newTicket, description: text })}
              multiline
              numberOfLines={4}
              placeholderTextColor={Colors.textMuted}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hỗ trợ</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreateForm(true)}
        >
          <Plus size={20} color={Colors.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm ticket..."
            placeholderTextColor={Colors.textMuted}
          />
        </View>
      </View>

      <FlatList
        data={mockTickets}
        renderItem={({ item }) => <TicketItem ticket={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ticketList}
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
  createButton: {
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
  ticketList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  ticketCard: {
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  ticketMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketCategory: {
    fontSize: 12,
    color: Colors.primary,
    marginLeft: Spacing.xs,
    marginRight: Spacing.sm,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  ticketTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  ticketDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  ticketTime: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  cancelButton: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  submitButton: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  textInput: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    fontSize: 14,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryOptionSelected: {
    backgroundColor: Colors.primary + '20',
    borderColor: Colors.primary,
  },
  categoryOptionText: {
    fontSize: 12,
    color: Colors.text,
    marginLeft: Spacing.xs,
  },
  priorityGrid: {
    gap: Spacing.sm,
  },
  priorityOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  priorityOptionSelected: {
    backgroundColor: Colors.primary + '20',
    borderColor: Colors.primary,
  },
  priorityOptionText: {
    fontSize: 12,
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
});