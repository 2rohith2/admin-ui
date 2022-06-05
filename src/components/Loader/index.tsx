import React from 'react';
import '../Dashboard/index.scss';

export default function LoaderComponent(): JSX.Element {
  return (
    <div className='dashboard'>
      <div className='dashboard__table'>
        <div className='dashboard__table__header'>
          <div className='name'>Name</div>
          <div className='email'>Email</div>
          <div className='role'>Role</div>
          <div className='action'>
            <div>Actions</div>
          </div>
        </div>
      </div>
      <span className='placeholder col-12'></span>
      <span className='placeholder col-12'></span>
      <span className='placeholder col-12'></span>
      <span className='placeholder col-12'></span>
    </div>
  );
}