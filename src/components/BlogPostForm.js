import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useState } from "react";

const BlogPostForm = ({ onSubmit, initialvalues }) => {
  const [title, setTitle] = useState(initialvalues.title);
  const [content, setContent] = useState(initialvalues.content);

  return (
    <View>
      <Text style={styles.label}> Enter Title</Text>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      ></TextInput>
      <Text style={styles.label}> Enter Content:</Text>
      <TextInput
        value={content}
        onChangeText={(text) => setContent(text)}
        style={styles.input}
      ></TextInput>

      <Button title="Save" onPress={() => onSubmit(title, content)}></Button>
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialvalues: {
    title: "",
    content: "",
  },
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },

  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default BlogPostForm;
