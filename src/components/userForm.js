import { useState, useEffect } from 'react';

import s from './ContactForm.module.css';

import fetchCityList from './cityFetch';

const initialState = {
  name: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  city: '',
  zipCode: '',
};

const ContactForm = () => {
  const [cites, setCites] = useState([]);
  const [address, setAddress] = useState({});
  const [formData, setFormData] = useState(initialState);

  const handleChange = ({ target }) => {
    setFormData(prevState => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    fetchCityList().then(result => setCites(result));
  }, []);

  const handleFormSubmit = event => {
    event.preventDefault();
    if (formData.zipCode !== address.zipcode) {
      return alert('Wrong city zip code, please try again ');
    }
    alert(JSON.stringify(formData, null, 2));
    setFormData(initialState);
    setAddress('');
  };

  return (
    <>
      <form className={s.form} onSubmit={handleFormSubmit}>
        <h1>Please fill out the form.</h1>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Z]+(([' -][a-zA-Z])?[a-zA-Z]*)*$"
          title="The name can only consist of letters, apostrophes, dashes and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan etc!"
          required
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          pattern="^[a-zA-Z]+(([' -][a-zA-Z])?[a-zA-Z]*)*$"
          title="The name can only consist of letters, apostrophes, dashes and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan etc!"
          required
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
          title="Please ,use the email format only with. For example myemail@mail.com"
          required
          placeholder="Input your email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phoneNumber"
          pattern="(\+386?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{2}\)?|\d{2})( |-|\.)?(\d{2}( |-|\.)?\d{3})"
          title="The phone number must be 11–12 digits long and can contain numbers, spaces, hyphens, brackets and can only start with +386."
          required
          placeholder="Enter phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <select name="city" onChange={handleChange}>
          {cites.map(item => {
            return (
              <option
                key={item.address.city}
                onClick={() => setAddress(item.address)}
              >
                {item.address.city}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          name="zipCode"
          pattern="^\d{5}$|^\d{5}-\d{4}$"
          title="Zip code can only consist of numbers and dashes."
          required
          placeholder="Enter zip code"
          value={formData.zipCode}
          onChange={handleChange}
        />

        <button type="submit">Add contact</button>
      </form>
    </>
  );
};

export default ContactForm;
