import { Stack } from "expo-router";
import { TodoProvider } from "../contexts/TodoContext";

export default function RootLayout() {
  return (
    <TodoProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "我的任务",
            headerShown: true,
          }}
        />
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
