import React from "react";
import {
View,
Text,
StyleSheet,
Image,
TouchableOpacity,
ScrollView
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

export default function ProfileScreen() {

return(

<ScrollView style={styles.container}>

{/* HEADER */}
<View style={styles.header}>

<Image
source={{uri:"https://i.pravatar.cc/150"}}
style={styles.avatar}
/>

<View>
<Text style={styles.name}>Bryan</Text>
<Text style={styles.email}>Bryan@gmail.com</Text>
</View>

</View>

{/* ORDER STATUS */}

<View style={styles.orderBox}>

<OrderItem icon="assignment" label="Chờ xác nhận"/>
<OrderItem icon="local-shipping" label="Đang giao"/>
<OrderItem icon="check-circle" label="Đã giao"/>

</View>

{/* MENU */}

<View style={styles.menu}>

<MenuItem icon="receipt-long" title="Đơn hàng của tôi"/>
<MenuItem icon="favorite" title="Sản phẩm yêu thích"/>
<MenuItem icon="location-on" title="Địa chỉ giao hàng"/>
<MenuItem icon="credit-card" title="Phương thức thanh toán"/>
<MenuItem icon="notifications" title="Thông báo"/>
<MenuItem icon="support-agent" title="Hỗ trợ khách hàng"/>
<MenuItem icon="settings" title="Cài đặt"/>

</View>

{/* LOGOUT */}

<TouchableOpacity style={styles.logout}>
<Text style={styles.logoutText}>Đăng xuất</Text>
</TouchableOpacity>

</ScrollView>

)
}

const OrderItem = ({icon,label}:any)=>(
<View style={styles.orderItem}>
<Icon name={icon} size={28} color="#00b2b2"/>
<Text style={styles.orderText}>{label}</Text>
</View>
)

const MenuItem = ({icon,title}:any)=>(
<TouchableOpacity style={styles.menuItem}>
<Icon name={icon} size={22} color="#333"/>
<Text style={styles.menuText}>{title}</Text>
<Icon name="chevron-right" size={22} color="#999"/>
</TouchableOpacity>
)

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f5f5f5"
},

header:{
flexDirection:"row",
alignItems:"center",
padding:20,
backgroundColor:"#00b2b2"
},

avatar:{
width:70,
height:70,
borderRadius:35,
marginRight:15
},

name:{
fontSize:18,
fontWeight:"bold",
color:"#fff"
},

email:{
color:"#fff",
marginTop:4
},

orderBox:{
flexDirection:"row",
justifyContent:"space-around",
backgroundColor:"#fff",
paddingVertical:15
},

orderItem:{
alignItems:"center"
},

orderText:{
marginTop:5,
fontSize:12
},

menu:{
marginTop:10,
backgroundColor:"#fff"
},

menuItem:{
flexDirection:"row",
alignItems:"center",
padding:15,
borderBottomWidth:1,
borderColor:"#eee"
},

menuText:{
flex:1,
marginLeft:15,
fontSize:16
},

logout:{
marginTop:30,
backgroundColor:"#ff3b30",
marginHorizontal:20,
padding:15,
borderRadius:8,
alignItems:"center"
},

logoutText:{
color:"#fff",
fontWeight:"bold",
fontSize:16
}

});