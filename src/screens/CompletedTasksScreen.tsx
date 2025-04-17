import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../App';

// a list of completed tasks and handlers
interface CompletedTasksScreenProps {
  tasks: Task[];                         // Array of tasks with completed === true
  toggleTaskComplete: (id: number) => void; // Function to unmark a task as complete
  updateTask: (id: number, task: Task) => void; // (Not used here) to edit a completed task
  deleteTask: (id: number) => void;      // (Not used here) to delete a completed task
}

export default function CompletedTasksScreen({
  tasks,
  toggleTaskComplete,
}: CompletedTasksScreenProps) {

  //shows the entire list of completed tasks 
  const renderTaskItem = ({ item }: { item: Task }) => (
    <TouchableHighlight
      underlayColor="lightgray"
      onPress={() => {
        // Could open an edit modal if desired
      }}
    >
      <View style={styles.taskItem}>
        {/* Unmark task as complete */}
        <TouchableOpacity onPress={() => toggleTaskComplete(item.id)}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color="#0077b6"
            style={styles.completeIcon}
          />
        </TouchableOpacity>
        <View style={styles.taskTextContainer}>
          {/* Task title, shown with strikethrough */}
          <Text style={[styles.taskTitle, styles.completedTaskText]}>
            {item.title}
          </Text>
          {/* Display the original end date */}
          <Text style={styles.completedTaskText}>
            End Date: {new Date(item.endDate).toLocaleDateString()}
          </Text>
          {/* Display priority */}
          <Text style={styles.completedTaskText}>
            Priority: {item.priority}
          </Text>
          {/* Display when it was finished, if available */}
          {item.finishedDate && (
            <Text style={styles.completedTaskText}>
              Finished: {new Date(item.finishedDate).toLocaleDateString()}
            </Text>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
  
  return (
    <View style={styles.container}>
      {/* FlatList for performance on longer lists */}
      <FlatList
        data={tasks}  // Completed tasks only
        keyExtractor={(item) => item.id.toString()} // Use unique id
        renderItem={renderTaskItem} // Renders each task row
        contentContainerStyle={styles.taskList} // Padding at bottom
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No completed tasks</Text>
        } // Message when no tasks
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#f3f3f3',
  },
  headerTitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  taskList: {
    paddingBottom: 120, 
  },
  emptyMessage: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#666',
    marginTop: 20,
  },
  taskItem: {
    flexDirection: 'row',       
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',      
  },
  completeIcon: {
    marginRight: 12,           
  },
  taskTextContainer: {
    flex: 1,                   
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedTaskText: {
    color: 'gray',             
    textDecorationLine: 'line-through', 
  },
});
