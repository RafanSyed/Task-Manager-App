# Task-Manager-App


# Task Manager App

A simple React Native **Task Manager** app built with Expo. It allows users to:

- Add tasks with a title, due date (via calendar picker), and priority (0–10 slider)
- View active tasks and completed tasks in separate bottom tabs
- Edit or delete tasks via modals
- Mark tasks as complete/incomplete, recording the completion date
- Sort active tasks by **priority** or **end date**

---

## Features

1. **Local State Management**: Uses `useState` for task data—no external storage or advanced state libraries.
2. **Unique IDs**: Tasks receive a unique ID (`Date.now()`) on creation to ensure stable operations.
3. **Bottom Tab Navigation**: Separate **Active** and **Completed** screens powered by `@react-navigation/bottom-tabs`.
4. **Task Modals**: Add and edit tasks using `Modal`, with inputs, a calendar picker (`@react-native-community/datetimepicker`), and a priority slider.
5. **Completion Toggle**: Mark/unmark tasks complete with a checkbox icon; completed tasks record a `finishedDate`.
6. **Sorting**: Sort active tasks by priority or end date.
7. **Responsive UI**: Styled with core React Native components and Ionicons from `@expo/vector-icons`.

---

## Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/RafanSyed/Task-Manager-App.git
   cd Task-Manager-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Expo CLI (if not already installed)**
   ```bash
   npm install -g expo-cli
   ```

4. **Install native dependencies**
   ```bash
   npm install --save @react-native-community/slider @react-native-community/datetimepicker @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
   ```

5. **Run the app**
   ```bash
   npx expo start
   ```

   - Scan the QR code with the Expo Go app on your device
   **OR**
   press "i" on keyboard to open ios simulator


   ![Screenshot 2025-04-17 at 10 42 43 AM](https://github.com/user-attachments/assets/e70d2b61-a9d7-45ee-9c3c-8032db77b27f)




---

## Project Structure

```
Task-Manager-App/
├── App.tsx                # Root component with tab navigator and global state
├── package.json
├── README.md
├── components/
│   ├── Header.tsx         # App header UI
│   └── Footer.tsx         # App footer UI
├── screens/
│   ├── ActiveTasksScreen.tsx    # Active tasks list, add/edit modals, sorting
│   └── CompletedTasksScreen.tsx # Completed tasks list, unmark functionality
└── assets/                # Images, icons, etc.
```

---

## Usage

<!-- Screenshot: Plus Button (tap "+" to add a new task) -->

1. **Active Tasks Tab**
   - Tap **+** to open the “Add Task” modal
  




   ![1](https://github.com/user-attachments/assets/dd8e0d59-c5ad-4535-aebc-7a15e1f4d080)

   - Enter a title, tap to pick an end date, adjust priority, then **Add Task**
  





   ![2](https://github.com/user-attachments/assets/f3047a88-939a-4d16-8785-343a86663b79)
   ![3](https://github.com/user-attachments/assets/5c771328-2f8f-4da9-b10d-b7bea75811d3)

   - Tap the checkbox icon to mark a task complete
  




   ![4](https://github.com/user-attachments/assets/1ac02932-53f4-4182-b305-dde39a40c776)
   
   - In edit modal, **Save Changes** or **Delete** the task
  




   ![5](https://github.com/user-attachments/assets/e9c184c0-1995-42a9-b611-410c545cc5fa)

   
<!-- Screenshot: Completed Tasks Screen -->

2. **Completed Tasks Tab**
   - View tasks you’ve marked complete, with the date finished
  




   ![6](https://github.com/user-attachments/assets/910573c0-dcd1-4fe0-9664-e6fd63e93128)

   - Tap the checkbox icon to unmark and move back to Active

---

## Dependencies

- **React Native** (via Expo)
- **Expo** CLI
- **React Navigation** for bottom tabs
- **@react-native-community/slider** for priority input
- **@react-native-community/datetimepicker** for due-date selection
- **Ionicons** for vector icons

---

## License & Author

**© 2025 Rafan Syed**

