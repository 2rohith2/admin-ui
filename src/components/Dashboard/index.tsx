import React, { useEffect, useState } from 'react';
import { User } from '../../types';
import EditUserComponent from '../EditUser';
import LoaderComponent from '../Loader';
import NameComponent from '../Name';
import PaginationComponent from '../Pagination';
import './index.scss';

interface Props {
  isLoading: boolean;
  users: User[];
}

export default function DashboardComponent(props: Props): JSX.Element {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [editUser, setEditUser] = useState<User>(props.users[0]);
  const [filteredUsers, setFilteredUser] = useState<User[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [search, setSearch] = useState<string>('');
  const [selectAllRowsInPage, setSelectAllRowsInPage] = useState<number>(-1);
  const [selectedRowsById, setSelectedRowsById] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  let allRowsIds: string[] = [];

  useEffect(() => {
    setUsers(props.users);
  }, [props.users]);

  useEffect(() => {
    if (users) findUsersBasedOnSearch(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  function findUsersBasedOnSearch(search: string): void {
    if (!search) {
      setFilteredUser([]);
      return;
    }

    const regex = new RegExp(`${search}+`, 'i');
    setFilteredUser(users.filter(user => regex.exec(user.name) || regex.exec(user.email) || regex.exec(user.role)));
  }

  function showDeleteButton(): JSX.Element {
    return (
      <div className='delete-container'>
        <div className='delete' onClick={deleteSelected}>
          Delete selected
        </div>
      </div>
    );
  }

  function deleteSelected(): void {

    if (allRowsIds.length > 0) {
      setUsers([...users.filter(user => !allRowsIds.includes(user.id))]);
      allRowsIds = [];
      setSelectAllRowsInPage(-1);
    } else {
      setUsers([...users.filter(user => !selectedRowsById.includes(user.id))]);
    }
    setSelectedRowsById([]);
  }

  function showUsersTable(): JSX.Element {
    const usersRow: JSX.Element[] = [];
    let dataSource = search.length > 0 ? filteredUsers : users;

    if (dataSource.length === 0) {
      usersRow.push(
        <div className='table-row' key={1}>
          <div className='name'></div>
          <div className='email'>No data found</div>
          <div className='role'></div>
          <div className='action'></div>
        </div >
      );
    } else {
      dataSource = dataSource.slice(currentPageIndex * rowsPerPage, (currentPageIndex * rowsPerPage) + rowsPerPage);

      dataSource.map(user => {

        if (selectAllRowsInPage === currentPageIndex) {
          allRowsIds.push(user.id);
        }

        usersRow.push(
          <div className={`table-row ${selectedRowsById.includes(user.id) ? '--selected-row' : ''}`} key={user.id}>
            <div className='name'> <NameComponent id={user.id} name={user.name} /> </div>
            <div className='email'>{user.email}</div>
            <div className='role'>{user.role}</div>
            <div className='action'>
              <div className='action-icon'>
                <i
                  className='bi bi-pencil-square'
                  data-bs-target='#editUserModel'
                  data-bs-toggle='modal'
                  onClick={(): void => setEditUser(user)}
                />
              </div>
              <div className='action-icon'>
                <i
                  className='delete-icon bi bi-trash'
                  onClick={(): void => {
                    setUsers(users.filter(tempUser => tempUser.id !== user.id));
                    if (search) findUsersBasedOnSearch(search);
                  }}
                >
                </i>
              </div>
              <input
                className='form-check-input mt-0 check'
                type='checkbox'
                checked={(selectAllRowsInPage === currentPageIndex ? true : false) || (selectedRowsById.includes(user.id))}
                onChange={(event): void => {
                  const isChecked = event.target.checked;
                  if (isChecked) {
                    selectedRowsById.push(user.id);
                    setSelectedRowsById([...selectedRowsById]);
                  } else {
                    setSelectedRowsById(selectedRowsById.filter(id => id !== user.id));
                  }
                }}
              />
            </div>
          </div >
        );
      });
    }

    return (
      <div className='dashboard'>
        <div className='dashboard__header'>
          <h2>Users</h2>
          <div className='search'>
            <input
              className='form-control'
              type='search'
              placeholder='Search by name, email or role'
              aria-label='Search'
              onChange={(event): void => {
                setSearch(event.target.value);
                setCurrentPageIndex(0);
                findUsersBasedOnSearch(event.target.value);
              }}
            />
          </div>
        </div>
        <div className='dashboard__table'>
          <div className='dashboard__table__header'>
            <div className='name'>Name</div>
            <div className='email'>Email</div>
            <div className='role'>Role</div>
            <div className='action'>
              <div>Actions</div>
              <div>
                <input
                  className='form-check-input check-all'
                  type='checkbox'
                  checked={selectAllRowsInPage > -1}
                  onChange={(event): void => {
                    const isChecked = event.target.checked;
                    if (isChecked) {
                      setSelectAllRowsInPage(currentPageIndex);
                    } else {
                      setSelectAllRowsInPage(-1);
                      setSelectedRowsById([]);
                      allRowsIds = [];
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='dashboard__table__body'>
          {usersRow}
        </div>
        {
          (selectedRowsById.length > 0 || selectAllRowsInPage > -1) && showDeleteButton()
        }
        <PaginationComponent
          currentPageIndex={currentPageIndex}
          rowsPerPage={rowsPerPage}
          setCurrentPageIndex={setCurrentPageIndex}
          setRowsPerPage={setRowsPerPage}
          totalCount={search.length > 0 ? filteredUsers.length : users.length}
        />
      </div>
    );
  }

  function showTableOrLoading(): JSX.Element {
    if (props.isLoading) {
      return <LoaderComponent />;
    }

    return showUsersTable();
  }

  return (
    <>
      {showTableOrLoading()}

      <EditUserComponent
        user={editUser}
        setUser={(updatedUser: User): void => {
          const foundIndex = users.findIndex(user => user.id == updatedUser.id);
          users[foundIndex] = updatedUser;
          setUsers([...users]);
        }} />
    </>
  );
}
