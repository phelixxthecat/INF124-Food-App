import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import { appStyles, UCIColors } from '../../constants/appStyles';

export default function Checkout() {
  const [text, onChangeText] = React.useState('');

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Checkout Page</Text>

      <View style={appStyles.card}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, width: '100%' }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.content}>
              <Text style={appStyles.title}>Checkout</Text>

              <View style={styles.pickupCard}>
                <Text style={styles.sectionLabel}>Pick up at</Text>
                <View style={styles.row}>
                  <Feather name="map-pin" size={18} color={UCIColors.navy} />
                  <Text style={styles.address}>123 UCI Address</Text>
                </View>
              </View>

              <Text style={styles.heading}>Cart</Text>
              <Text style={styles.restaurant}>Restaurant Name</Text>

              {[1, 2].map((item) => (
                <View key={item} style={styles.itemCard}>
                  <View style={styles.itemImage} />

                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>Item Name</Text>
                    <Text style={styles.description}>Description</Text>

                    <View style={styles.quantityRow}>
                      <Pressable>
                        <Feather name="minus-circle" size={24} color={UCIColors.navy} />
                      </Pressable>

                      <Text style={styles.quantity}>1</Text>

                      <Pressable>
                        <Feather name="plus-circle" size={24} color={UCIColors.navy} />
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))}

              <View style={styles.divider} />

              <Text style={styles.heading}>Summary</Text>

              <View style={styles.couponBox}>
                <Ionicons name="pricetag-outline" size={22} color={UCIColors.navy} />
                <TextInput
                  style={styles.couponInput}
                  placeholder="Apply Coupon"
                  placeholderTextColor={UCIColors.textGray}
                  onChangeText={onChangeText}
                  value={text}
                />
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Subtotal</Text>
                <Text style={styles.summaryText}>$20.00</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Tax</Text>
                <Text style={styles.summaryText}>$2.00</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Delivery</Text>
                <Text style={styles.summaryText}>$2.99</Text>
              </View>

              <View style={styles.dashedDivider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalText}>$24.99</Text>
              </View>

              <Pressable style={appStyles.primaryButton}>
                <Text style={appStyles.primaryButtonText}>Continue</Text>
              </Pressable>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingTop: 45,
    paddingBottom: 40,
  },

  pickupCard: {
    width: 270,
    backgroundColor: UCIColors.cream,
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: UCIColors.gold,
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: UCIColors.navy,
    marginBottom: 8,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  address: {
    marginLeft: 8,
    color: UCIColors.black,
    fontWeight: '600',
  },

  heading: {
    width: 270,
    fontSize: 24,
    fontWeight: '800',
    color: UCIColors.navy,
    marginBottom: 12,
  },

  restaurant: {
    width: 270,
    fontSize: 14,
    fontWeight: '700',
    color: UCIColors.textGray,
    marginBottom: 12,
  },

  itemCard: {
    width: 270,
    flexDirection: 'row',
    backgroundColor: UCIColors.white,
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  itemImage: {
    width: 75,
    height: 75,
    borderRadius: 16,
    backgroundColor: UCIColors.gray,
  },

  itemInfo: {
    flex: 1,
    marginLeft: 14,
  },

  itemName: {
    fontSize: 15,
    fontWeight: '800',
    color: UCIColors.navy,
  },

  description: {
    fontSize: 12,
    color: UCIColors.textGray,
    marginTop: 4,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 12,
  },

  quantity: {
    fontSize: 14,
    fontWeight: '800',
    color: UCIColors.black,
  },

  divider: {
    width: 270,
    height: 2,
    backgroundColor: '#eee',
    marginVertical: 18,
  },

  couponBox: {
    width: 270,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  couponInput: {
    flex: 1,
    marginLeft: 10,
    color: UCIColors.black,
  },

  summaryRow: {
    width: 270,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  summaryText: {
    color: UCIColors.black,
    fontWeight: '600',
  },

  dashedDivider: {
    width: 270,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: UCIColors.textGray,
    marginVertical: 12,
  },

  totalText: {
    color: UCIColors.navy,
    fontWeight: '800',
    fontSize: 18,
  },
});