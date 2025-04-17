import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Header from './components/Header';
import Footer from './components/Footer';
import ActiveTasksScreen from './screens/ActiveTasksScreen';
import CompletedTasksScreen from './screens/CompletedTasksScreen';

// Define the shape of a Task object throughout the app
export interface Task {
  id: number;             
  title: string;          
  endDate: string;        
  priority: number;       
  completed: boolean;     
  finishedDate?: string;  
}

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

export default function App() {
  // Manage global list of tasks in component state
  const [tasks, setTasks] = useState<Task[]>([]);

  //add a new task to the list with the new task data with a id which I made using the tmie to make it unique to every task
  const addTask = (task: Task) => {
    const newTask = { ...task, id: Date.now() };
    setTasks([...tasks, newTask]);
  };

  //update a existing task by going through all the tasks to see which id is the same as the task id that was clicked to be eddited then the task will be updated with the new data, the id stays the same
  const updateTask = (id: number, updatedTask: Task) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...updatedTask, id } : task
      )
    );
  };

//delets the task using id and keeping all tasks that is not the same as the id of the task the user clicks
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id)); //this filters all the tasks to keep the tasks that dont have the id of the task that the user is trying to delete
  };

  //toggle task to complete 
  const toggleTaskComplete = (id: number) => {
    setTasks(
      tasks.map(task => //loops through all tasks
        task.id === id //if task id is the same as task that the user wants to complete
          ? {
              ...task, //keeps all data 
              completed: !task.completed, //sets completed to true 
              finishedDate: !task.completed //sets finised date to the date of when clicked
                ? new Date().toISOString()
                : undefined,
            }
          : task
      )
    );
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        {/* App header at the top */}
        <Header />

        {/* Bottom tab navigator: Active vs Completed tasks */}
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              marginBottom: 25,  // Raise the tab bar slightly above the footer
            },
          }}
        >
          {/* Active Tasks Tab */}
          <Tab.Screen name="Active Tasks">
            {() => (
              <ActiveTasksScreen
                tasks={tasks.filter(task => !task.completed)}
                addTask={addTask}
                updateTask={updateTask}
                toggleTaskComplete={toggleTaskComplete}
                deleteTask={deleteTask}
              />
            )}
          </Tab.Screen>

          {/* Completed Tasks Tab */}
          <Tab.Screen name="Completed Tasks">
            {() => (
              <CompletedTasksScreen
                tasks={tasks.filter(task => task.completed)}
                toggleTaskComplete={toggleTaskComplete}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>

        {/* App footer pinned at the bottom */}
        <Footer />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,          
  },
});
