import React, { Dispatch, useEffect, useState } from 'react';
import { User } from '../../types';
import './index.scss';

interface Props {
  user: User;
  setUser: Dispatch<User>;
}

export default function EditUserComponent(props: Props): JSX.Element {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    role: '',
    id: ''
  });

  useEffect(() => {
    if (props.user) setUser(props.user);
  }, [props.user]);

  return (
    <div
      aria-hidden='true'
      className='modal fade'
      id='editUserModel'
      role='dialog'
      tabIndex={-1}
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLongTitle'>Edit user</h5>
            <button type='button' className='close' data-bs-dismiss='modal' aria-label='Close'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>

            <div className='form-group'>
              <label>Name</label>
              <input
                value={user.name}
                className='form-control'
                onChange={(event): void => {
                  user.name = event.target.value;
                  setUser({ ...user });
                }}
              />
            </div>

            <br />
            <div className='form-group'>
              <label>Email</label>
              <input
                type='email'
                aria-describedby='emailHelp'
                value={user.email}
                className='form-control'
                onChange={(event): void => {
                  user.email = event.target.value;
                  setUser({ ...user });
                }}
              />
            </div>

            <br />
            <div className='form-group'>
              <label>Role</label>
              <br />

              <div className='radio'>
                <div>
                  <input className='form-check-input'
                    type='radio'
                    name='flexRadioDefault'
                    checked={user.role === 'member'}
                    onChange={(): void => {
                      user.role = 'member';
                      setUser({ ...user });
                    }}
                  />
                  <label className='form-check-label'>
                    Member
                  </label>
                </div>

                <div>
                  <input className='form-check-input'
                    type='radio'
                    name='flexRadioDefault'
                    checked={user.role === 'admin'}
                    onChange={(): void => {
                      user.role = 'admin';
                      setUser({ ...user });
                    }}
                  />
                  <label className='form-check-label'>
                    Admin
                  </label>
                </div>
              </div>
            </div>

          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
            <button
              type='button'
              className='btn btn-primary'
              data-bs-dismiss='modal'
              onClick={(): void => {
                props.setUser(user);
              }}
            >
              Update User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}