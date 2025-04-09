import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { ButtonGroup } from "react-native-elements";

export default function Question({ route, navigation }) {
  const { data, index } = route.params;
  const question = data[index];
  const [selectedIndex, setSelectedIndex] = useState([]);

  const handleNext = () => {
    const isCorrect =
      question.type === "multiple-answer"
        ? JSON.stringify(selectedIndex.sort()) ===
          JSON.stringify(question.correct.sort())
        : selectedIndex === question.correct;

    const updatedData = [...data];
    updatedData[index] = { ...question, userAnswer: selectedIndex, isCorrect };

    if (index < data.length - 1) {
      navigation.push("Question", { data: updatedData, index: index + 1 });
    } else {
      navigation.replace("Summary", { data: updatedData });
    }
  };

  return (
    <View>
      <Text>{question.prompt}</Text>
      <ButtonGroup
        testID="choices"
        buttons={question.choices}
        selectedIndexes={
          question.type === "multiple-answer" ? selectedIndex : [selectedIndex]
        }
        onPress={(value) =>
          question.type === "multiple-answer"
            ? setSelectedIndex((prev) =>
                prev.includes(value)
                  ? prev.filter((i) => i !== value)
                  : [...prev, value]
              )
            : setSelectedIndex(value)
        }
        vertical
      />
      <Button testID="next-question" title="Next" onPress={handleNext} />
    </View>
  );
}
