import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  TextInput,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { width } = Dimensions.get('window');

  const bannerRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const banners = [
    require('../assets/images/danhmuc&banner/slide1.jpg'),
    require('../assets/images/danhmuc&banner/slide2.jpg'),
    require('../assets/images/danhmuc&banner/slide3.jpg'),
  ];

  const list = [
    
    {
      id: '1',
      image: require('../assets/images/danhmuc&banner/dogiadung.jpg'),
      name: 'DoGiaDung',
    },
    {
      id: '2',
      image: require('../assets/images/danhmuc&banner/dongho.jpg'),
      name: 'DongHo',
    },
    {
      id: '3',
      image: require('../assets/images/danhmuc&banner/laptop.jpg'),
      name: 'LapTop',
    },
    {
      id: '4',
      image: require('../assets/images/danhmuc&banner/maychupanh.jpg'),
      name: 'MayChupAnh',
    },
    {
      id: '5',
      image: require('../assets/images/danhmuc&banner/mobiles.jpg'),
      name: 'Mobiles',
    },
    {
      id: '6',
      image: require('../assets/images/danhmuc&banner/pc.jpg'),
      name: 'PC',
    },
    {
      id: '7',
      image: require('../assets/images/danhmuc&banner/tivi.jpg'),
      name: 'TiVi',
    },
  ];
  // sản phẩm nổi bật
  const sanphamnoibat = [
    {
      id: '1',
      name: 'iPhone 17 Pro Max 256GB',
      image: require('../assets/images/sanphamoibat/iphone-17-pro-max.jpg'),
      price: 37590000,
      rating: 4.8,
      reviews: 125,
      description:
        'iPhone 17 Pro Max 256GB sở hữu màn hình 6.9 inch, chip A19 Pro siêu mạnh, khung Titan và camera zoom quang học vượt trội.',
    },
    {
      id: '2',
      name: 'Vòng đeo tay Huawei Band 11 Pro',
      image: require('../assets/images/sanphamoibat/huawei-band-11-pro.jpg'),
      price: 890000,
      rating: 4.0,
      reviews: 12,
      description:
        'Huawei Band 11 Pro: Thiết kế khung nhôm mỏng nhẹ, màn hình AMOLED 1.62 inch 2000 nit, tích hợp GPS độc lập và pin bền bỉ 14 ngày.',
    },
    {
      id: '3',
      name: 'Samsung G512Galaxy S26 Ultra 512GB ',
      image: require('../assets/images/sanphamoibat/S26Ultra.jpg'),
      price: 34890000,
      rating: 4.6,
      reviews: 120,
      description:
        'Samsung Galaxy S26 Ultra: Màn hình 6.9 inch 120Hz, chip Snapdragon 8 Elite Gen 5, camera 200MP khẩu độ f/1.4 và tích hợp Privacy Display chống nhìn trộm.',
    },
  ];
  // sản phẩm bán chạy
  const sanphambanchay = [
    {
      id: '1',
      name: 'iPhone 17 Pro 256GB',
      image: require('../assets/images/sanphambanchay/iphone17pro.jpg'),
      price: 29590000,
      rating: 4.9,
      reviews: 150,
      description:
        'Phone 17 Pro 256GB sở hữu chip A19 Pro mạnh mẽ, màn hình 6.3 inch 120Hz, bộ ba camera 48MP và khung nhôm nguyên khối sang trọng.',
    },
    {
      id: '2',
      name: 'Apple MacBook Air M2 2024',
      image: require('../assets/images/sanphambanchay/macbookAirM2.jpg'),
      price: 19690000,
      rating: 4.5,
      reviews: 10,
      description:
        'Thiết kế mỏng nhẹ, chip M2 mạnh mẽ, màn hình 13.6 inch Liquid Retina, pin 18 giờ và bộ nhớ RAM 16GB tiêu chuẩn.',
    },
    {
      id: '3',
      name: 'Đồng hồ thông minh HONMA X Huawei Watch GT6 Pro',
      image: require('../assets/images/sanphambanchay/WatchGTpro.jpg'),
      price: 8900000,
      rating: 4.8,
      reviews: 30,
      description:
        'Khung Titanium, mặt kính Sapphire, màn hình 3000 nit, tích hợp bản đồ 17.000 sân golf và pin bền bỉ 21 ngày.',
    },
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;

      bannerRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeIndex, width]);

  const onBannerScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.logoAI}>AI</Text>
          <Text style={styles.logoMarket}>Market</Text>

          <Pressable style={styles.searchBox}>
            <MaterialCommunityIcons
              name="magnify"
              size={22}
              color="black"
              style={{ paddingLeft: 10 }}
            />
            <TextInput placeholder="Search..." />
          </Pressable>

          <MaterialCommunityIcons name="microphone" size={22} color="black" />
        </View>

        {/* CATEGORY LIST */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {list.map(item => (
            <Pressable key={item.id} style={styles.categoryItem} onPress={()=>navigation.navigate('CategoryProducts',{category:item.name,})}>
              <View style={styles.circleBox}>
                <Image
                  source={item.image}
                  style={styles.circleImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.circleText}>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* BANNER */}
        <View style={[styles.bannerWrapper, { height: (width * 9) / 16 }]}>
          <ScrollView
            ref={bannerRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onBannerScrollEnd}
          >
            {banners.map((img, index) => (
              <Image
                key={index}
                source={img}
                style={{ width, aspectRatio: 16 / 9 }}
                resizeMode="contain"
              />
            ))}
          </ScrollView>

          {/* DOT INDICATOR */}
          <View style={styles.dotContainer}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeIndex === index && styles.activeDot]}
              />
            ))}
          </View>
        </View>
        {/* SẢN PHẨM NỔI BẬT */}
        <View style={styles.sectionContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginBottom: 15 }}>
            <Text style={[styles.sectionTitle, { marginLeft: 0, marginBottom: 0 }]}>Sản Phẩm Nổi Bật</Text>
            <MaterialCommunityIcons name="star" size={28} color="#FFD700" style={{ marginLeft: 8 }} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 15 }}
          >
            {sanphamnoibat.map(item => (
              <Pressable
                key={item.id}
                onPress={() =>
                  navigation.navigate('ProductDetail', { product: item })
                }
              >
                <ProductCard item={item} />
              </Pressable>
            ))}
          </ScrollView>
        </View>
        {/* SẢN PHẨM Bán chạy */}
        <View style={styles.sectionContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginBottom: 15 }}>
            <Text style={[styles.sectionTitle, { marginLeft: 0, marginBottom: 0 }]}>Sản Phẩm Bán Chạy</Text>
            <MaterialCommunityIcons name="fire" size={28} color="#FF6600" style={{ marginLeft: 8 }} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 15 }}
          >
            {sanphambanchay.map(item => (
              <Pressable
                key={item.id}
                onPress={() =>
                  navigation.navigate('ProductDetail', { product: item })
                }
              >
                <ProductCard item={item} />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  /* HEADER */
  header: {
    backgroundColor: '#00CED1',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoAI: {
    fontSize: 30,
    fontWeight: '800',
    color: '#131921',
    letterSpacing: -1,
  },
  logoMarket: {
    fontSize: 20,
    fontWeight: '600',
    color: '#232f3e',
    letterSpacing: -1,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 7,
    backgroundColor: 'white',
    borderRadius: 3,
    height: 38,
    flex: 1,
    gap: 10,
  },

  /* CATEGORY */
  categoryList: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  categoryItem: {
    marginRight: 15,
  },
  circleBox: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  circleImage: {
    width: 55,
    height: 55,
  },
  circleText: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
  },

  /* BANNER */
  bannerWrapper: {
    marginTop: 15,
    width: '100%',
    position: 'relative',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#00CED1',
    width: 12,
  },
  // sanphamnoibat
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

export default HomeScreen;
