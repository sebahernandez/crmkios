import OnlineUser from './OnlineUser';
import React, { useEffect, useState, Fragment } from 'react';
import { useMutation, gql, useSubscription } from '@apollo/client';

const onlineUsersSuscription = gql`
  subscription getOnlineUsers {
    online_users(order_by: { user: { name: asc } }) {
      id
      user {
        name
      }
    }
  }
`;

const UPDATE_LASTSEEN_MUTATION = gql`
  mutation updateLastSeen($now: timestamptz!) {
    update_users(where: {}, _set: { last_seen: $now }) {
      affected_rows
    }
  }
`;

const OnlineUsersWrapper = () => {
  const [onlineIndicator, setOnlineIndicator] = useState(0);
  let onlineUsersList;

  useEffect(() => {
    // Every 20s, run a mutation to tell the backend that you're online
    updateLastSeen();
    setOnlineIndicator(setInterval(() => updateLastSeen(), 20000));

    return () => {
      // Clean up
      clearInterval(onlineIndicator);
    };
  }, []);

  const [updateLastSeenMutation] = useMutation(UPDATE_LASTSEEN_MUTATION);

  const updateLastSeen = () => {
    /*  updateLastSeenMutation({
       variables: { now: new Date().toISOString() }
     }); */
  };

  const { loading, error, data } = useSubscription(onlineUsersSuscription);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  if (data) {
    onlineUsersList = data.online_users.map((u) => {
      return <OnlineUser key={u.id} user={u.user} />;
    });
  }

  return (
    <div className="onlineUsersWrapper">
      <Fragment>
        <div className="sliderHeader">
          Usuarios En Linea - ({onlineUsersList.length})
        </div>
        {onlineUsersList}
      </Fragment>
    </div>
  );
};

export default OnlineUsersWrapper;
