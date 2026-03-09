import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Product = {
  id: string;
  name: string;
  image: any;
  price: number;
  rating: number;
  reviews?: number;
  description?: string;
};
type Props = {
  item: Product;
};
const ProductCard = ({ item }: Props) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartPress = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.infoWrapper}>
        <Text numberOfLines={1} style={styles.productName}>
          {item.name}
        </Text>

        <Text style={styles.productPrice}>
          {typeof item.price === 'number' 
            ? item.price.toLocaleString('vi-VN') + 'đ' 
            : item.price || 'N/A'}
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={styles.ratingRow}>
            <MaterialCommunityIcons
              name="star"
              size={16}
              color="#FFD700"
            />
            <Text style={styles.ratingText}>{item.rating || 0}</Text>
          </View>
          <Pressable onPress={handleHeartPress}>
            <MaterialCommunityIcons
              name="heart"
              size={18}
              color={isLiked ? '#E91E63' : '#CCC'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#f5f5f5', // Nền hơi xám giống trong ảnh
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 15,
    marginBottom: 15,
  },
  card: {
    width: 165,
    backgroundColor: '#fff',
    borderRadius: 20, // Bo góc sâu giống hình
    marginRight: 12,
    overflow: 'hidden', // Để hình ảnh không chờm ra ngoài góc bo
    // Đổ bóng nhẹ
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageWrapper: {
    width: '100%',
    height: 140,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
  },
  infoWrapper: {
    padding: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4500', // Màu cam đỏ đặc trưng
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
});
export default ProductCard;