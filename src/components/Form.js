import React, { useState, useCallback } from 'react';
import Form from './styled/Form';
import Input from './styled/Input';
import Radio from './styled/Radio';
import Select from './styled/Select';
import Checkbox from './styled/Checkbox';
import Button from './styled/Button';

const titleOptions = ['Mr', 'Mrs', 'Miss'];
const genderOptions = ['male', 'female', 'prefer not to share'];

export default () => {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState(null);
  const [name, setName] = useState(null);
  const [familyName, setFamilyName] = useState(null);
  const [gender, setGender] = useState(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [privatePassword, setPrivatePassword] = useState(null);
  const [newsLetter, setNewsLetter] = useState(true);

  const onPasswordChange = useCallback(password => {
    setPrivatePassword(password);
    setPassword(password.replace(/./gi, '*'));
  }, []);

  const submit = useCallback(() => {
    console.log({
      name,
      familyName,
      gender,
      userName,
      privatePassword,
      newsLetter,
    });
    setSubmitted(true);
  }, [name, familyName, gender, userName, privatePassword, newsLetter]);

  return (
    <Form>
      <Select
        label="Title"
        options={titleOptions}
        value={title}
        onChange={setTitle}
      />
      <Input
        label="Name"
        value={name}
        onChange={setName}
        placeHolder="Please add your name"
      />
      <Input
        label="Family Name"
        value={familyName}
        onChange={setFamilyName}
        placeHolder="Please add your family name"
      />
      <Radio
        label="Gender"
        value={gender}
        onChange={setGender}
        options={genderOptions}
      />
      <Input
        label="Username"
        value={userName}
        onChange={setUserName}
        placeHolder="Please add your username"
      />
      <Input
        label="Password"
        value={password}
        onChange={onPasswordChange}
        placeHolder="Please choose a password"
      />
      <Checkbox
        label="I want to receive the newsletter"
        selected={newsLetter}
        onChange={setNewsLetter}
      />

      <Button submitted={submitted} onClick={submit} />
    </Form>
  );
};
