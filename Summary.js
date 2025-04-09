import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Summary({ route }) {
  const { data } = route.params;
  const score = data.filter((q) => q.isCorrect).length;

  return (
    <View style={styles.container}>
      <Text testID="total" style={styles.scoreText}>
        Total Score: {score}
      </Text>
      {data.map((q, i) => (
        <View key={i} style={styles.questionContainer}>
          <Text style={styles.questionText}>{q.prompt}</Text>
          {q.choices.map((choice, idx) => {
            const isCorrect = Array.isArray(q.correct)
              ? q.correct.includes(idx)
              : q.correct === idx;
            const isSelected = Array.isArray(q.userAnswer)
              ? q.userAnswer.includes(idx)
              : q.userAnswer === idx;
            return (
              <Text
                key={idx}
                style={[
                  styles.choiceText,
                  isSelected && !isCorrect && styles.incorrectText,
                  isCorrect && styles.correctText,
                ]}
              >
                {choice}
              </Text>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  questionContainer: {
    width: "100%",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  choiceText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  incorrectText: {
    textDecorationLine: "line-through",
    color: "red",
  },
  correctText: {
    fontWeight: "bold",
    color: "green",
  },
});
