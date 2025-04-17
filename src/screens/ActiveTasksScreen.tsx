import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '../App';

// function to format a Date object into a string
const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};

// Props expected by this screen component
interface ActiveTasksScreenProps {
  tasks: Task[];                             
  addTask: (task: Task) => void;             
  updateTask: (id: number, task: Task) => void; 
  toggleTaskComplete: (id: number) => void;  
  deleteTask: (id: number) => void;          
}

export default function ActiveTasksScreen({
  tasks,
  addTask,
  updateTask,
  toggleTaskComplete,
  deleteTask,
}: ActiveTasksScreenProps) {
  // State for the "Add Task" modal
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');           // New task title input
  const [endDate, setEndDate] = useState<Date | null>(null); // New task end date
  const [priority, setPriority] = useState(0);              // New task priority
  const [showAddDatePicker, setShowAddDatePicker] = useState(false); // Show/hide date picker

  // State for editing an existing task
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editEndDate, setEditEndDate] = useState<Date | null>(null);
  const [editPriority, setEditPriority] = useState(0);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [showEditDatePicker, setShowEditDatePicker] = useState(false);

  // State for sorting: 'priority' or 'endDate' set automatically to priority 
  const [sortOption, setSortOption] = useState<string>('priority');

  // Filter tasks to only those not yet completed 
  const activeTasks = tasks.filter(task => !task.completed);
  
  // Sort active tasks based on selected criterion
  const sortedActiveTasks = [...activeTasks].sort((a, b) => {
    if (sortOption === 'priority') { // Higher priority first
      return b.priority - a.priority;
    } else if (sortOption === 'endDate') { // Earlier end date first
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    } else {// Fallback: highest priority
      return b.priority - a.priority;
    }
  });

  // Handler to add a new task
  const handleAddTask = () => {
    if (taskTitle.trim() && endDate) {
      addTask({
        id: 0, // Parent will override with a unique ID
        title: taskTitle.trim(),
        endDate: endDate.toISOString(),
        priority,
        completed: false, // New tasks start as false to be incomplete
      });
      // Reset form fields and close modal
      setTaskTitle('');
      setEndDate(null);
      setPriority(0);
      setModalVisible(false);
    }
  };

  // Date picker callback for picking end date opens ios 
  const onChangeAddDate = (event: any, selectedDate?: Date) => {
    setShowAddDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  // Open edit modal for selected task
  const handleEditTask = (id: number) => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setEditingId(id);
      setEditTitle(taskToEdit.title);
      setEditEndDate(new Date(taskToEdit.endDate));
      setEditPriority(taskToEdit.priority);
      setEditModalVisible(true);
    }
  };

  // Save edits for the task
  const handleSaveEdit = () => {
    if (editingId !== null && editTitle.trim() && editEndDate) {
      updateTask(editingId, {
        id: editingId,                      // Keep the same ID
        title: editTitle.trim(),
        endDate: editEndDate.toISOString(),
        priority: editPriority,
        completed: tasks.find(task => task.id === editingId)?.completed || false,
      });
      // Reset edit form and close modal
      setEditingId(null);
      setEditTitle('');
      setEditEndDate(null);
      setEditPriority(0);
      setEditModalVisible(false);
    }
  };

  // Delete the currently editing task
  const handleDeleteTask = () => {
    if (editingId !== null) {
      deleteTask(editingId);
      // Clear edit state
      setEditingId(null);
      setEditTitle('');
      setEditEndDate(null);
      setEditPriority(0);
      setEditModalVisible(false);
    }
  };

  // Date picker callback for editing
  const onChangeEditDate = (event: any, selectedDate?: Date) => {
    setShowEditDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEditEndDate(selectedDate);
    }
  };

  // Render each task in the list
  const renderTaskItem = ({ item }: { item: Task }) => (
    <TouchableHighlight
      underlayColor="lightgray"
      onPress={() => handleEditTask(item.id)}
    >
      <View style={styles.taskItem}>
        {/* Toggle complete/incomplete */}
        <TouchableOpacity onPress={() => toggleTaskComplete(item.id)}>
          <Ionicons
            name={item.completed ? 'checkmark-circle' : 'checkmark-circle-outline'}
            size={24}
            color="#0077b6"
            style={styles.completeIcon}
          />
        </TouchableOpacity>
        <View style={styles.taskTextContainer}>
          <Text style={[styles.taskTitle, item.completed && styles.completedTaskText]}>
            {item.title}
          </Text>
          <Text style={item.completed && styles.completedTaskText}>
            End Date: {new Date(item.endDate).toLocaleDateString()}
          </Text>
          <Text style={item.completed && styles.completedTaskText}>
            Priority: {item.priority}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={styles.container}>
      {/* Sorting options bar */}
      <View style={styles.sortingBar}>
        <TouchableOpacity
          onPress={() => setSortOption('priority')}
          style={[
            styles.sortButton,
            sortOption === 'priority' && styles.selectedSortButton,
          ]}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortOption === 'priority' && styles.selectedSortButtonText,
            ]}
          >
            Priority
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSortOption('endDate')}
          style={[
            styles.sortButton,
            sortOption === 'endDate' && styles.selectedSortButton,
          ]}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortOption === 'endDate' && styles.selectedSortButtonText,
            ]}
          >
            End Date
          </Text>
        </TouchableOpacity>
      </View>

      {/* List of active, sorted tasks */}
      <FlatList
        data={sortedActiveTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTaskItem}
        contentContainerStyle={styles.taskList}
        ListEmptyComponent={<Text style={styles.emptyMessage}>No active tasks</Text>}
      />

      {/* Floating button to open "Add Task" modal */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* "Add Task" Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task title"
              value={taskTitle}
              onChangeText={setTaskTitle}
            />
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowAddDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {endDate ? `End Date: ${formatDate(endDate)}` : 'Select End Date'}
              </Text>
            </TouchableOpacity>
            {showAddDatePicker && (
              <DateTimePicker
                value={endDate || new Date()}
                mode="date"
                display="default"
                onChange={onChangeAddDate}
              />
            )}
            <Text style={styles.label}>Priority: {priority}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={priority}
              onValueChange={setPriority}
              minimumTrackTintColor="#0077b6"
              maximumTrackTintColor="#ccc"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={handleAddTask}
              >
                <Text style={styles.buttonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* "Edit Task" Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Edit task title"
              value={editTitle}
              onChangeText={setEditTitle}
            />
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowEditDatePicker(true)}
            >
              <Text style={styles.dateButtonText}>
                {editEndDate ? `End Date: ${formatDate(editEndDate)}` : 'Select End Date'}
              </Text>
            </TouchableOpacity>
            {showEditDatePicker && (
              <DateTimePicker
                value={editEndDate || new Date()}
                mode="date"
                display="default"
                onChange={onChangeEditDate}
              />
            )}
            <Text style={styles.label}>Priority: {editPriority}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10}
              step={1}
              value={editPriority}
              onValueChange={setEditPriority}
              minimumTrackTintColor="#0077b6"
              maximumTrackTintColor="#ccc"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleDeleteTask}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={handleSaveEdit}
              >
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  sortingBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 4,
  },
  selectedSortButton: {
    backgroundColor: '#0077b6',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSortButtonText: {
    color: 'white',
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
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#0077b6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  dateButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 6,
    marginBottom: 12,
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginLeft: 3, 
  },
  cancelButton: {
    backgroundColor: '#aaa',
  },
  addButton: {
    backgroundColor: '#0077b6',
  },
  deleteButton: {
    backgroundColor: '#D11A2A',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
