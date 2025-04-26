import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import CreateUserForm from './components/CreateUserForm';
import UpdateUserForm from './components/UpdateUserForm';
import Form from './components/Form'
import LanguageDropdown from './components/LanguageSwitcher';

function App() {
  return (
    <div className="">
      <LanguageDropdown />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/create-user" element={<CreateUserForm />} />
        <Route path="/update-user/:id" element={<UpdateUserForm />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
