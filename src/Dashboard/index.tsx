import React, { useEffect, useState } from 'react';
import DashboardComponent from '../components/Dashboard';
import { User } from '../types';

export default function DashboardContainer(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const USERS_API_URL = 'http://localhost:3000/users.json';

  async function getUserFromAPI(): Promise<void> {
    try {
      setIsLoading(true);
      const users = await (await fetch(USERS_API_URL)).json();
      setUsers(users);
    } catch (error) {
      console.log('unable to fetch the data');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getUserFromAPI();
  }, []);

  return (
    <DashboardComponent isLoading={isLoading} users={users} />
  );
}