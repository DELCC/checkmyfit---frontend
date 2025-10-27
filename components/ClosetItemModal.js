import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { X, Edit2 } from 'lucide-react-native';

export default function ClosetItemModal({ isOpen, onClose, onModify, onDelete, item }) {
  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Closet Item Details</Text>
            <TouchableOpacity onPress={onClose}>
              <X width={20} height={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {/* Item Photo */}
            <View style={styles.section}>
              <Text style={styles.label}>Item Photo</Text>
              <View style={styles.photo}>
                <Text style={{ color: '#9CA3AF' }}>Item Image</Text>
              </View>
            </View>

            {/* Category */}
            <View style={styles.section}>
              <Text style={styles.label}>Category</Text>
              <View style={[styles.badge, { backgroundColor: '#6C5DD3' }]}>
                <Text style={{ color: '#fff' }}>{item?.category || 'Top'}</Text>
              </View>
            </View>

            {/* Color */}
            {item?.color && (
              <View style={styles.section}>
                <Text style={styles.label}>Color</Text>
                <View style={[styles.badge, styles.outlineBadge]}>
                  <Text style={{ color: '#D2B48C' }}>{item.color}</Text>
                </View>
              </View>
            )}

            {/* Seasons */}
            {item?.seasons && item.seasons.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.label}>Season</Text>
                <View style={styles.seasonsContainer}>
                  {item.seasons.map(season => (
                    <View key={season} style={[styles.badge, styles.outlineBadge, { marginRight: 8 }]}>
                      <Text style={{ color: '#D2B48C' }}>{season}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#6C5DD3' }]} onPress={onModify}>
                <Edit2 width={16} height={16} color="#fff" />
                <Text style={styles.actionButtonText}>Modify</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={onDelete}
              >
                <Text style={styles.deleteButtonText}>Delete This Item</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    maxHeight: '90%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
    color: '#374151',
  },
  photo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: '#E0D7F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  outlineBadge: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D2B48C',
  },
  seasonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  actions: {
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontWeight: '600',
  },
});
