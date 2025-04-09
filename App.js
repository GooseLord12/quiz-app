import React from "react";
import { View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Question from "./Question";
import Summary from "./Summary";

const Stack = createStackNavigator();

export default function App() {
  const questions = [
    {
      prompt: "The current season is Spring?",
      type: "true-false",
      choices: ["True", "False"],
      correct: 0,
    },
    {
      prompt: "Which are seasons?",
      type: "multiple-answer",
      choices: ["Autumn", "Africa", "Summer", "March"],
      correct: [0, 2],
    },
    {
      prompt: "Which of these is a month?",
      type: "multiple-choice",
      choices: ["Winter", "April", "Octavian", "Solstace"],
      correct: 1,
    },
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {({ navigation }) => (
            <View>
              <Button
                title="Start Quiz"
                onPress={() =>
                  navigation.navigate("Question", { data: questions, index: 0 })
                }
              />
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="Summary" component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
