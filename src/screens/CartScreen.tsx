import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartScreen = ({ route }: any) => {
  const initialProduct = route?.params?.product;
  const initialQuantity = route?.params?.quantity || 1;

  // State để quản lý giỏ hàng
  const [cartData, setCartData] = useState(
    initialProduct
      ? [{ ...initialProduct, quantity: initialQuantity, key: Math.random(), selected: true }]
      : [],
  );

  // State để theo dõi sản phẩm được chọn
  const [selectedItems, setSelectedItems] = useState<Set<number>>(
    initialProduct ? new Set([initialProduct.key || 0]) : new Set(),
  );

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + ' đ';
  };

  // Hàm cập nhật số lượng
  const updateQuantity = (key: number, delta: number) => {
    setCartData(
      cartData
        .map(item =>
          item.key === key
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item,
        )
        .filter(item => item.quantity > 0),
    );
  };

  // Tính tổng giá tiền của giỏ hàng (chỉ tính các sản phẩm được chọn)
  const cartTotal = useMemo(() => {
    return cartData.reduce((total, item) => {
      if (selectedItems.has(item.key)) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  }, [cartData, selectedItems]);

  // Hàm hủy chọn/chọn sản phẩm
  const toggleSelectItem = (key: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    setSelectedItems(newSelected);
  };

  // Hàm xóa sản phẩm từ giỏ hàng
  const removeFromCart = (key: number) => {
    setCartData(cartData.filter(item => item.key !== key));
  };

  const renderItem = ({ item }: any) => {
    const isSelected = selectedItems.has(item.key);
    return (
      <View style={styles.card}>
        {/* nút xóa ở góc trên bên phải */}
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => removeFromCart(item.key)}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={22}
            color="#ee4d2d"
          />
        </TouchableOpacity>

        {/* nút tick ở giữa sát bên trái */}
        <TouchableOpacity
          style={styles.checkboxBtn}
          onPress={() => toggleSelectItem(item.key)}
        >
          <MaterialCommunityIcons
            name={isSelected ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={20}
            color={isSelected ? '#ee4d2d' : '#ccc'}
          />
        </TouchableOpacity>

        {/* Ảnh */}
        <Image source={item.image} style={styles.image} />

        {/* Thông tin */}
        <View style={styles.info}>
          <Text numberOfLines={2} style={styles.name}>
            {item.name}
          </Text>

          <Text style={styles.price}>{formatPrice(item.price)} / cái</Text>

          {/* số lượng */}
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={[
                styles.qtyBtn,
                item.quantity === 1 && styles.qtyBtnDisabled,
              ]}
              onPress={() => updateQuantity(item.key, -1)}
              disabled={item.quantity === 1}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qtyText}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => updateQuantity(item.key, 1)}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tổng giá sản phẩm */}
        <Text style={[styles.itemTotalPrice, !isSelected && styles.itemTotalPriceDisabled]}>
          {formatPrice(item.price * item.quantity)}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {cartData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="shopping-outline"
            size={80}
            color="#ccc"
          />
          <Text style={styles.emptyText}>Giỏ hàng trống</Text>
          <Text style={styles.emptySubText}>
            Thêm sản phẩm để bắt đầu mua sắm
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartData}
            renderItem={renderItem}
            keyExtractor={item => item.key.toString()}
            contentContainerStyle={styles.listContent}
          />

          {/* Footer - Tổng tiền */}
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tổng cộng:</Text>
              <Text style={styles.totalPrice}>{formatPrice(cartTotal)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.checkoutBtnText}>Thanh toán</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  listContent: {
    padding: 10,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    position: 'relative',
  },

  checkboxBtn: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
    zIndex: 10,
  },

  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 10,
  },

  info: {
    flex: 1,
  },

  name: {
    fontSize: 14,
    color: '#333',
  },

  price: {
    color: '#ee4d2d',
    fontWeight: 'bold',
    marginTop: 5,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  qtyBtn: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#ee4d2d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#fff',
  },

  qtyBtnDisabled: {
    opacity: 0.5,
    borderColor: '#ccc',
  },

  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ee4d2d',
  },

  qtyText: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },

  itemTotalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ee4d2d',
    marginLeft: 10,
  },

  itemTotalPriceDisabled: {
    opacity: 0.4,
    color: '#999',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 20,
  },

  emptySubText: {
    fontSize: 14,
    color: '#bbb',
    marginTop: 8,
  },

  footer: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },

  totalLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },

  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ee4d2d',
  },

  checkoutBtn: {
    backgroundColor: '#ee4d2d',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  checkoutBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


