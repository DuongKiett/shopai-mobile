import React, { useState, useRef, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, KeyboardAvoidingView, Platform,
  ActivityIndicator, SafeAreaView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `Bạn là trợ lý tư vấn mua sắm thông minh. 
Hãy trả lời các câu hỏi về sản phẩm, giá cả, so sánh sản phẩm một cách thân thiện.
Trả lời bằng tiếng Việt, ngắn gọn và dễ hiểu.`;

type Message = { id: string; role: 'user' | 'bot'; text: string };
type GeminiTurn = { role: 'user' | 'model'; parts: { text: string }[] };

export default function AIChatScreen() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '0', role: 'bot',
    text: 'Xin chào! Tôi là trợ lý AI. Tôi có thể giúp bạn tư vấn sản phẩm, so sánh giá và trả lời các câu hỏi mua sắm. Bạn cần hỗ trợ gì? 😊',
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const chatHistory = useRef<GeminiTurn[]>([]);
  // ✅ Lưu AbortController để có thể hủy bất cứ lúc nào
  const abortControllerRef = useRef<AbortController | null>(null);

  // ✅ Hàm dừng AI
  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setLoading(false);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'bot',
      text: '⏹ Đã dừng trả lời.',
    }]);
  }, []);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // ✅ Tạo AbortController mới cho mỗi request
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal, // ✅ Gắn signal vào fetch
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [
            ...chatHistory.current,
            { role: 'user', parts: [{ text: trimmed }] },
          ],
        }),
      });

      const data = await response.json();
      const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text
        ?? 'Xin lỗi, tôi không hiểu câu hỏi này.';

      // Cập nhật lịch sử
      chatHistory.current.push(
        { role: 'user', parts: [{ text: trimmed }] },
        { role: 'model', parts: [{ text: botText }] },
      );

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), role: 'bot', text: botText,
      }]);

    } catch (error: any) {
      // ✅ Phân biệt lỗi do abort hay lỗi thật
      if (error?.name === 'AbortError') return; // Đã xử lý trong stopGeneration

      console.error('Gemini Error:', error?.message);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), role: 'bot',
        text: `Lỗi: ${error?.message || 'Không xác định'}`,
      }]);
    } finally {
      abortControllerRef.current = null;
      setLoading(false);
    }
  }, [input, loading]);

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.bubble, item.role === 'user' ? styles.userBubble : styles.botBubble]}>
      {item.role === 'bot' && (
        <MaterialCommunityIcons name="robot" size={16} color="#00CED1" style={styles.botIcon} />
      )}
      <Text style={[styles.bubbleText, item.role === 'user' && styles.userText]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="robot" size={24} color="#00CED1" />
        <Text style={styles.headerTitle}>Trợ lý AI</Text>
        <View style={styles.onlineDot} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* ✅ Hiện nút DỪNG khi AI đang trả lời */}
      {loading && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#00CED1" />
          <Text style={styles.typingText}>AI đang trả lời...</Text>
          <TouchableOpacity style={styles.stopBtn} onPress={stopGeneration}>
            <MaterialCommunityIcons name="stop-circle" size={18} color="#fff" />
            <Text style={styles.stopBtnText}>Dừng</Text>
          </TouchableOpacity>
        </View>
      )}

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Nhập câu hỏi của bạn..."
            multiline
          />
          <TouchableOpacity
            style={[styles.sendBtn, (!input.trim() || loading) && styles.sendBtnDisabled]}
            onPress={sendMessage}
            disabled={!input.trim() || loading}
          >
            <MaterialCommunityIcons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
    backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: '600', marginLeft: 8, color: '#333' },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginLeft: 6 },
  messageList: { padding: 16, gap: 12 },
  bubble: {
    maxWidth: '80%', padding: 12, borderRadius: 16,
    flexDirection: 'row', alignItems: 'flex-start',
  },
  userBubble: { backgroundColor: '#00CED1', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  botBubble: { backgroundColor: '#fff', alignSelf: 'flex-start', borderBottomLeftRadius: 4, elevation: 1 },
  bubbleText: { fontSize: 15, color: '#333', flexShrink: 1 },
  userText: { color: '#fff' },
  botIcon: { marginRight: 6, marginTop: 2 },
  typingIndicator: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 8, gap: 8,
  },
  typingText: { color: '#888', fontSize: 13, flex: 1 },
  // ✅ Style nút dừng
  stopBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#FF5252', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  stopBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  inputRow: {
    flexDirection: 'row', padding: 12, backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#eee', alignItems: 'flex-end', gap: 8,
  },
  input: {
    flex: 1, backgroundColor: '#F0F0F0', borderRadius: 24,
    paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, maxHeight: 100,
  },
  sendBtn: { backgroundColor: '#00CED1', borderRadius: 24, padding: 12 },
  sendBtnDisabled: { backgroundColor: '#B0E8EA' },
});