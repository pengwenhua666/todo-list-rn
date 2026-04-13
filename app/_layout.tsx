// 导入Expo Router的Stack导航组件
import { Stack } from "expo-router";
// 导入Todo上下文提供者
import { TodoProvider } from "../contexts/TodoContext";

// 根布局组件：提供全局状态管理和导航结构
export default function RootLayout() {
  return (
    <TodoProvider>
      <Stack>
        {/* 主页面：任务列表 */}
        <Stack.Screen
          name="index"
          options={{
            title: "我的任务",
            headerShown: true,
          }}
        />
        {/* 详情页面：单个任务详情 */}
        <Stack.Screen
          name="detail/[id]"
          options={{
            title: "任务详情",
            headerShown: true,
          }}
        />
      </Stack>
    </TodoProvider>
  );
}
