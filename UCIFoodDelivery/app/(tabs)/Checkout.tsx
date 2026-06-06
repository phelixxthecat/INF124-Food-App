import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { appStyles, UCIColors } from '../../constants/appStyles';
<<<<<<< Updated upstream
import { getSessionJSON, removeSessionKey, SESSION_KEYS } from '../../src/sessionStore';

type CheckoutCartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
};

type CheckoutCart = {
  restaurantId: string;
  restaurantName: string;
  items: CheckoutCartItem[];
};

export default function Checkout() {
  const [text, onChangeText] = React.useState('');
  const [cart, setCart] = React.useState<CheckoutCart | null>(null);
  const [placingOrder, setPlacingOrder] = React.useState(false);

  React.useEffect(() => {
    const checkoutCart = getSessionJSON<CheckoutCart>(SESSION_KEYS.checkoutCart);
    setCart(checkoutCart);
  }, []);

  const subtotal = React.useMemo(
    () => cart?.items.reduce((sum, item) => sum + item.price * item.quantity, 0) ?? 0,
    [cart]
  );

  const tax = React.useMemo(() => Number((subtotal * 0.1).toFixed(2)), [subtotal]);
  const deliveryFee = subtotal > 0 ? 2.99 : 0;
  const total = React.useMemo(() => Number((subtotal + tax + deliveryFee).toFixed(2)), [subtotal, tax, deliveryFee]);

  const formatPrice = (value: number) => `$${value.toFixed(2)}`;

  const placeOrder = async () => {
    if (!cart || cart.items.length === 0) {
      Alert.alert('Cart is empty', 'Add items before placing an order.');
      return;
    }

    try {
      setPlacingOrder(true);
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId: cart.restaurantId,
          restaurantName: cart.restaurantName,
          items: cart.items,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      removeSessionKey(SESSION_KEYS.checkoutCart);
      Alert.alert('Order placed', 'Your order has been sent to the restaurant.');
      setCart(null);
    } catch (error) {
      console.error('Failed to place order:', error);
      Alert.alert('Unable to place order', 'Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };
=======
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const [text, onChangeText] = React.useState('');
  const { cartItems, increaseItem, decreaseItem, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const delivery = subtotal > 0 ? 2.99 : 0;
  const total = subtotal + tax + delivery;
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
              <Text style={styles.restaurant}>{cart?.restaurantName ?? 'No restaurant selected'}</Text>

              {cart && cart.items.length > 0 ? (
                cart.items.map((item) => (
                  <View key={item.menuItemId} style={styles.itemCard}>
                    <View style={styles.itemImage} />

                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.description}>{formatPrice(item.price)} each</Text>

                      <View style={styles.quantityRow}>
                        <Feather name="hash" size={17} color={UCIColors.navy} />
                        <Text style={styles.quantity}>Qty: {item.quantity}</Text>
=======
              <Text style={styles.restaurant}>Your selected items</Text>

              {cartItems.length === 0 ? (
                <Text style={styles.emptyText}>Your cart is empty.</Text>
              ) : (
                cartItems.map((item) => (
                  <View key={item._id} style={styles.itemCard}>
                    <View style={styles.itemImage}>
                      <Text style={styles.itemImageText}>
                        {item.name.charAt(0)}
                      </Text>
                    </View>

                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>

                      {item.description ? (
                        <Text style={styles.description}>
                          {item.description}
                        </Text>
                      ) : null}

                      <Text style={styles.price}>
                        ${item.price.toFixed(2)}
                      </Text>

                      <View style={styles.quantityRow}>
                        <Pressable onPress={() => decreaseItem(item._id)}>
                          <Feather
                            name="minus-circle"
                            size={26}
                            color={UCIColors.navy}
                          />
                        </Pressable>

                        <Text style={styles.quantity}>{item.quantity}</Text>

                        <Pressable onPress={() => increaseItem(item._id)}>
                          <Feather
                            name="plus-circle"
                            size={26}
                            color={UCIColors.navy}
                          />
                        </Pressable>
>>>>>>> Stashed changes
                      </View>
                    </View>
                  </View>
                ))
<<<<<<< Updated upstream
              ) : (
                <View style={styles.emptyCard}>
                  <Text style={styles.emptyText}>No items found in checkout cart.</Text>
                </View>
=======
>>>>>>> Stashed changes
              )}

              {cart && cart.items.length > 0 ? <View style={styles.divider} /> : null}

              <Text style={styles.heading}>Summary</Text>

              <View style={styles.couponBox}>
                <Ionicons
                  name="pricetag-outline"
                  size={22}
                  color={UCIColors.navy}
                />
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
<<<<<<< Updated upstream
                <Text style={styles.summaryText}>{formatPrice(subtotal)}</Text>
=======
                <Text style={styles.summaryText}>${subtotal.toFixed(2)}</Text>
>>>>>>> Stashed changes
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Tax</Text>
<<<<<<< Updated upstream
                <Text style={styles.summaryText}>{formatPrice(tax)}</Text>
=======
                <Text style={styles.summaryText}>${tax.toFixed(2)}</Text>
>>>>>>> Stashed changes
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Delivery</Text>
<<<<<<< Updated upstream
                <Text style={styles.summaryText}>{formatPrice(deliveryFee)}</Text>
=======
                <Text style={styles.summaryText}>${delivery.toFixed(2)}</Text>
>>>>>>> Stashed changes
              </View>

              <View style={styles.dashedDivider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalText}>Total</Text>
<<<<<<< Updated upstream
                <Text style={styles.totalText}>{formatPrice(total)}</Text>
              </View>

              <Pressable
                style={[appStyles.primaryButton, (!cart || cart.items.length === 0 || placingOrder) && styles.buttonDisabled]}
                onPress={placeOrder}
                disabled={!cart || cart.items.length === 0 || placingOrder}
              >
                <Text style={appStyles.primaryButtonText}>{placingOrder ? 'Placing...' : 'Place Order'}</Text>
=======
                <Text style={styles.totalText}>${total.toFixed(2)}</Text>
              </View>

              <Pressable
                style={[
                  appStyles.primaryButton,
                  cartItems.length === 0 && styles.disabledButton,
                ]}
                disabled={cartItems.length === 0}
                onPress={() => {
                  alert('Order placed!');
                  clearCart();
                }}
              >
                <Text style={appStyles.primaryButtonText}>
                  Continue
                </Text>
>>>>>>> Stashed changes
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

  emptyText: {
    width: 270,
    color: UCIColors.textGray,
    fontWeight: '700',
    marginBottom: 14,
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
    backgroundColor: UCIColors.cream,
    borderWidth: 1,
    borderColor: UCIColors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemImageText: {
    color: UCIColors.navy,
    fontSize: 28,
    fontWeight: '900',
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

  price: {
    fontSize: 13,
    color: UCIColors.navy,
    fontWeight: '800',
    marginTop: 6,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 12,
  },

  quantity: {
    fontSize: 15,
    fontWeight: '900',
    color: UCIColors.black,
  },

  emptyCard: {
    width: 270,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    marginBottom: 12,
    backgroundColor: UCIColors.white,
  },

  emptyText: {
    color: UCIColors.textGray,
    fontWeight: '600',
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

<<<<<<< Updated upstream
  buttonDisabled: {
    opacity: 0.55,
=======
  disabledButton: {
    opacity: 0.5,
>>>>>>> Stashed changes
  },
});