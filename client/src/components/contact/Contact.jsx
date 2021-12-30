import React, { useRef, useState } from 'react';
import './contact.css';
import Phone from '../../img/phone.png';
import Email from '../../img/email.png';
import Address from '../../img/address.png';
import emailjs from 'emailjs-com';

const Contact = () => {
  const formRef = useRef();
  const [magDone, setmagDone] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_i6fo7aj',
        'template_4lj585q',
        formRef.current,
        'user_qiBD4HIyBazYvqEUPk2fH'
      )
      .then(
        result => {
          console.log(result.text);
          setmagDone(true);
        },
        error => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className='contact'>
      <div className='contact'>
        <div className='contact-bg'></div>
        <div className='contact-wrapper'>
          <div className='contact-left'>
            <h1 className='contactTitle'>let's discuss your project</h1>
            <div className='contact-info'>
              <div className='contact-info-item'>
                <img src={Phone} alt='' className='contact-icon' />
                01791729693
              </div>
              <div className='contact-info-item'>
                <img src={Email} alt='' className='contact-icon' />
                mdalihussain446@gmail.com
              </div>
              <div className='contact-info-item'>
                <img src={Address} alt='' className='contact-icon' />
                Khulna, Chuadanga
              </div>
            </div>
          </div>
          <div className='contact-right'>
            <p className='conatct-desc'>
              <b style={{ color: '#f622af' }}> Lorem ipsum dolor</b> sit amet
              consectetur adipisicing elit. Pariatur illum maxime enim officiis
              tenetur voluptates mollitia a consectetur eveniet labore
              perferendis ullam, minima repudiandae corporis, doloribus suscipit
              quisquam possimus sed.
            </p>

            <form ref={formRef} onSubmit={handleSubmit}>
              <input className='contactInput' type='text' placeholder='Name' name='user_name' />
              <input className='contactInput' type='text' placeholder='Subject' name='user_subject' />
              <input className='contactInput' type='text' placeholder='Email' name='user_email' />
              <textarea 
                name='message'
                rows='5'
                placeholder='message'
              ></textarea>
              <button>Submit</button>
              {magDone && <p className='mag'> massage send </p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
