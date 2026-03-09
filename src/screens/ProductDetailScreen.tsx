import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Dimensions,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductDetailScreen = ({ route, navigation }: any) => {
  const { product } = route.params;

  // Hàm định dạng tiền tệ cho chuẩn Việt Nam
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };
  // hiện bảng thêm  giở hàng
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Ảnh sản phẩm */}
        <Image source={product.image} style={styles.image} />

        <View style={styles.contentContainer}>
          {/* Tên và Giá */}
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>

          {/* Đánh giá (Rating) */}
          <View style={styles.ratingRow}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map(s => (
                <Text
                  key={s}
                  style={{
                    color: s <= product.rating ? '#FFD700' : '#C0C0C0',
                    fontSize: 18,
                  }}
                >
                  ★
                </Text>
              ))}
            </View>
            <Text style={styles.reviewText}>({product.reviews} đánh giá)</Text>
          </View>

          {/* Mô tả sản phẩm (Ví dụ thêm) */}
          <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      {/*hiển thị thông tin sản phẩm*/}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Nút đóng Modal */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <MaterialCommunityIcons name="close" size={24} color="#555" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Ảnh sản phẩm */}
              <Image source={product.image} style={styles.modalImage} />

              {/* Tên sản phẩm */}
              <Text style={styles.modalName}>{product.name}</Text>

              {/* Giá tiền */}
              <Text style={styles.modalPrice}>
                {formatPrice(product.price * quantity)}
              </Text>

              {/* Đánh giá */}
              <View style={styles.modalRatingRow}>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <Text
                      key={s}
                      style={{
                        color: s <= product.rating ? '#FFD700' : '#C0C0C0',
                        fontSize: 16,
                      }}
                    >
                      ★
                    </Text>
                  ))}
                </View>
                <Text style={styles.modalReviewText}>
                  ({product.reviews} đánh giá)
                </Text>
              </View>

              {/* Chọn số lượng */}
              <View style={styles.quantitySection}>
                <Text style={styles.quantityLabel}>Số lượng</Text>
                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    <Text style={styles.qtyBtnText}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.qtyText}>{quantity}</Text>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => setQuantity(quantity + 1)}
                  >
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            {/* Nút xác nhận */}
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Main', {
                  screen: 'Cart',
                  params: {
                    product: product,
                    quantity: quantity,
                  },
                });
              }}
            >
              <Text style={styles.confirmBtnText}>
                Thêm vào giỏ ({quantity} sản phẩm)
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Thanh công cụ dưới cùng (Bottom Action Bar) */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyNowBtn}>
          <Text style={styles.buyNowText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 350,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100, // Để không bị nút che mất
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 22,
    color: '#ee4d2d', // Màu cam đỏ đặc trưng của TMĐT
    fontWeight: '700',
    marginTop: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  stars: {
    flexDirection: 'row',
  },
  reviewText: {
    marginLeft: 10,
    color: '#757575',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginTop: 5,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: '#fde8e4',
    paddingVertical: 15,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ee4d2d',
  },
  addToCartText: {
    color: '#ee4d2d',
    fontWeight: '600',
  },
  buyNowBtn: {
    flex: 1,
    backgroundColor: '#ee4d2d',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // hiển thị thong tin sản phẩm
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: Dimensions.get('window').height * 0.65,
  },

  modalImage: {
    width: '85%',
    height: 140,
    borderRadius: 16,
    marginBottom: 16,
    marginTop: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#f5f5f5',
    resizeMode: 'contain',
  },

  modalName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },

  modalPrice: {
    color: '#ee4d2d',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  modalRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  modalReviewText: {
    marginLeft: 8,
    color: '#757575',
    fontSize: 12,
  },

  quantitySection: {
    marginTop: 8,
    marginBottom: 12,
  },

  quantityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  qtyBtn: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },

  qtyBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },

  qtyText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },

  confirmBtn: {
    backgroundColor: '#ee4d2d',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },

  confirmBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  closeBtn: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: '#f5f5f5',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductDetailScreen;
