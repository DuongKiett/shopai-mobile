import React from 'react';
import { Text, View, FlatList, StyleSheet, Pressable } from 'react-native';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';

const CategoryProductsScreen = ({ route }: any) => {
const navigation = useNavigation<any>();
  const { category } = route.params;
  const dogiadung = [
    {
      id: '0',
      name: 'Máy sấy quần áo LG DVHP50P (10.5kg)',
      image: require('../assets/images/dogiadung/maygiat.jpg'),
      price: 21590000,
      rating: 4.8,
      reviews: 12,
      description:
        'Máy giặt sấy LG DVHP50P (10.5kg) sở hữu công nghệ Dual Inverter Heat Pump hiện đại, giúp sấy khô hiệu quả, bảo vệ sợi vải và tiết kiệm điện năng tối ưu.',
    },
    {
      id: '1',
      name: 'Máy lọc  nươc Panasonic TK-AS66',
      image: require('../assets/images/dogiadung/maylocnuoc.jpg'),
      price: 9790000,
      rating: 4.0,
      reviews: 129,
      description:
        'Panasonic TK-AS66 là máy lọc nước sử dụng công nghệ lọc RO tiên tiến, loại bỏ hiệu quả các tạp chất, vi khuẩn và kim loại nặng, mang lại nguồn nước sạch tinh khiết cho gia đình bạn.',
    },
    {
      id: '2',
      name: 'Máy pha cafe Nespresso Essenza Mini (C30)',
      image: require('../assets/images/dogiadung/mayphacafe.jpg'),
      price: 8790000,
      rating: 4.2,
      reviews: 139,
      description:
        'Nespresso Essenza Mini (C30) là dòng máy pha cà phê viên nén nhỏ gọn, áp suất 19 bar mạnh mẽ, mang đến ly Espresso chuẩn vị chỉ trong vài giây.',
    },
    {
      id: '3',
      name: 'Nồi chiên hơi nước Olivo SteamFry Xtra (20L)',
      image: require('../assets/images/dogiadung/noichien.jpg'),
      price: 8990000,
      rating: 4.3,
      reviews: 13,
      description:
        'Olivo SteamFry Xtra (20L) là nồi chiên hơi nước thông minh kết hợp hấp và chiên không dầu, dung tích lớn giúp chế biến món ăn giòn tan, mọng nước.',
    },
    {
      id: '4',
      name: 'Robot hút bụi Roborock Q Revo Curv (C Pro)',
      image: require('../assets/images/dogiadung/robot.png'),
      price: 8990000,
      rating: 4.3,
      reviews: 13,
      description:
        'Roborock Q Revo Curv (C Pro) là robot hút bụi thông minh với công nghệ lau và hút bụi kết hợp, giúp giữ cho ngôi nhà luôn sạch sẽ.',
    },
  ];
  const dongho = [
    {
      id: '0',
      name: 'Apple Watch SE 3',
      image: require('../assets/images/dongho/appleWatchSE3.jpg'),
      price: 6290000,
      rating: 4.7,
      reviews: 231,
      description:
        'Apple Watch SE 3 là mẫu đồng hồ thông minh cân bằng giữa hiệu năng mạnh mẽ từ chip mới và giá thành hợp lý, hỗ trợ theo dõi sức khỏe, luyện tập hiệu quả.',
    },
    {
      id: '1',
      name: 'Samsung Galaxy Watch 7',
      image: require('../assets/images/dongho/galaxywatch7.jpg'),
      price: 3390000,
      rating: 4.7,
      reviews: 231,
      description:
        'Samsung Galaxy Watch 7 là mẫu đồng hồ thông minh với thiết kế tinh tế và nhiều tính năng sức khỏe hiện đại, giúp bạn theo dõi và cải thiện tình trạng sức khỏe của mình.',
    },
    {
      id: '3',
      name: 'Xiaomi Watch S4',
      image: require('../assets/images/dongho/xiaomiWatchS4.jpg'),
      price: 3390000,
      rating: 4.6,
      reviews: 21,
      description:
        'Xiaomi Watch S4 nổi bật với khung viền thay thế linh hoạt, màn hình AMOLED sắc nét và thời lượng pin ấn tượng, hỗ trợ quản lý sức khỏe và luyện tập toàn diện.',
    },
    {
      id: '4',
      name: 'Garmin Forerunner 165',
      image: require('../assets/images/dongho/garminforeunner165.jpg'),
      price: 4690000,
      rating: 4.5,
      reviews: 22,
      description:
        'Garmin Forerunner 165 là đồng hồ chạy bộ chuyên dụng với màn hình AMOLED rực rỡ, GPS chính xác và đầy đủ các chỉ số tập luyện, phục hồi chuyên sâu.',
    },
  ];
  const laptop = [
    {
      id: '0',
      name: 'MacBook Air M3',
      image: require('../assets/images/laptop/macbookAirM3.jpg'),
      price: 26290000,
      rating: 4.9,
      reviews: 299,
      description:
        'MacBook Air M3 là sự kết hợp hoàn hảo giữa thiết kế mỏng nhẹ, hiệu năng vượt trội từ chip M3 và thời lượng pin cực dài, hỗ trợ làm việc chuyên nghiệp.',
    },
    {
      id: '1',
      name: 'ASUS Zenbook S 14 OLED (2026)',
      image: require('../assets/images/laptop/zenbookS14oled.jpg'),
      price: 42000000,
      rating: 4.0,
      reviews: 36,
      description:
        'ASUS Zenbook S 14 OLED (2026) là tuyệt phẩm AI siêu mỏng nhẹ với chất liệu Ceraluminum độc đáo, chip Intel Core Ultra thế hệ mới và màn hình 3K OLED 120Hz tuyệt mỹ.',
    },
    {
      id: '2',
      name: 'Lenovo Yoga Slim 7i Aura Edition',
      image: require('../assets/images/laptop/lenovoYogaSlim7i.jpg'),
      price: 30000000,
      rating: 4.1,
      reviews: 56,
      description:
        'Sử dụng chip Intel Core Ultra Series 2, thiết kế bo cong mềm mại, bàn phím cực tốt. Tính năng Smart Mode tự động tối ưu hiệu năng và bảo mật khi làm việc ở nơi công cộng.',
    },
    {
      id: '3',
      name: 'Dell XPS 13 9345 (Snapdragon X Elite)',
      image: require('../assets/images/laptop/DellXPS13_9345.jpg'),
      price: 32000000,
      rating: 4.6,
      reviews: 59,
      description:
        'Sử dụng chip Snapdragon X Elite, thiết kế tối giản mang tính tương lai với hàng phím chức năng cảm ứng và touchpad ẩn. Pin có thể dùng thực tế lên đến 15-20 giờ.',
    },
  ];
  const products: any = {
    DoGiaDung: dogiadung,
    DongHo: dongho,
    LapTop: laptop,
  };
  const filteredProducts = products[category] || [];
  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate('ProductDetail', { product: item })
            }
          >
            <ProductCard item={item} />
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default CategoryProductsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    width: 165,
    backgroundColor: '#fff',
    borderRadius: 20, // Bo góc sâu giống hình
    marginRight: 12,
    overflow: 'hidden', // Để hình ảnh không chờm ra ngoài góc bo
}
});
